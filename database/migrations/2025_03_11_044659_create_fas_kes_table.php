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
        Schema::create('fas_kes', function (Blueprint $table) {
            $table->id('faskes_id')->primary();
            $table->unsignedBigInteger('orangtua_id')->index();
            $table->unsignedBigInteger('puskesmas_id')->index();
            $table->string('no_reg_kohort_ibu');
            $table->string('no_reg_kohort_anak');
            $table->timestamps();

            $table->foreign('orangtua_id')->references('orangtua_id')->on('orang_tuas');
            $table->foreign('puskesmas_id')->references('puskesmas_id')->on('puskesmas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fas_kes');
    }
};
