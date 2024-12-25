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
        Schema::table('animations', function (Blueprint $table) {
            $table->integer('anict_id')->nullable();
            $table->string('mal_anime_id')->nullable();
            $table->string('syobocal_tid')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('animations', function (Blueprint $table) {
            $table->dropColumn('anict_id');
            $table->dropColumn('mal_anime_id');
            $table->dropColumn('syobocal_tid');
        });
    }
};
