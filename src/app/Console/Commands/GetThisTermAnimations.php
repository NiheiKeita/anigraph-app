<?php

namespace App\Console\Commands;

use App\Models\Animation;
use Illuminate\Console\Command;

class GetThisTermAnimations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:get-this-term-animations { term } { termId }';

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
        $terms = $this->argument('term');
        $termId = $this->argument('termId');
        $url = "https://api.annict.com/v1/works?filter_season=$terms&page=$page";
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

        // TODO
        $responseArray = json_decode((string) $response);
        foreach ($responseArray->works as $animation) {
            $image = "";
            $recommendedImage = $animation->images->recommended_url;
            $facebookImage = $animation->images->facebook->og_image_url;
            $twitterImage = $animation->images->twitter->normal_avatar_url;
            if ($twitterImage) {
                $image = $twitterImage;
            }
            if ($recommendedImage) {
                $image = $recommendedImage;
            }
            if ($facebookImage) {
                $image = $facebookImage;
            }

            Animation::firstOrCreate([
                "term_id" => $termId,
                "title" => $animation->title,
                "title_kana" => $animation->title_kana,
                "title_en" => $animation->title_en,
                "media" => $animation->media,
                "official_site_url" => $animation->official_site_url,
                "wikipedia_url" => $animation->wikipedia_url,
                "facebook_image_url" => $image,
                "episodes_count" => $animation->episodes_count,
                "season_name" => $animation->season_name,
            ]);
        }

        // $this->info(Animation::get()->count());

        if ($responseArray->next_page) {
            $this->handle($responseArray->next_page);
        }
    }
}
