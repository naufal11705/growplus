<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pengguna>
 */
class PenggunaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'role_id' => Role::inRandomOrder()->first()->role_id,
            'username' => $this->faker->username(),
            'password' => bcrypt($this->faker->password()),
            'nama' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'total_point' => $this->faker->numberBetween(200, 500),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
