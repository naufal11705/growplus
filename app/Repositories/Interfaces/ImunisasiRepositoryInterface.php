<?php

namespace App\Repositories\Interfaces;

use App\Models\Imunisasi;

interface ImunisasiRepositoryInterface
{
    public function getAllImunisasis();
    public function getImunisasiById($id);
    public function createImunisasi(array $data);
    public function updateImunisasi($id, array $data);
    public function deleteImunisasi($id);
}