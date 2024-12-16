export type Anime = {
    id: number,
    title: string,
    title_kana: string,
    title_en: string,
    media: string,
    official_site_url: string,
    wikipedia_url: string,
    facebook_image_url: string,
    season_name: string,
    pivot?: {
        evaluation?: string,
        viewing_status?: string,
    }
}
