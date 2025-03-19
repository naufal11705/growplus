<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrangTua extends Model
{
    /** @use HasFactory<\Database\Factories\OrangTuaFactory> */
    use HasFactory;

    protected $table = 'orang_tuas';
    protected $primaryKey = 'orangtua_id';

    protected $fillable = [
        'pengguna_id',
        'nik',
        'no_jkn',
        'tempat_lahir',
        'tanggal_lahir',
        'gologan_darah',
        'alamat',
        'pekerjaan',
        'penghasilan',
        'sumber_penghasilan',
        'jumlah_tanggungan',
        'status_rumah',
        'tanggungan_listrik',
        'tanggungan_air'
    ];

    public function pengguna()
    {
        return $this->belongsTo(Pengguna::class, 'pengguna_id', 'pengguna_id');
    }
}
