<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FasKes extends Model
{
    /** @use HasFactory<\Database\Factories\FasKesFactory> */
    use HasFactory;

    protected $table = 'fas_kes';
    protected $primaryKey = 'faskes_id';

    protected $fillable = [
        'orangtua_id',
        'puskesmas_id',
        'no_reg_kohort_ibu',
        'no_reg_kohort_anak'
    ];

    public function orangtua()
    {
        return $this->belongsTo(OrangTua::class, 'orangtua_id', 'orangtua_id');
    }

    public function puskesmas()
    {
        return $this->belongsTo(Puskesmas::class, 'puskesmas_id', 'puskesmas_id');
    }
}
