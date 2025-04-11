<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tantangan extends Model
{
    /** @use HasFactory<\Database\Factories\TantanganFactory> */
    use HasFactory;

    protected $table = 'tantangans';
    protected $primaryKey = 'tantangan_id';

    protected $fillable = [
        'fase_id',
        'activity',
        'point',
        'tingkat_ekonomi',
        'status'
    ];

    public function fase()
    {
        return $this->belongsTo(Fase::class, 'fase_id', 'fase_id');
    }

    public function anakTantangans()
    {
        return $this->hasMany(AnakTantangan::class, 'tantangan_id');
    }
}
