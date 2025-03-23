<?php

namespace App\Repositories\Interfaces;

use App\Models\Puskesmas;

interface PuskesmasRepositoryInterface
{
    public function getAllPuskesmas();
    public function getPuskesmasById($id);
    public function createPuskesmas(array $data);
    public function updatePuskesmas($id, array $data);
    public function deletePuskesmas($id);
    public function countPuskesmas();
}