<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrangTuaStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

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
            'pekerjaan' => ['required', 'string', 'max:255'],
            'penghasilan' => ['required', 'numeric'],
            'sumber_penghasilan' => ['required', 'string', 'max:255'],
            'jumlah_tanggungan' => ['required', 'integer'],
            'status_rumah' => ['required', 'string', 'max:255'],
            'tanggungan_listrik' => ['required', 'integer'],
            'tanggungan_air' => ['required', 'integer'],
        ];
    }
}
