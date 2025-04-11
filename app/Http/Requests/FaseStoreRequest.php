<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FaseStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'judul' => ['required', 'string', 'max:255'],
            'deskripsi' => ['required', 'string'],
            'benefits' => ['required', 'string'],
            'banner' => ['required', 'file', 'mimes:jpg,jpeg,png', 'max:2048'],
            'progress' => ['required', 'string'],
            'durasi' => ['required', 'integer'],
            'is_anak_required' => ['required', 'boolean'],
            'status' => ['required', 'boolean'],
        ];
    }
}
