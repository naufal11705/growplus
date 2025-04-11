<?php

namespace App\Repositories\Interfaces;

use App\Models\Pengguna;

interface PenggunaRepositoryInterface
{
    public function getAllPenggunas();
    public function getPenggunaById($id);
    public function createPengguna(array $data);
    public function updatePengguna($id, array $data);
    public function deletePengguna($id);
    public function findById($id);
}
