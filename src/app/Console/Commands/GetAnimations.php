<?php

namespace App\Console\Commands;

use App\Models\Term;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class GetAnimations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:get-animations';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $years = range(2025, 2025);
        $seasons = ["spring", "summer", "autumn", "winter"];
        // Artisan::call('app:get-this-term-animations "2024-summer"');
        // 年と季節の組み合わせでArtisanコマンドを呼び出す
        foreach ($years as $year) {
            foreach ($seasons as $season) {
                $term = Term::firstOrCreate([
                    "year" => $year,
                    "season" => $season,
                ]);
                $termText = "$year-$season";
                echo "Executing Artisan command for term: $termText\n";

                try {
                    Artisan::call("app:get-this-term-animations", ["term" => $termText, "termId" => $term->id]);
                    echo "Command executed successfully for $termText\n";
                } catch (Exception $e) {
                    echo "Error executing command for $termText: " . $e->getMessage() . "\n";
                }
            }
        }
    }
}
