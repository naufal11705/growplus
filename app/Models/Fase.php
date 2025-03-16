<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fase extends Model
{
    /** @use HasFactory<\Database\Factories\FaseFactory> */
    use HasFactory;

    protected $table = 'fases';
    protected $primaryKey = 'fase_id';

    protected $fillable = [
        'title',
        'description',
        'benefits',
        'banner',
        'progress',
        'status'
    ];
}
