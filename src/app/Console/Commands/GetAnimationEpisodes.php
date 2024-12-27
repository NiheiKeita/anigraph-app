<?php

namespace App\Console\Commands;

use App\Models\Animation;
use Illuminate\Console\Command;

class GetAnimationEpisodes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:get-animation-episodes { animationId }';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(int $page = 1): void
    {
        $animationId = $this->argument('animationId');

        $animation = Animation::where('id', $animationId)->first();
        $url = "https://api.annict.com/v1/episodes?filter_work_id=$animation->anict_id&page=$page";
        $ch = curl_init();
        $apiKey = config('app.annict_api_key');
        $headers = [
            'Authorization: Bearer ' . $apiKey,
            'Accept: application/json',
        ];
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FAILONERROR, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec($ch);
        $error = curl_error($ch);
        if ($error) {
            $this->info("error $error");
            return;
        }
        curl_close($ch);

        $responseArray = json_decode((string) $response);
        foreach ($responseArray->episodes as $episode) {
            $animation->episodes()->updateOrCreate([
                "sort_number" => $episode->sort_number,
                "number_text" => $episode->number_text,
            ], [
                "sort_number" => $episode->sort_number,
                "number_text" => $episode->number_text,
                "title" => $episode->title,
                "anict_id" => $episode->id,
            ]);
        }

        // NOTE: ページネーションで二十五個以上のエピソードがある場合、次のページを取得する
        if ($responseArray->next_page) {
            $this->handle($responseArray->next_page);
        }
    }
}
