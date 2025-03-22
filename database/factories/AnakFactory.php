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
        $faker = \Faker\Factory::create('id_ID');

        return [
            'orangtua_id' => OrangTua::query()->exists() ? OrangTua::inRandomOrder()->first()->orangtua_id : OrangTua::factory()->create()->orangtua_id,
            'nama' => $faker->name(),
            'nik' => $this->faker->unique()->numerify('################'), // 16 digits
            'no_jkn' => $this->faker->unique()->numerify('#############'), // 13 digits
            'tempat_lahir' => $faker->city(),
            'tanggal_lahir' => $faker->dateTimeBetween('-6 years', 'now')->format('Y-m-d'),
            'golongan_darah' => $this->faker->randomElement(['A', 'B', 'O', 'AB']),
            'berat_badan' => $this->faker->numberBetween(40, 80),
            'tinggi_badan' => $this->faker->numberBetween(120, 180),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
