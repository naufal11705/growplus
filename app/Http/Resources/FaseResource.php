<?php

namespace App\Http\Resources;

use App\Repositories\Interfaces\AnakRepositoryInterface;
use App\Repositories\Interfaces\AnakTantanganRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Repositories\AnakRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class FaseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Get anak from the controller, not from additional data
        if (request()->route('anak_id') != null) {
            $anak = app(AnakRepository::class)->getAnakById(request()->route('anak_id'));
        } else {
            $anak = app(AnakRepository::class)->getAnakByOrangTuaId(auth()->user()->orangtua->orangtua_id);
        }

        return [
            'fase_id' => $this->fase_id,
            'judul' => $this->judul,
            'subjudul' => $this->deskripsi ? substr($this->deskripsi, 0, 50) . '...' : "Tantangan fase {$this->judul}",
            'deskripsi' => $this->deskripsi ?? 'Ikuti tantangan ini untuk tumbuh sehat!',
            'banner' => $this->banner ?? '/images/default-challenge.jpg',
            'tantangans' => $this->whenLoaded('tantangans', function () {
                return $this->tantangans->map(fn($tantangan) => [
                    'tantangan_id' => $tantangan->tantangan_id,
                    'activity' => $tantangan->activity,
                ])->values()->toArray();
            }, []),
            'benefits' => array_values(array_filter(explode('. ', $this->benefits ?? ''))),
            'status' => $this->status,
            'progress' => $this->calculateProgress($anak),
            'durasi' => (int) $this->durasi,
            'deadline' => $this->calculateDeadline($anak),
            'anak' => $anak ? [
                'anak_id' => $anak->anak_id,
                'nama' => $anak->nama_anak ?? null,
                'sudah_lahir' => (bool) $anak->sudah_lahir,
                'tanggal_lahir' => $anak->sudah_lahir && $anak->tanggal_lahir
                    ? Carbon::parse($anak->tanggal_lahir)->format('Y-m-d')
                    : null,
                'tanggal_terakhir_menstruasi' => !$anak->sudah_lahir && $anak->tanggal_terakhir_menstruasi
                    ? Carbon::parse($anak->tanggal_terakhir_menstruasi)->format('Y-m-d')
                    : null,
            ] : null,
        ];
    }

    /**
     * Calculate progress based on anak data.
     */
    public function calculateProgress($anak = null): int
    {
        if (!$anak || !isset($anak->anak_id)) {
            return 0;
        }

        $startDate = $this->getStartDate($anak);
        if (!$startDate) {
            return 0;
        }

        $phaseStartDate = $this->getPhaseStartDate($startDate);
        if (!$phaseStartDate) {
            return 0;
        }

        $durasi = (int) $this->durasi;
        if ($durasi <= 0) {
            return 0;
        }

        $now = now();
        // If we haven't reached the phase start date yet
        if ($now < $phaseStartDate) {
            return 0;
        }

        $daysPassed = $phaseStartDate->diffInDays($now);
        if ($daysPassed >= $durasi) {
            return 100;
        }

        return (int) (($daysPassed / $durasi) * 100);
    }

    /**
     * Calculate deadline based on anak data.
     */
    protected function calculateDeadline($anak = null): ?string
    {
        if (!$anak || !isset($anak->anak_id)) {
            return null;
        }

        $startDate = $this->getStartDate($anak);
        if (!$startDate) {
            return null;
        }

        $phaseStartDate = $this->getPhaseStartDate($startDate);
        if (!$phaseStartDate) {
            return null;
        }

        $durasi = (int) $this->durasi;
        if ($durasi <= 0) {
            return null;
        }

        return $phaseStartDate->addDays($durasi)->format('Y-m-d');
    }

    /**
     * Get the base start date from anak data.
     */
    protected function getStartDate($anak): ?Carbon
    {
        // Type safety checks
        if (!is_object($anak)) {
            return null;
        }

        if (isset($anak->sudah_lahir) && $anak->sudah_lahir && isset($anak->tanggal_lahir) && $anak->tanggal_lahir) {
            return Carbon::parse($anak->tanggal_lahir);
        }

        if (isset($anak->sudah_lahir) && !$anak->sudah_lahir && isset($anak->tanggal_terakhir_menstruasi) && $anak->tanggal_terakhir_menstruasi) {
            return Carbon::parse($anak->tanggal_terakhir_menstruasi);
        }

        return null;
    }

    /**
     * Get the phase start date based on previous phases' duration.
     */
    protected function getPhaseStartDate(Carbon $baseStartDate): ?Carbon
    {
        try {
            // Get the sum of durations for all phases with IDs less than current
            $previousDuration = DB::table('fases')
                ->where('fase_id', '<', $this->fase_id)
                ->sum('durasi');

            // Ensure we're working with an integer
            $previousDuration = (int) $previousDuration;

            return $baseStartDate->copy()->addDays($previousDuration);
        } catch (\Exception $e) {
            Log::error('Error calculating phase start date: ' . $e->getMessage());
            return null;
        }
    }
}
