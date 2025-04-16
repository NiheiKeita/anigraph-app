<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShowTermRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'media' => ['nullable', 'string'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    public function term(): \App\Models\Term
    {
        return \App\Models\Term::findOrFail($this->route('term_id'));
    }
}
