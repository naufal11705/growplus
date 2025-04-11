<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrangTuaUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'pengguna_id' => ['required', 'integer', 'exists:penggunas,pengguna_id'],
            'nama' => ['required', 'string', 'max:255'],
            'nik' => ['required', 'string', 'min:16'],
            'no_jkn' => ['required', 'string', 'min:13'],
            'tempat_lahir' => ['required', 'string', 'max:255'],
            'tanggal_lahir' => ['required', 'date'],
            'golongan_darah' => ['required', 'string', 'max:3'],
            'alamat' => ['required', 'string'],
            'kecamatan' => ['required', 'string'],
            'kabupaten' => ['required', 'string'],
            'provinsi' => ['required', 'string'],
            'pekerjaan' => ['required', 'string', 'max:255'],
            'penghasilan' => ['required', 'string'],
            'sumber_penghasilan' => ['required', 'string', 'max:255'],
            'jumlah_tanggungan' => ['required', 'integer'],
            'status_rumah' => ['required', 'string', 'max:255'],
            'tanggungan_listrik' => ['required', 'integer'],
            'tanggungan_air' => ['required', 'integer'],
            'tingkat_ekonomi' => ['required', 'integer'],
        ];
    }
}
