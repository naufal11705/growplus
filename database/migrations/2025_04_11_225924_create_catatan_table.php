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
        Schema::create('catatan', function (Blueprint $table) {
            $table->unsignedBigInteger('anak_id')->index();
            $table->unsignedBigInteger('fase_id')->index();
            $table->string('catatan')->nullable();
            $table->date('tanggal')->default(now());
            $table->timestamps();
        });

        Schema::table('catatan', function (Blueprint $table) {
            $table->foreign('anak_id')->references('anak_id')->on('anaks');
            $table->foreign('fase_id')->references('fase_id')->on('fases');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan');
    }
};
