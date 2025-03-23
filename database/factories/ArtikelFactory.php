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
        $faker = \Faker\Factory::create('id_ID');

        return [
            // 'fase_id' => Fase::query()->exists() ? Fase::inRandomOrder()->first()->fase_id : Fase::factory()->create()->fase_id,
            'title' => $title = $faker->sentence(),
            'author' => $faker->name(),
            'content' => $faker->paragraph(),
            'slug' => Str::slug($title),
            'banner' => asset('images/Sample.png'),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
