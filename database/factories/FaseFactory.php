<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fase>
 */
class FaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'judul' => $this->faker->bs(),
            'deskripsi' => $this->faker->paragraph(),
            'benefits' => $this->faker->paragraph(),
            'banner' => asset('images/Sample.png'),
            'progress' => $this->faker->randomElement([20, 40, 60, 80, 100]),
            'is_anak_required' => $this->faker->randomElement([1, 0]),
            'durasi' => $this->faker->randomElement([5, 10, 15, 20, 25, 30]),
            'status' => $this->faker->randomElement([1, 0]),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
