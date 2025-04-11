<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AnakStoreRequest extends FormRequest
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
            'nama' => ['required', 'string', 'max:255'],
            'nik' => ['required', 'string', 'min:16'],
            'no_jkn' => ['required', 'string', 'min:13'],
            'tempat_lahir' => ['required', 'string', 'max:255'],
            'tanggal_lahir' => ['required', 'date'],
            'golongan_darah' => ['required', 'string', 'max:3'],
            'berat_badan' => ['required', 'integer'],
            'tinggi_badan' => ['required', 'integer'],
            'jenis_kelamin' => ['required', 'string', 'max:1'],
        ];
    }
}
