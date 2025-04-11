<?php

namespace Database\Factories;

use App\Models\Fase;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tantangan>
 */
class TantanganFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fase_id' => Fase::query()->exists() ? Fase::inRandomOrder()->first()->fase_id : Fase::factory()->create()->fase_id,
            'activity' => $this->faker->title(),
            'point' => $this->faker->randomDigit(),
            'tingkat_ekonomi' => $this->faker->numberBetween(1, 3),
            'status' => $this->faker->randomElement([1, 0]),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
