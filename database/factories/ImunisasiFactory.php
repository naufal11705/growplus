<?php

namespace Database\Factories;

use App\Models\Puskesmas;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Imunisasi>
 */
class ImunisasiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'puskesmas_id' => Puskesmas::query()->exists() ? Puskesmas::inRandomOrder()->first()->puskesmas_id : Puskesmas::factory()->create()->puskesmas_id,
            'nama' => $this->faker->name(),
            'jenis' => $this->faker->randomElement(['Polio', 'BCG', 'Hepatitis B']),
            'usia_minimum' => $this->faker->randomNumber(2),
            'usia_maksimum' => $this->faker->randomNumber(2),
            'tanggal' => $this->faker->date(),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
