<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Puskesmas extends Model
{
    /** @use HasFactory<\Database\Factories\PuskesmasFactory> */
    use HasFactory;

    protected $table = 'puskesmas';
    protected $primaryKey = 'puskesmas_id';

    protected $fillable = [
        'nama',
        'alamat',
        'kecamatan',
        'kota',
        'kontak'
    ];
}
