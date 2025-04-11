<?php

namespace App\Http\Resources;

use App\Repositories\Interfaces\AnakRepositoryInterface;
use App\Repositories\Interfaces\AnakTantanganRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Fase;

class FaseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $additionalData = $this->additional['anak'] ?? null;

        return [
            'fase_id' => $this->fase_id,
            'judul' => $this->judul,
            'subjudul' => $this->deskripsi ? substr($this->deskripsi, 0, 50) . '...' : 'Tantangan fase ' . $this->judul,
            'deskripsi' => $this->deskripsi ?? 'Ikuti tantangan ini untuk tumbuh sehat!',
            'banner' => $this->banner ?? '/images/default-challenge.jpg',
            'tantangans' => $this->tantangans->map(fn($tantangan) => [
                'tantangan_id' => $tantangan->tantangan_id,
                'activity' => $tantangan->activity,
            ])->toArray(),
            'benefits' => array_values(array_filter(preg_split('/(?<=\.)\s+/', $this->benefits ?? '') ?: [])),
            'status' => $this->status,
            'progress' => $this->calculateProgress($additionalData),
            'durasi' => (int) $this->durasi, // Pastikan durasi dikembalikan sebagai integer
            'deadline' => $this->calculateDeadline($additionalData),
            'anak' => $additionalData ? [
                'anak_id' => $additionalData->anak_id,
                'nama' => $additionalData->nama_anak ?? null,
                'sudah_lahir' => $additionalData->sudah_lahir,
                'tanggal_lahir' => $additionalData->sudah_lahir && $additionalData->tanggal_lahir
                    ? \Carbon\Carbon::parse($additionalData->tanggal_lahir)->format('Y-m-d')
                    : null,
                'tanggal_terakhir_menstruasi' => !$additionalData->sudah_lahir && $additionalData->tanggal_terakhir_menstruasi
                    ? \Carbon\Carbon::parse($additionalData->tanggal_terakhir_menstruasi)->format('Y-m-d')
                    : null,
            ] : null,
        ];
    }

    /**
     * Menghitung progress berdasarkan data anak dan urutan fase.
     */
    public function calculateProgress($anakData = null)
    {
        if (!auth()->check()) {
            return 0;
        }

        $baseStartDate = $this->getBaseStartDate($anakData);
        if (!$baseStartDate) {
            return 0;
        }

        $phaseStartDate = $this->getPhaseStartDate($baseStartDate);
        if (!$phaseStartDate) {
            return 0;
        }

        $deadlineDays = (int) $this->durasi; // Konversi ke integer
        if ($deadlineDays <= 0) {
            return 0;
        }

        $now = now();
        $daysPassedSincePhaseStart = $phaseStartDate->diffInDays($now);

        if ($now->lessThan($phaseStartDate)) {
            return 0;
        }

        if ($daysPassedSincePhaseStart >= $deadlineDays) {
            return 100;
        }

        $progress = (int) (($daysPassedSincePhaseStart / $deadlineDays) * 100);
        return $progress;
    }

    /**
     * Menghitung deadline berdasarkan data anak dan urutan fase.
     */
    public function calculateDeadline($anakData = null)
    {
        $baseStartDate = $this->getBaseStartDate($anakData);
        if (!$baseStartDate) {
            return null;
        }

        $phaseStartDate = $this->getPhaseStartDate($baseStartDate);
        if (!$phaseStartDate) {
            return null;
        }

        $deadlineDays = (int) $this->durasi; // Konversi ke integer
        if ($deadlineDays <= 0) {
            return null;
        }

        $deadline = $phaseStartDate->copy()->addDays($deadlineDays);

        return $deadline->format('Y-m-d');
    }

    /**
     * Mendapatkan base start date dari data anak.
     */
    private function getBaseStartDate($anakData = null)
    {
        if ($anakData && isset($anakData->anak_id)) {

            return $this->getStartDateFromAnakData($anakData);
        }

        $anakFromRequest = request()->has('anak') ? request()->get('anak') : null;
        if ($anakFromRequest && isset($anakFromRequest['anak_id'])) {

            return $this->getStartDateFromAnakId($anakFromRequest['anak_id']);
        }

        if (auth()->check() && auth()->user()->orangtua) {
            $anakList = auth()->user()->orangtua->anak;
            if ($anakList && $anakList->count() > 0) {
                $firstAnak = $anakList->first();

                return $this->getStartDateFromAnakData($firstAnak);
            }
        }


        return null;
    }

    /**
     * Mendapatkan start date spesifik untuk fase ini.
     */
    private function getPhaseStartDate($baseStartDate)
    {
        if (!$baseStartDate) {
            return null;
        }

        // Hitung total durasi fase sebelumnya
        $previousPhasesDuration = Fase::where('fase_id', '<', $this->fase_id)->sum('durasi');
        // Pastikan $previousPhasesDuration adalah integer
        $previousPhasesDuration = (int) $previousPhasesDuration;



        $phaseStartDate = $baseStartDate->copy()->addDays($previousPhasesDuration);


        return $phaseStartDate;
    }

    /**
     * Mendapatkan start date dari anak_id.
     */
    private function getStartDateFromAnakId($anakId)
    {
        $anakRepository = app(AnakRepositoryInterface::class);
        $anak = $anakRepository->getAnakById($anakId);
        if (!$anak) {

            return null;
        }

        return $this->getStartDateFromAnakData($anak);
    }

    /**
     * Mendapatkan start date dari data anak.
     */
    private function getStartDateFromAnakData($anak)
    {
        if (!$anak) {

            return null;
        }

        if ($anak->sudah_lahir && $anak->tanggal_lahir) {
            $startDate = \Carbon\Carbon::parse($anak->tanggal_lahir);

            return $startDate;
        }

        if (!$anak->sudah_lahir && $anak->tanggal_terakhir_menstruasi) {
            $startDate = \Carbon\Carbon::parse($anak->tanggal_terakhir_menstruasi);

            return $startDate;
        }

        $firstTantangan = $this->getFirstCompletedTantangan();
        if ($firstTantangan) {
            $startDate = \Carbon\Carbon::parse($firstTantangan->created_at);

            return $startDate;
        }


        return null;
    }

    /**
     * Mendapatkan tantangan pertama yang selesai.
     */
    private function getFirstCompletedTantangan()
    {
        if (!auth()->check()) {

            return null;
        }

        $anakTantanganRepository = app(AnakTantanganRepositoryInterface::class);
        $tantanganIds = $this->tantangans->pluck('tantangan_id')->toArray();

        $firstTantangan = $anakTantanganRepository->getFirstCompletedTantangan(
            auth()->user()->pengguna_id,
            $tantanganIds
        );


        return $firstTantangan;
    }
}
