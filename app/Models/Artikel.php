<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artikel extends Model
{
    /** @use HasFactory<\Database\Factories\ArtikelFactory> */
    use HasFactory;

    protected $table = 'artikels';
    protected $primaryKey = 'artikel_id';

    protected $fillable = [
        // 'fase_id',
        'title',
        'author',
        'content',
        'banner',
        'slug'
    ];

    // public function fase()
    // {
    //     return $this->belongsTo(Fase::class, 'fase_id', 'fase_id');
    // }
}
