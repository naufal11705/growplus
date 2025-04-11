<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    //
    protected $fillable = [
        'title',
        'description',
        'points_cost',
        'validity',
        'expiry_date',
        'terms',
        'code',
        'background_color',
        'featured',
        'provider',
        'logo_url',
        'provider_url'
    ];

    protected $casts = [
        'terms' => 'array',
        'expiry_date' => 'date',
        'featured' => 'boolean',
    ];

    public function claims()
    {
        return $this->hasMany(Claim::class, 'voucher_id');
    }
}
