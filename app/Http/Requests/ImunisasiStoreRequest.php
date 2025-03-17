<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImunisasiStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'puskesmas_id' => ['required', 'integer', 'exists:puskesmas,puskesmas_id'],
            'nama' => ['required', 'string', 'max:255'],
            'jenis' => ['required', 'string', 'max:255'],
            'usia_minimum' => ['required', 'integer', 'min:0'],
            'usia_maksimum' => ['required', 'integer', 'min:0', 'gte:usia_minimum'],
            'tanggal' => ['required', 'date'],
        ];
    }
}
