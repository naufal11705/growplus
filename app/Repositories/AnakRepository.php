<?php

namespace App\Repositories;

use App\Models\Anak;
use App\Repositories\Interfaces\AnakRepositoryInterface;

class AnakRepository implements AnakRepositoryInterface
{
    public function getAllAnaks()
    {
        return Anak::all();
    }

    public function getAnakById($id)
    {
        return Anak::find($id);
    }

    public function getAnakByOrangTuaId($id)
    {
        return auth()->user()->orangtua->anak;
    }

    public function createAnak(array $data)
    {
        return Anak::create($data);
    }

    public function updateAnak($id, array $data)
    {
        return Anak::find($id)->update($data);
    }

    public function deleteAnak($id)
    {
        return Anak::destroy($id);
    }
}
