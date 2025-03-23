<?php

namespace App\Repositories\Interfaces;

interface PenggunaTantanganRepositoryInterface
{
    public function getAllPenggunaTantangans();
    public function getPenggunaTantangansByPenggunaId($id);
    public function getPenggunaTantangansByTantanganId($id);
    public function createPenggunaTantangans(array $data);
    public function updatePenggunaTantangans($id, array $data);
    public function deletePenggunaTantangans($id);
}
