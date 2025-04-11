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
            $table->string('nama')->default('Janin');
            $table->string('nik')->nullable();
            $table->string('no_jkn')->nullable();
            $table->string('tempat_lahir')->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->string('golongan_darah')->nullable();
            $table->integer('berat_badan')->nullable();
            $table->integer('tinggi_badan')->nullable();
            $table->string('jenis_kelamin')->nullable();
            $table->boolean('sudah_lahir');
            $table->date('tanggal_terakhir_menstruasi')->nullable();
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
