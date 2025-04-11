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
            'pengguna_id' => 2,
            'nama' => $faker->name(),
            'nik' => $this->faker->unique()->numerify('################'), // 16 digits
            'no_jkn' => $this->faker->unique()->numerify('#############'), // 13 digits
            'tempat_lahir' => $faker->city(),
            'tanggal_lahir' => $faker->dateTimeBetween('-20 years', 'now')->format('Y-m-d'),
            'golongan_darah' => $this->faker->randomElement(['A', 'B', 'O', 'AB']),
            'jenis_kelamin' => $this->faker->randomElement(['L', 'P']),
            'alamat' => $faker->address(),
            'kecamatan' => $faker->city(),
            'kabupaten' => $faker->city(),
            'provinsi' => $faker->state(),
            'pekerjaan' => $faker->jobTitle(),
            'penghasilan' => $this->faker->randomElement(['500.000 - 1.000.000', '1.000.0000 - 2.000.001', '2.000.001 - 3.000.000', '3.000.001 - 4.000.000', '4.000.001 - 5.000.000']),
            'sumber_penghasilan' => $this->faker->randomElement(['Gaji', 'Freelance', 'Usaha', 'Pensiun']),
            'jumlah_tanggungan' => $this->faker->randomDigit(),
            'status_rumah' => $this->faker->randomElement(['Milik Sendiri (tanpa cicilan)', 'Milik Sendiri (cicilan)', 'Kontrak']),
            'tanggungan_listrik' => $this->faker->randomElement([300000, 200000, 500000, 1000000]),
            'tanggungan_air' => $this->faker->randomElement([300000, 200000, 500000, 1000000]),
            'tingkat_ekonomi' => $this->faker->numberBetween(1, 3),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
