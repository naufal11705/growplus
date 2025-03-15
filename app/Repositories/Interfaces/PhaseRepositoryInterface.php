<?php

namespace App\Repositories\Interfaces;

use App\Models\Phase;

interface PhaseRepositoryInterface
{
    public function getAllPhases();
    public function getPhaseById($id);
    public function createPhase(array $data);
    public function updatePhase($id, array $data);
    public function deletePhase($id);
}