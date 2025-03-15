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
        Schema::create('anaks', function (Blueprint $table) {
            $table->id('anak_id')->primary();
            $table->unsignedBigInteger('orangtua_id')->index();
            $table->string('nama');
            $table->string('nik');
            $table->string('no_jkn');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('golongan_darah');
            $table->integer('berat_badan');
            $table->integer('tinggi_badan');
            $table->timestamps();

            $table->foreign('orangtua_id')->references('orangtua_id')->on('orang_tuas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anaks');
    }
};
