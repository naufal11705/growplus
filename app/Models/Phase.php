<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Phase extends Model
{
    use HasFactory;

    protected $table = 'phases';
    protected $primaryKey = 'phase_id';

    protected $fillable = [
        'title',
        'description',
        'benefits',
        'banner',
        'progress',
        'status'
    ];
}
