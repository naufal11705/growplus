<?php

namespace App\Repositories;

use App\Models\Fase;
use App\Repositories\Interfaces\FaseRepositoryInterface;

class FaseRepository implements FaseRepositoryInterface
{
    public function getAllFase()
    {
        return Fase::all();
    }

    public function getFaseById($id)
    {
        return Fase::find($id);
    }

    public function createFase(array $data)
    {
        return Fase::create($data);
    }

    public function updateFase($id, array $data)
    {
        return Fase::find($id)->update($data);
    }

    public function deleteFase($id)
    {
        return Fase::destroy($id);
    }
}
