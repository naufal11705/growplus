<?php

namespace App\Repositories;

use App\Models\Artikel;
use App\Repositories\Interfaces\ArtikelRepositoryInterface;

class ArtikelRepository implements ArtikelRepositoryInterface
{
    public function getAllArtikel()
    {
        return Artikel::all();
    }

    public function getArtikelById($id)
    {
        return Artikel::find($id);
    }

    public function createArtikel(array $data)
    {
        return Artikel::create($data);
    }

    public function updateArtikel($id, array $data)
    {
        return Artikel::find($id)->update($data);
    }

    public function deleteArtikel($id)
    {
        return Artikel::destroy($id);
    }
}
