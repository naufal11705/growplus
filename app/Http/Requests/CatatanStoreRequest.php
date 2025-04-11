<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CatatanStoreRequest extends FormRequest
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
            'fase_id' => ['required', 'integer', 'exists:fases,fase_id'],
            'catatan' => ['required', 'string'],
        ];
    }
}