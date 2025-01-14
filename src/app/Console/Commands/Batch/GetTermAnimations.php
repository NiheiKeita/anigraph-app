<?php

namespace App\Console\Commands\Batch;

use App\Models\Term;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class GetTermAnimations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:get-term-animations';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';


    private function getYear($year, $season)
    {
        if ($season === "winter") {
            return $year + 1;
        }
        return $year;
    }
    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        // 現在の年を取得
        $year = date("Y");
        // 現在の月を取得して、現在のseasonsを取得
        $month = date("m");
        $seasons = ["winter", "spring", "summer", "autumn", "winter", "spring", "summer", "autumn"];
        if ($month >= 1 && $month <= 3) {
            $season = $seasons[0];
        } elseif ($month >= 4 && $month <= 6) {
            $season = $seasons[1];
        } elseif ($month >= 7 && $month <= 9) {
            $season = $seasons[2];
        } elseif ($month >= 10 && $month <= 12) {
            $season = $seasons[3];
        }

        $yearSeasons = [
            [
                "year" => $year,
                "season" => $season,
            ],
            [
                "year" => $this->getYear($year, $seasons[array_search($season, $seasons) + 1]),
                "season" => $seasons[array_search($season, $seasons) + 1],
            ],
            [
                "year" => $this->getYear($year, $seasons[array_search($season, $seasons) + 2]),
                "season" => $seasons[array_search($season, $seasons) + 2],
            ],
            [
                "year" => $this->getYear($year, $seasons[array_search($season, $seasons) + 3]),
                "season" => $seasons[array_search($season, $seasons) + 3],
            ]
        ];

        foreach ($yearSeasons as $yearSeason) {
            $term = Term::firstOrCreate([
                "year" => $yearSeason["year"],
                "season" => $yearSeason["season"],
            ]);
            $termText = "$term->year-$term->season";
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
