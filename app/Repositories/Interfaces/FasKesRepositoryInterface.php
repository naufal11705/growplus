<?php

namespace App\Repositories\Interfaces;

use App\Models\FasKes;

interface FasKesRepositoryInterface
{
    public function getAllFasKes();
    public function getFasKesById($id);
    public function createFasKes(array $data);
    public function updateFasKes($id, array $data);
    public function deleteFasKes($id);
}