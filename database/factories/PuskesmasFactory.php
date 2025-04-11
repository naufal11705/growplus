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
        $faker = \Faker\Factory::create('id_ID');

        return [
            'nama' => $nama = $faker->city(),
            'alamat' => $faker->address(),
            'kecamatan' => $faker->randomElement(['Ledo', 'Bengkalis']),
            'kota' => $nama,
            'kontak' => $faker->phoneNumber(),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
