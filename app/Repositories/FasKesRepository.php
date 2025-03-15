<?php

namespace App\Repositories;

use App\Models\FasKes;
use App\Repositories\Interfaces\FasKesRepositoryInterface;

class FasKesRepository implements FasKesRepositoryInterface
{

    public function getAllFasKes()
    {
        return FasKes::all();
    }

    public function getFasKesById($id)
    {
        return FasKes::findOrFail($id);
    }

    public function createFasKes(array $data)
    {
        return FasKes::create($data);
    }

    public function updateFasKes($id, array $data)
    {
        $fasKes = FasKes::findOrFail($id);
        $fasKes->update($data);
        return $fasKes;
    }

    public function deleteFasKes($id)
    {
        $fasKes = FasKes::findOrFail($id);
        return $fasKes->delete();
    }
}