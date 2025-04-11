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
        Schema::create('tantangans', function (Blueprint $table) {
            $table->id('tantangan_id')->primary();
            $table->unsignedBigInteger('fase_id')->index();
            $table->string('activity');
            $table->integer('point');
            $table->integer('tingkat_ekonomi');
            $table->boolean('status')->default(false);
            $table->boolean('butuh_gambar')->default(false);
            $table->timestamps();

            $table->foreign('fase_id')->references('fase_id')->on('fases');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tantangans');
    }
};
