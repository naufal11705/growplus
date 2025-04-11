<?php

namespace App\Repositories;

use App\Models\AnakTantangan;
use App\Repositories\Interfaces\AnakTantanganRepositoryInterface;
use Carbon\Carbon;
use App\Models\Catatan;
use App\Repositories\Interfaces\CatatanRepositoryInterface;

class CatatanRepository implements CatatanRepositoryInterface
{
    public function getAllCatatans()
    {
        return Catatan::all();
    }

    public function getCatatansByAnakId($id)
    {
        $todayRecords = Catatan::where('anak_id', $id)
            ->whereDate('tanggal', Carbon::today())
            ->get();

        return $todayRecords;
    }

    public function createCatatans(array $data)
    {
        return Catatan::create($data);
    }

    public function updateCatatans($id, array $data)
    {
        return Catatan::find($id)->update($data);
    }

    public function deleteCatatans(array $data)
    {
        return Catatan::where('anak_id', $data['anak_id'])
            ->where('fase_id', $data['fase_id'])->delete();
    }
}