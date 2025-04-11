<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->string('voucher_id')->primary();
            $table->string('title');
            $table->text('description');
            $table->integer('points_cost');
            $table->string('validity');
            $table->date('expiry_date');
            $table->json('terms');
            $table->string('code')->unique();
            $table->string('provider');
            $table->string('logo_url', 500);
            $table->string('provider_url');
            $table->date('redeem_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
