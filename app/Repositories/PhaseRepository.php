<?php

namespace App\Repositories;

use App\Models\Phase;
use App\Repositories\Interfaces\PhaseRepositoryInterface;

class PhaseRepository implements PhaseRepositoryInterface
{
    public function getAllPhases()
    {
        return Phase::all();
    }

    public function getPhaseById($id)
    {
        return Phase::find($id);
    }

    public function createPhase(array $data)
    {
        return Phase::create($data);
    }

    public function updatePhase($id, array $data)
    {
        return Phase::find($id)->update($data);
    }

    public function deletePhase($id)
    {
        return Phase::find($id)->delete();
    }
}