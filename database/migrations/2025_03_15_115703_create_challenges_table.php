<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('challenges', function (Blueprint $table) {
            $table->id('challenge_id')->primary();
            $table->unsignedBigInteger('phase_id')->index();
            $table->string('activity');
            $table->integer('point');
            $table->boolean('status')->default(false);
            $table->timestamps();

            $table->foreign('phase_id')->references('phase_id')->on('phases');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('challenges');
    }
};
