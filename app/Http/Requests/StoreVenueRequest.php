<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVenueRequest extends FormRequest
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

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The venue name is required.',
            'name.max' => 'The venue name may not be greater than 255 characters.',
            'city.required' => 'The city is required.',
            'city.max' => 'The city may not be greater than 255 characters.',
            'state.required' => 'The state is required.',
            'state.max' => 'The state may not be greater than 255 characters.',
            'capacity.required' => 'The capacity is required.',
            'capacity.integer' => 'The capacity must be an integer.',
            'capacity.min' => 'The capacity must be at least 1.',
            'accessibility.required' => 'Please select at least one accessibility option.',
            'accessibility.array' => 'The accessibility must be an array.',
            'layout.required' => 'Please select at least one layout option.',
            'layout.array' => 'The layout must be an array.',
            'avg_ratings.required' => 'The average rating is required.',
            'avg_ratings.numeric' => 'The average rating must be a number.',
            'avg_ratings.min' => 'The average rating must be at least 0.',
            'avg_ratings.max' => 'The average rating may not be greater than 5.',
            'latitude.required' => 'The latitude is required.',
            'latitude.numeric' => 'The latitude must be a number.',
            'longitude.required' => 'The longitude is required.',
            'longitude.numeric' => 'The longitude must be a number.',
        ];
    }
}
