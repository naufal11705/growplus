<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnakTantangan extends Model
{
    /** @use HasFactory<\Database\Factories\AnakTantanganFactory> */
    use HasFactory;

    protected $table = 'anak_tantangans';

    protected $fillable = [
        'anak_id',
        'tantangan_id',
        'gambar_url',
    ];

    public function anak()
    {
        return $this->belongsTo(Anak::class, 'anak_id', 'anak_id');
    }

    public function tantangan()
    {
        return $this->belongsTo(Tantangan::class, 'tantangan_id', 'tantangan_id');
    }
}
