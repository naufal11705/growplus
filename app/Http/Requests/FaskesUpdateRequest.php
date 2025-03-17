<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FaskesUpdateRequest extends FormRequest
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
            'puskesmas_id' => ['required', 'integer', 'exists:puskesmas,puskesmas_id'],
            'no_reg_kohort_ibu' => ['required', 'string', 'max:255'],
            'no_reg_kohort_anak' => ['required', 'string', 'max:255'],
        ];
    }
}
