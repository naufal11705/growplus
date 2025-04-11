<?php

namespace App\Repositories\Interfaces;

interface AnakTantanganRepositoryInterface
{
    public function getAllAnakTantangans();
    public function getAnakTantangansByAnakId($id);
    public function getAnakTantangansByTantanganId($id);
    public function createAnakTantangans(array $data);
    public function updateAnakTantangans($id, array $data);
    public function deleteAnakTantangans(array $data);
    public function countTotalPoints($id);
    public function getFirstCompletedTantangan($anakId);
}
