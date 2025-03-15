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
        Schema::create('imunisasis', function (Blueprint $table) {
            $table->id('vaksin_id')->primary();
            $table->unsignedBigInteger('puskesmas_id')->index();
            $table->string('nama');
            $table->string('jenis');
            $table->integer('usia_minimum');
            $table->integer('usia_maksimum');
            $table->date('tanggal');
            $table->timestamps();

            $table->foreign('puskesmas_id')->references('puskesmas_id')->on('puskesmas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imunisasis');
    }
};
