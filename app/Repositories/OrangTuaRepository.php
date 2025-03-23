<?php

namespace App\Repositories;

use App\Models\OrangTua;
use App\Repositories\Interfaces\OrangTuaRepositoryInterface;

class OrangTuaRepository implements OrangTuaRepositoryInterface
{
    public function getAllOrangTua()
    {
        return OrangTua::all();
    }

    public function getOrangTuaById($id)
    {
        return OrangTua::find($id);
    }

    public function getOrangTuaByPenggunaId($id)
    {
        return auth()->user()->orangTua;
    }

    public function createOrangTua(array $data)
    {
        return OrangTua::create($data);
    }

    public function updateOrangTua($id, array $data)
    {
        return OrangTua::find($id)->update($data);
    }

    public function deleteOrangTua($id)
    {
        return OrangTua::destroy($id);
    }

    public function countOrangTua()
    {
        return OrangTua::count();
    }
}
