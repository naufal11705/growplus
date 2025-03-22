<?php

namespace Database\Factories;

use App\Models\Fase;
use Illuminate\Support\Str;
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
            // 'fase_id' => Fase::query()->exists() ? Fase::inRandomOrder()->first()->fase_id : Fase::factory()->create()->fase_id,
            'title' => $title = $this->faker->bs(),
            'author' => $this->faker->name(),
            'content' => $this->faker->paragraph(),
            'slug' => Str::slug($title),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
