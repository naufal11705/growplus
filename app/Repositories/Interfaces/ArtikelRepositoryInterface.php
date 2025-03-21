<?php

namespace App\Repositories\Interfaces;

use App\Models\Article;

interface ArtikelRepositoryInterface
{
    public function getAllArtikel();
    public function getArtikelById($id);
    public function getArtikelBySlug($slug);
    public function createArtikel(array $data);
    public function updateArtikel($id, array $data);
    public function deleteArtikel($id);
}
