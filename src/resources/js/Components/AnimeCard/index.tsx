import { Anime } from "@/types/anime"
import React from "react"
import Button from "../Button"

type Props = {
    anime?: Anime
    isLogin?: boolean
    onClickSeeButton?: () => void
    onClickNotSeeButton?: () => void
    isLoading: boolean
}
export const AnimeCard = React.memo<Props>(function AnimeCard({
    anime,
    isLogin = false,
    onClickSeeButton,
    onClickNotSeeButton,
    isLoading = false
}) {

    return (
        <div className="max-w-md rounded-lg bg-white p-6 shadow-lg transition-transform duration-200 hover:scale-105">
            <div className="w-full rounded-lg bg-gray-100 md:h-44">
                <img
                    src={anime?.facebook_image_url == '' ? "/imgs/unnamed.jpg" : anime?.facebook_image_url ?? ''}
                    alt={anime?.title ?? ''}
                    className="max-h-full w-full rounded-lg object-contain"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/imgs/unnamed.jpg" // フォールバック画像
                    }}
                />
            </div>
            <h3 className="mt-4 text-sm font-bold">{anime?.title}</h3>
            {/* <p className="text-xs text-gray-500">{anime?.title_kana}</p> */}
            <p className="mt-2 text-xs">メディア: {anime?.media}</p>
            <p className="mt-2 text-xs">シーズン: {anime?.season_name}</p>
            <div className="mt-4 flex justify-between text-xs">
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
            {isLogin && (
                <>
                    {isLoading && <>isLoading....</>}
                    {!isLoading && (
                        <>
                            <Button variant="red" onClick={onClickNotSeeButton}>見てない</Button>
                            <Button variant="blue" onClick={onClickSeeButton}>見た</Button>
                        </>
                    )}
                </>
            )
            }
        </div >
    )
})
