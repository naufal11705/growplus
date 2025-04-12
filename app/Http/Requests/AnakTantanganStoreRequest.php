<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AnakTantanganStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'anak_id' => ['required', 'integer', 'exists:anaks,anak_id'],
            'tantangan_id' => ['required', 'integer', 'exists:tantangans,tantangan_id'],
            'gambar_url' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'tanggal_selesai' => ['required', 'date'],
            'sudah_klaim' => ['required', 'boolean'],
        ];
    }
}
