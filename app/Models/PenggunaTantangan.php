<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PenggunaTantangan extends Model
{
    /** @use HasFactory<\Database\Factories\PenggunaTantanganFactory> */
    use HasFactory;

    protected $table = 'pengguna_tantangans';

    protected $fillable = [
        'pengguna_id',
        'tantangan_id',
    ];

    public function pengguna()
    {
        return $this->belongsTo(Pengguna::class, 'pengguna_id', 'pengguna_id');
    }

    public function tantangan()
    {
        return $this->belongsTo(Tantangan::class, 'tantangan_id', 'tantangan_id');
    }
}
