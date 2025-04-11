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

    public function deletePenggunaTantangans(array $data)
    {
        return PenggunaTantangan::where('pengguna_id', $data['pengguna_id'])
            ->where('tantangan_id', $data['tantangan_id'])->destroy();
    }

    public function countTotalPoints($id)
    {
        return $points = PenggunaTantangan::where('pengguna_id', $id)
            ->join('tantangans', 'pengguna_tantangans.tantangan_id', '=', 'tantangans.tantangan_id')
            ->sum('tantangans.point') ?? 0;
    }
}
