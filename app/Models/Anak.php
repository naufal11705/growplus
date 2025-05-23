<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anak extends Model
{
    /** @use HasFactory<\Database\Factories\AnakFactory> */
    use HasFactory;

    protected $table = 'anaks';
    protected $primaryKey = 'anak_id';

    protected $fillable = [
        'orangtua_id',
        'nama',
        'nik',
        'no_jkn',
        'tempat_lahir',
        'tanggal_lahir',
        'golongan_darah',
        'berat_badan',
        'tinggi_badan',
        'jenis_kelamin',
        'sudah_lahir',
        'tanggal_terakhir_menstruasi',
    ];

    public function orangtua()
    {
        return $this->belongsTo(OrangTua::class, 'orangtua_id', 'orangtua_id');
    }
}
