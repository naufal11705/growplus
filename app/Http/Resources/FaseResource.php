<?php

namespace App\Http\Resources;

use App\Repositories\Interfaces\AnakRepositoryInterface;
use App\Repositories\Interfaces\AnakTantanganRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FaseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
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
            'benefits' => array_values(array_filter(preg_split('/(?<=\.)\s+/', $this->benefits) ?: [])),
            'status' => $this->status,
            'progress' => $this->calculateProgress(),
            'durasi' => $this->durasi,
        ];
    }

    public function calculateProgress()
    {
        if (!auth()->check()) {
            return 0;
        }

        $penggunaId = auth()->user()->pengguna_id;
        $anak = request()->has('anak') ? request()->get('anak') : null;

        // For the progress based on deadline
        $startDate = $this->getStartDate($anak);
        if (!$startDate) {
            return 0;
        }

        $deadlineDays = $this->durasi;
        $now = now();

        // Calculate days passed since start date
        $daysPassed = $startDate->diffInDays($now);

        // If days passed is greater than deadline, progress is 100%
        if ($daysPassed >= $deadlineDays) {
            return 100;
        }

        // Calculate progress as percentage of days passed over deadline days
        return (int) (($daysPassed / $deadlineDays) * 100);
    }

    public function calculateDeadline()
    {
        $anak = request()->has('anak') ? request()->get('anak') : null;
        $startDate = $this->getStartDate($anak);

        if (!$startDate) {
            return null;
        }

        return $startDate->addDays($this->durasi)->format('Y-m-d');
    }

    private function getStartDate($anak = null)
    {
        // If we have specific anak data passed
        if ($anak && isset($anak['anak_id'])) {
            return $this->getStartDateFromAnakId($anak['anak_id']);
        }

        // Otherwise try to use the authenticated user's child data
        if (auth()->check() && auth()->user()->orangtua) {
            $anakList = auth()->user()->orangtua->anak;
            if ($anakList && $anakList->count() > 0) {
                $firstAnak = $anakList->first();
                return $this->getStartDateFromAnakData($firstAnak);
            }
        }

        return null;
    }

    private function getStartDateFromAnakId($anakId)
    {
        $anakRepository = app(AnakRepositoryInterface::class);
        $anak = $anakRepository->getAnakById($anakId);
        if (!$anak) {
            return null;
        }

        return $this->getStartDateFromAnakData($anak);
    }

    private function getStartDateFromAnakData($anak)
    {
        if (!$anak) {
            return null;
        }

        // If child is born, use birth date
        if ($anak->sudah_lahir && $anak->tanggal_lahir) {
            return \Carbon\Carbon::parse($anak->tanggal_lahir);
        }

        // If child is not born, use last menstruation date
        if (!$anak->sudah_lahir && $anak->tanggal_terakhir_menstruasi) {
            return \Carbon\Carbon::parse($anak->tanggal_terakhir_menstruasi);
        }

        // Fallback to first tantangan completion date if available
        $firstTantangan = $this->getFirstCompletedTantangan();
        if ($firstTantangan) {
            return \Carbon\Carbon::parse($firstTantangan->created_at);
        }

        return null;
    }

    private function getFirstCompletedTantangan()
    {
        if (!auth()->check()) {
            return null;
        }

        $anakTantanganRepository = app(AnakTantanganRepositoryInterface::class);
        $tantanganIds = $this->tantangans->pluck('tantangan_id')->toArray();

        return $anakTantanganRepository->getFirstCompletedTantangan(
            auth()->user()->pengguna_id,
            $tantanganIds
        );
    }
}
