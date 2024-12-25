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
        Schema::table('episodes', function (Blueprint $table) {
            $table->integer('anict_id')->nullable();
            $table->integer('sort_number')->nullable();
            $table->text('number_text')->nullable();
            $table->text('title')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('episodes', function (Blueprint $table) {
            $table->dropColumn('anict_id');
            $table->dropColumn('sort_number');
            $table->dropColumn('number_text');
            $table->dropColumn('title');
        });
    }
};
