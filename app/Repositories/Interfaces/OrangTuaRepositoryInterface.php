<?php

namespace App\Repositories\Interfaces;

use App\Models\OrangTua;

interface OrangTuaRepositoryInterface
{
    public function getAllOrangTua();
    public function getOrangTuaById($id);
    public function getOrangTuaByPenggunaId($id);
    public function createOrangTua(array $data);
    public function updateOrangTua($id, array $data);
    public function deleteOrangTua($id);
    public function countOrangTua();
}
