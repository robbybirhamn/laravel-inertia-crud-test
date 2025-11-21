<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'venue_id' => 'required|exists:venues,id',
            'start_datetime' => 'required|date',
            'end_datetime' => 'required|date|after:start_datetime',
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
            'title.required' => 'The event title is required.',
            'title.max' => 'The event title may not be greater than 255 characters.',
            'venue_id.required' => 'Please select a venue.',
            'venue_id.exists' => 'The selected venue is invalid.',
            'start_datetime.required' => 'The start date and time is required.',
            'start_datetime.date' => 'The start date and time must be a valid date.',
            'end_datetime.required' => 'The end date and time is required.',
            'end_datetime.date' => 'The end date and time must be a valid date.',
            'end_datetime.after' => 'The end date and time must be after the start date and time.',
        ];
    }
}
