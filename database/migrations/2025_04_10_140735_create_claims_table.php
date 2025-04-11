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
        Schema::create('claims', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pengguna_id')->index();
            $table->unsignedBigInteger('voucher_id')->index();
            $table->date('claim_date');
            $table->string('status')->default('available'); // pending, approved, rejected
            $table->timestamps();

            $table->foreign('pengguna_id')->references('pengguna_id')->on('penggunas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('claims');
    }
};
