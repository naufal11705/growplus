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
        Schema::create('anak_tantangans', callback: function (Blueprint $table) {
            $table->unsignedBigInteger('anak_id')->index();
            $table->unsignedBigInteger('tantangan_id')->index();
            $table->string('gambar_url')->nullable();
            $table->date('tanggal_selesai')->default(now());
            $table->boolean('sudah_klaim')->default(false); // available, completed, expired
            $table->timestamps();

            $table->foreign('anak_id')->references('anak_id')->on('anaks');
            $table->foreign('tantangan_id')->references('tantangan_id')->on('tantangans');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anak_tantangans');
    }
};
