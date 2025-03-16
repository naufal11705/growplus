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
        Schema::create('fases', function (Blueprint $table) {
            $table->id('fase_id')->primary();
            $table->string('title');
            $table->string('description');
            $table->string('benefits');
            $table->string('banner');
            $table->string('progress');
            $table->boolean('status')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fases');
    }
};
