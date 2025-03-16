<?php

namespace App\Repositories\Interfaces;

use App\Models\Fase;

interface FaseRepositoryInterface
{
    public function getAllFase();
    public function getFaseById($id);
    public function createFase(array $data);
    public function updateFase($id, array $data);
    public function deleteFase($id);
}
