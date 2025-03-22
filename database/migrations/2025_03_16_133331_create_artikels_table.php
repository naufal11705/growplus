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
        Schema::create('artikels', function (Blueprint $table) {
            $table->id('artikel_id')->primary();
            // $table->unsignedBigInteger('fase_id')->index();
            $table->string('title');
            $table->string('author');
            $table->text('content');
            $table->string('slug')->unique();
            $table->timestamps();

            // $table->foreign('fase_id')->references('fase_id')->on('fases');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artikels');
    }
};
