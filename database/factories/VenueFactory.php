<?php

namespace Database\Factories;

use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Venue>
 */
class VenueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'city' => fake()->city(),
            'state' => fake()->state(),
            'capacity' => fake()->numberBetween(10, 1000),
            'accessibility' => fake()->randomElement(Venue::ACCESSIBILITY_OPTIONS),
            'tags' => fake()->randomElement(['conference', 'workshop', 'training', 'networking', 'social']),
            'layout' => fake()->randomElement(Venue::LAYOUT_OPTIONS),
            'avg_ratings' => fake()->numberBetween(1, 5),
            'latitude' => fake()->latitude(),
            'longitude' => fake()->longitude(),
        ];
    }
}
