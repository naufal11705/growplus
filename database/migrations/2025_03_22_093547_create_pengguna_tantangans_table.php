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
        Schema::create('pengguna_tantangans', function (Blueprint $table) {
            $table->unsignedBigInteger('pengguna_id')->index();
            $table->unsignedBigInteger('tantangan_id')->index();
            $table->timestamps();

            $table->foreign('pengguna_id')->references('pengguna_id')->on('penggunas');
            $table->foreign('tantangan_id')->references('tantangan_id')->on('tantangans');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengguna_tantangans');
    }
};
