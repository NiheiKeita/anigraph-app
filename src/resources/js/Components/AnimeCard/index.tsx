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
        <div className="anime-card group relative max-w-md overflow-hidden rounded-2xl border border-purple-200/50 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/50 p-6 shadow-lg shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03] hover:border-purple-300/70 hover:shadow-2xl hover:shadow-purple-500/25">
            {/* 背景パーティクル効果 */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="absolute left-4 top-4 h-2 w-2 animate-ping rounded-full bg-purple-400/40"></div>
                <div className="absolute right-6 top-8 h-1 w-1 animate-ping rounded-full bg-pink-400/60" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-8 left-8 h-1.5 w-1.5 animate-ping rounded-full bg-indigo-400/50" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-4 right-4 h-1 w-1 animate-ping rounded-full bg-purple-500/40" style={{ animationDelay: '1.5s' }}></div>
            </div>

            {/* メインホバー効果 */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-pink-400/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            
            {/* シマー効果 */}
            <div className="duration-1200 absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform delay-200 group-hover:translate-x-full"></div>
            
            {/* 画像コンテナ */}
            <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-purple-500/20 md:h-44">
                {/* 画像ローディングスケルトン */}
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-purple-200/50 via-purple-100/30 to-purple-200/50"></div>
                
                <img
                    src={anime?.facebook_image_url == '' ? "/imgs/unnamed.jpg" : anime?.facebook_image_url ?? ''}
                    alt={anime?.title ?? ''}
                    className="relative z-10 max-h-full w-full rounded-xl object-contain transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    onError={(event) => {
                        const target = event.currentTarget
                        target.src = "/imgs/unnamed.jpg"
                    }}
                />
                
                {/* 画像オーバーレイグラデーション */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                
                {/* ホバー時のグロー効果 */}
                <div className="absolute -inset-2 -z-10 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"></div>
            </div>
            <h3 className="mt-4 line-clamp-2 text-sm font-bold text-gray-800">{anime?.title}</h3>
            <div className="mt-3 space-y-1">
                <p className="inline-block rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700">メディア: {anime?.media}</p>
                <p className="ml-1 inline-block rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700">シーズン: {anime?.season_name}</p>
                <p className="inline-block rounded-full bg-accent-100 px-2 py-1 text-xs font-medium text-accent-700">評価: {anime?.pivot?.evaluation ?? "-"}</p>
            </div>
            <div className="mt-4 flex gap-2 text-xs">
                {anime?.official_site_url &&
                    <a
                        href={anime.official_site_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md px-2 py-1 font-medium text-purple-600 transition-colors hover:bg-purple-50 hover:text-purple-800 hover:underline"
                    >
                        公式サイト
                    </a>
                }
                {anime?.wikipedia_url &&
                    <a
                        href={anime.wikipedia_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md px-2 py-1 font-medium text-purple-600 transition-colors hover:bg-purple-50 hover:text-purple-800 hover:underline"
                    >
                        Wikipedia
                    </a>
                }
            </div>
            {isLogin && (
                <div className="mt-4 flex gap-2 rounded-xl bg-purple-50 p-2">
                    {isLoading && <div className="font-medium text-purple-700">送信中....</div>}
                    {!isLoading && (
                        <>
                            <Button className="!px-2 !py-1" variant="red" onClick={onClickNotSeeButton}>見てない</Button>
                            <Button className="!px-2 !py-1" variant="blue" onClick={onClickSeeButton}>見た</Button>
                        </>
                    )}
                </div>
            )
            }
        </div >
    )
})
