<?php

namespace App\Repositories;

use App\Models\PenggunaTantangan;
use App\Repositories\Interfaces\PenggunaTantanganRepositoryInterface;

class PenggunaTantanganRepository implements PenggunaTantanganRepositoryInterface
{
    public function getAllPenggunaTantangans()
    {
        return PenggunaTantangan::all();
    }

    public function getPenggunaTantangansByPenggunaId($id)
    {
        return PenggunaTantangan::where('pengguna_id', $id)->get();
    }

    public function getPenggunaTantangansByTantanganId($id)
    {
        return PenggunaTantangan::where('tantangan_id', $id)->get();
    }

    public function createPenggunaTantangans(array $data)
    {
        return PenggunaTantangan::create($data);
    }

    public function updatePenggunaTantangans($id, array $data)
    {
        return PenggunaTantangan::find($id)->update($data);
    }

    public function deletePenggunaTantangans($id)
    {
        return PenggunaTantangan::destroy($id);
    }

    public function countTotalPoints($id)
    {
        return $points = PenggunaTantangan::where('pengguna_id', $id)
            ->join('tantangans', 'pengguna_tantangans.tantangan_id', '=', 'tantangans.tantangan_id')
            ->sum('tantangans.point') ?? 0;
    }

    public function countTotalProgress($penggunaId, $fases): int
    {
        $totalTantangans = $fases->pluck('tantangans')->flatten()->count();
        if ($totalTantangans == 0) {
            return 0;
        }

        $completedTantangans = PenggunaTantangan::where('pengguna_id', $penggunaId)
            ->whereIn('tantangan_id', $fases->pluck('tantangans')->flatten()->pluck('id'))
            ->count();

        return (int)(($completedTantangans / $totalTantangans) * 100);
        dd($completedTantangans);
        exit;
    }
}
