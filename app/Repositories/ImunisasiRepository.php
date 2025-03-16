<?php

namespace App\Repositories;

use App\Models\Imunisasi;
use App\Repositories\Interfaces\ImunisasiRepositoryInterface;

class ImunisasiRepository implements ImunisasiRepositoryInterface
{
    public function getAllImunisasis()
    {
        return Imunisasi::all();
    }

    public function getImunisasiById($id)
    {
        return Imunisasi::find($id);
    }

    public function createImunisasi(array $data)
    {
        return Imunisasi::create($data);
    }

    public function updateImunisasi($id, array $data)
    {
        return Imunisasi::find($id)->update($data);
    }

    public function deleteImunisasi($id)
    {
        return Imunisasi::destroy($id);
    }
}