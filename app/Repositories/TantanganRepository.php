<?php

namespace App\Repositories;

use App\Models\Tantangan;
use App\Repositories\Interfaces\TantanganRepositoryInterface;

class TantanganRepository implements TantanganRepositoryInterface
{
    public function getAllTantangan()
    {
        return Tantangan::all();
    }

    public function getTantanganById($id)
    {
        return Tantangan::find($id);
    }

    public function createTantangan(array $data)
    {
        return Tantangan::create($data);
    }

    public function updateTantangan($id, array $data)
    {
        return Tantangan::find($id)->update($data);
    }

    public function deleteTantangan($id)
    {
        return Tantangan::destroy($id);
    }

    public function countTantangan()
    {
        return Tantangan::count();
    }
}
