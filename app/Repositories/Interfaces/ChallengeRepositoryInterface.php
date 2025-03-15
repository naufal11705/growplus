<?php

namespace App\Repositories\Interfaces;

use App\Models\Challenge;

interface ChallengeRepositoryInterface
{
    public function getAllChallenges();
    public function getChallengeById($id);
    public function createChallenge(array $data);
    public function updateChallenge($id, array $data);
    public function deleteChallenge($id);
}