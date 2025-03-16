<?php

namespace App\Repositories;

use App\Models\Challenge;
use App\Repositories\Interfaces\ChallengeRepositoryInterface;

class ChallengeRepository implements ChallengeRepositoryInterface
{
    public function getAllChallenges()
    {
        return Challenge::all();
    }

    public function getChallengeById($id)
    {
        return Challenge::find($id);
    }

    public function createChallenge(array $data)
    {
        return Challenge::create($data);
    }

    public function updateChallenge($id, array $data)
    {
        return Challenge::find($id)->update($data);
    }

    public function deleteChallenge($id)
    {
        return Challenge::destroy($id);
    }
}