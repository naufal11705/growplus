<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengguna extends Model
{
    /** @use HasFactory<\Database\Factories\PenggunaFactory> */
    use HasFactory;

    protected $table = 'penggunas';
    protected $primaryKey = 'pengguna_id';

    protected $fillable = [
        'level_id',
        'username',
        'password',
        'name',
        'email'
    ];

    public function role()
    {
        return $this->belongsTo(Role::class, 'level_id', 'level_id');
    }
}
