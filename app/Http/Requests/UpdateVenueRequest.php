<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVenueRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'accessibility' => 'required|array',
            'tags' => 'required|string',
            'layout' => 'required|array',
            'avg_ratings' => 'required|numeric|min:0|max:5',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ];
    }
}
