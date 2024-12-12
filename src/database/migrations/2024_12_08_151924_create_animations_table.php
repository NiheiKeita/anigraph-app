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
        Schema::create('animations', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();

            $table->bigInteger('term_id')->nullable();

            $table->text('title')->nullable();
            $table->text('title_kana')->nullable();
            $table->text('title_en')->nullable();
            $table->text('media')->nullable();
            $table->text('official_site_url')->nullable();
            $table->text('wikipedia_url')->nullable();
            $table->text('facebook_image_url')->nullable();
            $table->integer('episodes_count')->nullable();
            $table->text('season_name')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animations');
    }
};
