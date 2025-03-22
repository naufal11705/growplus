<?php

namespace Database\Factories;

use App\Models\Pengguna;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrangTua>
 */
class OrangTuaFactory extends Factory
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
            'pengguna_id' => Pengguna::query()->exists() ? Pengguna::inRandomOrder()->first()->pengguna_id : Pengguna::factory()->create()->pengguna_id,
            'nama' => $faker->name(),
            'nik' => $this->faker->unique()->numerify('################'), // 16 digits
            'no_jkn' => $this->faker->unique()->numerify('#############'), // 13 digits
            'tempat_lahir' => $faker->city(),
            'tanggal_lahir' => $faker->dateTimeBetween('-20 years', 'now')->format('Y-m-d'),
            'golongan_darah' => $this->faker->randomElement(['A', 'B', 'O', 'AB']),
            'alamat' => $faker->address(),
            'pekerjaan' => $faker->jobTitle(),
            'penghasilan' => $this->faker->randomElement([3000000, 2000000, 5000000, 10000000]),
            'sumber_penghasilan' => $this->faker->randomElement(['Usaha', 'Gaji']),
            'jumlah_tanggungan' => $this->faker->randomDigit(),
            'status_rumah' => $this->faker->randomElement(['Milik Sendiri', 'Sewa', 'Kontrak', 'Dinas']),
            'tanggungan_listrik' => $this->faker->randomElement([300000, 200000, 500000, 1000000]),
            'tanggungan_air' => $this->faker->randomElement([300000, 200000, 500000, 1000000]),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
