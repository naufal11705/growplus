<?php

namespace App\Repositories\Interfaces;

interface CatatanRepositoryInterface
{
    public function getAllCatatans();
    public function getCatatansByAnakId($id);
    public function createCatatans(array $data);
    public function updateCatatans($id, array $data);
    public function deleteCatatans(array $data);
}
