<?php

namespace App\Repositories;

use App\Models\Pengguna;
use App\Repositories\Interfaces\PenggunaRepositoryInterface;

class PenggunaRepository implements PenggunaRepositoryInterface
{

    public function getAllPenggunas()
    {
        return Pengguna::all();
    }

    public function getPenggunaById($id)
    {
        return Pengguna::find($id);
    }

    public function createPengguna(array $data)
    {
        return Pengguna::create($data);
    }

    public function updatePengguna($id, array $data)
    {
        $pengguna = Pengguna::findOrFail($id);
        $pengguna->update($data);
        return $pengguna;
    }

    public function deletePengguna($id)
    {
        $pengguna = Pengguna::findOrFail($id);
        return $pengguna->delete();
    }
}
