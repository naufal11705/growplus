<?php

namespace Database\Factories;

use App\Models\Fase;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Artikel>
 */
class ArtikelFactory extends Factory
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
            'title' => $this->faker->bs(),
            'content' => $this->faker->paragraph(),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
