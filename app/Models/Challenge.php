<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Challenge extends Model
{
    use HasFactory;

    protected $table = 'challenges';
    protected $primaryKey = 'challenge_id';

    protected $fillable = [
        'phase_id',
        'activity',
        'point',
        'status'
    ];

    public function phase()
    {
        return $this->belongsTo(Phase::class, 'phase_id', 'phase_id');
    }
}
