<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Puskesmas>
 */
class PuskesmasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama' => $this->faker->city(),
            'alamat' => $this->faker->address(),
            'kecamatan' => $this->faker->state(),
            'kota' => $this->faker->city(),
            'kontak' => $this->faker->phoneNumber(),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
