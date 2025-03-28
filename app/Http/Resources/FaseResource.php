<?php

namespace App\Http\Resources;

use App\Repositories\Interfaces\PenggunaTantanganRepositoryInterface;
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
            'tantangans' => $this->tantangans->map(fn($tantangan) => $tantangan->activity)->toArray(),
            'benefits' => $this->benefits ? explode(',', $this->benefits) : $this->tantangans->map(fn($tantangan) => "+{$tantangan->point} Poin")->toArray(),
            'status' => $this->status,
            'progress' => $this->calculateProgress(), // this
        ];
    }

    protected function countCompletedTantangans($id)
    {
        $penggunaTantanganRepository = app(PenggunaTantanganRepositoryInterface::class);

        $completedTantangans = $penggunaTantanganRepository
            ->getPenggunaTantangansByPenggunaId($id)
            ->whereIn('tantangan_id', $this->tantangans->pluck('tantangan_id')->toArray())
            ->count();

        return $completedTantangans;
    }

    public function calculateProgress()
    {
        if (!auth()->check()) {
            return 0;
        }

        $penggunaId = auth()->user()->pengguna_id;
        $totalTantangans = $this->tantangans->count();
        if ($totalTantangans == 0) return 0;

        return (int)(($this->countCompletedTantangans($penggunaId) / $totalTantangans) * 100);
    }
}
