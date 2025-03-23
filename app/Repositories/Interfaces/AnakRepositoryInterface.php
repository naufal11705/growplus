<?php

namespace App\Repositories\Interfaces;

use App\Models\Anak;

interface AnakRepositoryInterface
{
    public function getAllAnaks();
    public function getAnakById($id);
    public function getAnakByOrangTuaId($id);
    public function createAnak(array $data);
    public function updateAnak($id, array $data);
    public function deleteAnak($id);
}
