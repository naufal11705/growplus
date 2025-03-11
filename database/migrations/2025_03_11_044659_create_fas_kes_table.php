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
            $table->string('faskes_id')->primary();
            $table->string('orangtua_id');
            $table->string('puskesmas');
            $table->string('no_reg_kohort_ibu');
            $table->string('no_reg_kohort_anak');
            $table->timestamps();

            $table->foreign('orangtua_id')->references('orangtua_id')->on('orangtuas');
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
