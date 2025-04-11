<?php

namespace App\Repositories;

use App\Models\AnakTantangan;
use App\Repositories\Interfaces\AnakTantanganRepositoryInterface;
use Carbon\Carbon;

class AnakTantanganRepository implements AnakTantanganRepositoryInterface
{
    public function getAllAnakTantangans()
    {
        return AnakTantangan::all();
    }

    public function getAnakTantangansByAnakId($id)
    {
        return AnakTantangan::where('anak_id', $id)
            ->whereDate('tanggal_selesai', Carbon::today())
            ->get();
    }

    public function getAnakTantangansByTantanganId($id)
    {
        return AnakTantangan::where('tantangan_id', $id)->get();
    }

    public function createAnakTantangans(array $data)
    {
        return AnakTantangan::create($data);
    }

    public function updateAnakTantangans($id, array $data)
    {
        return AnakTantangan::find($id)->update($data);
    }

    public function deleteAnakTantangans(array $data)
    {
        return AnakTantangan::where('anak_id', $data['anak_id'])
            ->where('tantangan_id', $data['tantangan_id'])->delete();
    }

    public function countTotalPoints($id)
    {
        return $points = AnakTantangan::where('anak_id', $id)
            ->join('tantangans', 'anak_tantangans.tantangan_id', '=', 'tantangans.tantangan_id')
            ->sum('tantangans.point') ?? 0;
    }

    public function getFirstCompletedTantangan($anakId, array $tantanganIds)
    {
        return AnakTantangan::where('anak_id', $anakId)
            ->whereIn('tantangan_id', $tantanganIds)
            ->orderBy('created_at', 'asc')
            ->first();
    }
}
