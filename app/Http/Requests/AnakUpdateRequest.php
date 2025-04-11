<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AnakUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'orangtua_id' => ['required', 'integer', 'exists:orang_tuas,orangtua_id'],
            'nama' => ['nullable', 'string', 'max:255'],
            'nik' => ['nullable', 'string', 'min:16'],
            'no_jkn' => ['nullable', 'string', 'min:13'],
            'tempat_lahir' => ['nullable', 'string', 'max:255'],
            'tanggal_lahir' => ['nullable', 'date'],
            'golongan_darah' => ['nullable', 'string', 'max:3'],
            'berat_badan' => ['nullable', 'integer'],
            'tinggi_badan' => ['nullable', 'integer'],
            'jenis_kelamin' => ['nullable', 'string', 'max:1'],
            'sudah_lahir' => ['required', 'boolean'],
            'tanggal_terakhir_menstruasi' => ['nullable', 'date'],
        ];
    }
}
