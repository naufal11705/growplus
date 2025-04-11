<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Pengguna extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\PenggunaFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'penggunas';
    protected $guard = 'pengguna';
    protected $primaryKey = 'pengguna_id';

    protected $fillable = [
        'role_id',
        'username',
        'password',
        'nama',
        'email',
        'total_point',
    ];

    protected $hidden = [
        'password'
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id', 'role_id');
    }

    public function orangtua()
    {
        return $this->hasOne(OrangTua::class, 'pengguna_id', 'pengguna_id');
    }

    public function penggunaTantangans()
    {
        return $this->hasMany(PenggunaTantangan::class, 'pengguna_id');
    }

    public function claims()
    {
        return $this->hasMany(Claim::class, 'user_id');
    }
}
