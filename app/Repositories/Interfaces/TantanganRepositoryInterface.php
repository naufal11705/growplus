<?php

namespace App\Repositories\Interfaces;

use App\Models\Tantangan;

interface TantanganRepositoryInterface
{
    public function getAllTantangan();
    public function getTantanganById($id);
    public function createTantangan(array $data);
    public function updateTantangan($id, array $data);
    public function deleteTantangan($id);
    public function countTantangan();
    public function getTantanganByStatus($id);
}
