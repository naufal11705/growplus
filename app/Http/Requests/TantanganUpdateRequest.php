<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TantanganUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fase_id' => ['required', 'integer', 'exists:fases,fase_id'],
            'activity' => ['required', 'string', 'max:255'],
            'point' => ['required', 'integer', 'min:0'],
            'tingkat_ekonomi' => ['required', 'integer'],
            'status' => ['required', 'boolean'],
        ];
    }
}
