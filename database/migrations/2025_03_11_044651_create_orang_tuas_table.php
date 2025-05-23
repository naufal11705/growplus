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
        Schema::create('orang_tuas', function (Blueprint $table) {
            $table->id('orangtua_id')->primary();
            $table->unsignedBigInteger('pengguna_id')->index();
            $table->string('nama');
            $table->string('nik');
            $table->string('no_jkn');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('golongan_darah');
            $table->string('jenis_kelamin');
            $table->text('alamat');
            $table->string('kecamatan');
            $table->string('kabupaten');
            $table->string('provinsi');
            $table->string('pekerjaan');
            $table->string('penghasilan');
            $table->string('sumber_penghasilan');
            $table->integer('jumlah_tanggungan');
            $table->string('status_rumah');
            $table->integer('tanggungan_listrik');
            $table->integer('tanggungan_air');
            $table->integer('tingkat_ekonomi');
            $table->timestamps();

            $table->foreign('pengguna_id')->references('pengguna_id')->on('penggunas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orang_tuas');
    }
};
