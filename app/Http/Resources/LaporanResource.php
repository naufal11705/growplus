<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LaporanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'orangtua_id' => $this->orangtua_id,
            'nama' => $this->nama ?? '',
            'nik' => $this->nik ?? '',
            'no_jkn' => $this->no_jkn ?? '',
            'tempat_lahir' => $this->tempat_lahir ?? '',
            'tanggal_lahir' => $this->tanggal_lahir ?? '',
            'jenis_kelamin' => $this->jenis_kelamin ?? '',
            'anaks' => $this->whenLoaded('anaks', function () {
                return $this->anaks->map(function ($anak) {
                    return [
                        'anak_id' => $anak->anak_id,
                        'nama' => $anak->nama ?? 'Tidak diketahui', // Adjust if column is nama_anak
                    ];
                })->toArray();
            }, []),
        ];
    }
}
