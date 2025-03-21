<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imunisasi extends Model
{
    /** @use HasFactory<\Database\Factories\ImunisasiFactory> */
    use HasFactory;

    protected $table = 'imunisasis';
    protected $primaryKey = 'imunisasi_id';

    protected $fillable = [
        'puskesmas_id',
        'nama',
        'jenis',
        'usia_minimum',
        'usia_maksimum',
        'tanggal'
    ];
    
    public function puskesmas()
    {
        return $this->belongsTo(Puskesmas::class, 'puskesmas_id', 'puskesmas_id');
    }

}
