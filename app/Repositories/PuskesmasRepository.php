<?php

namespace App\Repositories;

use App\Models\Puskesmas;
use App\Repositories\Interfaces\PuskesmasRepositoryInterface;

class PuskesmasRepository implements PuskesmasRepositoryInterface
{

    public function getAllPuskesmas()
    {
        return Puskesmas::all();
    }

    public function getPuskesmasById($id)
    {
        return Puskesmas::findOrFail($id);
    }

    public function createPuskesmas(array $data)
    {
        return Puskesmas::create($data);
    }

    public function updatePuskesmas($id, array $data)
    {
        $puskesmas = Puskesmas::findOrFail($id);
        $puskesmas->update($data);
        return $puskesmas;
    }

    public function deletePuskesmas($id)
    {
        $puskesmas = Puskesmas::findOrFail($id);
        return $puskesmas->delete();
    }

    public function countPuskesmas()
    {
        return Puskesmas::count();
    }
}