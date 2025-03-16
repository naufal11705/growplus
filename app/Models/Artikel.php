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
        'phase_id',
        'title',
        'content'
    ];

    public function phase()
    {
        return $this->belongsTo(Fase::class, 'phase_id', 'phase_id');
    }
}
