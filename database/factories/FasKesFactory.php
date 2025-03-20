<?php

namespace Database\Factories;

use App\Models\OrangTua;
use App\Models\Puskesmas;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FasKes>
 */
class FasKesFactory extends Factory
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
            'puskesmas_id' => Puskesmas::query()->exists() ? Puskesmas::inRandomOrder()->first()->puskesmas_id : Puskesmas::factory()->create()->puskesmas_id,
            'no_reg_kohort_ibu' => sprintf(
                '%02d-%s-%04d',
                $this->faker->numberBetween(1, 99),
                now(),
                $this->faker->numberBetween(1, 9999)
            ),
            'no_reg_kohort_anak' => sprintf(
                '%02d-%s-%04d',
                $this->faker->numberBetween(1, 99),
                now(),
                $this->faker->numberBetween(1, 9999)
            ),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
