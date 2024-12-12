import { Anime } from "@/types/anime"
import React from "react"

type Props = {
    anime?: Anime
}
export const AnimeCard = React.memo<Props>(function AnimeCard({
    anime,
}) {

    return (
        <div className="max-w-md rounded-lg bg-white p-6 shadow-lg transition-transform duration-200 hover:scale-105">
            <div className=" w-full md:h-44">
                <img
                    src={anime?.facebook_image_url == '' ? "/imgs/unnamed.png" : anime?.facebook_image_url ?? ''}
                    alt={anime?.title ?? ''}
                    className="max-h-full w-full rounded-lg"
                />
            </div>
            <h3 className="mt-4 text-xl font-bold">{anime?.title}</h3>
            <p className="text-sm text-gray-500">{anime?.title_kana}</p>
            <p className="mt-2">メディア: {anime?.media}</p>
            <p className="mt-2">シーズン: {anime?.season_name}</p>
            <div className="mt-4 flex justify-between">
                {anime?.official_site_url &&
                    <a
                        href={anime.official_site_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:underline"
                    >
                        公式サイト
                    </a>
                }
                {anime?.wikipedia_url &&
                    <a
                        href={anime.wikipedia_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:underline"
                    >
                        Wikipedia
                    </a>
                }
            </div>
        </div>
    )
})
