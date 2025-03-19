<?php

namespace Database\Factories;

use App\Models\OrangTua;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Anak>
 */
class AnakFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'orangtua_id' => OrangTua::query()->exists() ? OrangTua::inRandomOrder()->first()->orangtua_id : OrangTua::factory()->create()->orangtua_id,
            'nama' => $this->faker->name(),
            'nik' => $this->faker->unique()->numerify('################'), // 16 digits
            'no_jkn' => $this->faker->unique()->numerify('#############'), // 13 digits
            'tempat_lahir' => $this->faker->city(),
            'tanggal_lahir' => $this->faker->date(),
            'golongan_darah' => $this->faker->randomElement(['A', 'B', 'O', 'AB']),
            'berat_badan' => $this->faker->numberBetween(40, 80),
            'tinggi_badan' => $this->faker->numberBetween(120, 180),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
