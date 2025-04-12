<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Catatan extends Model
{
    use HasFactory;
   
    protected $table = 'catatan';

    protected $primaryKey = 'catatan_id';

    protected $fillable = [
        'anak_id',
        'fase_id',
        'catatan',
        'tanggal',
    ];
    public function anak()
    {
        return $this->belongsTo(Anak::class, 'anak_id', 'anak_id');
    }
    public function fase()
    {
        return $this->belongsTo(Fase::class, 'fase_id', 'fase_id');
    }
}
