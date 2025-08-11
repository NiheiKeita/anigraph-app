
import { AnimeCard } from '@/Components/AnimeCard'
import { getSeasonText } from '@/hooks/anime'
import { Anime } from '@/types/anime'
import { Term } from '@/types/term'
import React from 'react'

type Props = {
    term?: Term,
    animations: Anime[]
}

export const ShowView = React.memo<Props>(function ShowView({
    term,
    animations
}) {

    return (
        <div className="scrollbar-thin min-h-screen bg-gradient-to-br from-purple-50 via-theme-backgroundColor to-indigo-50">
            {/* ヘッダーセクション */}
            <div className="relative overflow-hidden">
                {/* 背景デコレーション */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-pink-600/10"></div>
                <div className="absolute left-1/4 top-0 h-72 w-72 animate-float rounded-full bg-purple-300/20 blur-3xl"></div>
                <div className="animate-float-delay absolute right-1/4 top-20 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl"></div>
                
                <div className="relative z-10 px-6 py-12 text-center">
                    <div className="animate-slide-down">
                        {/* シーズンアイコン */}
                        <div className="mb-6 animate-bounce-subtle text-8xl">
                            {term?.season === "spring" && "🌸"}
                            {term?.season === "summer" && "☀️"}
                            {term?.season === "autumn" && "🍂"}
                            {term?.season === "winter" && "❄️"}
                        </div>
                        
                        {/* タイトル */}
                        <h1 className="text-shimmer mb-4 text-4xl font-bold md:text-6xl">
                            {`${term?.year}年${getSeasonText(term?.season ?? "")}`}
                        </h1>
                        
                        {/* アンダーライン */}
                        <div className="mx-auto mb-4 h-1 w-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>
                        
                        {/* サブタイトル */}
                        <p className="text-xl font-medium text-purple-600/80">
                            シーズンアニメ一覧 ({animations?.length || 0}作品)
                        </p>
                    </div>
                </div>
            </div>

            {/* アニメカードセクション */}
            <div className="px-6 pb-12">
                <div className="mx-auto max-w-7xl">
                    {animations && animations.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {animations.map((animation, index) => (
                                <div 
                                    key={animation.id} 
                                    className="hover-lift animate-scale-in"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="anime-card group">
                                        <AnimeCard
                                            isLogin={false}
                                            anime={animation}
                                            isLoading={false}
                                        />
                                        
                                        {/* 追加のホバー効果 */}
                                        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-500/0 via-transparent to-purple-500/0 transition-all duration-300 group-hover:from-purple-500/5 group-hover:to-purple-500/5"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="mb-6 text-6xl opacity-50">😔</div>
                            <h3 className="mb-4 text-2xl font-bold text-gray-600">アニメが見つかりません</h3>
                            <p className="text-gray-500">このシーズンにはまだアニメが登録されていないようです。</p>
                        </div>
                    )}
                </div>
            </div>

            {/* フローティング装飾要素 */}
            <div className="fixed left-8 top-1/4 h-6 w-6 animate-float rounded-full bg-gradient-to-br from-purple-400/40 to-transparent opacity-60 blur-sm"></div>
            <div className="animate-float-delay fixed right-12 top-1/3 h-8 w-8 rounded-full bg-gradient-to-br from-pink-400/40 to-transparent opacity-60 blur-sm"></div>
            <div className="fixed bottom-1/4 left-1/4 h-4 w-4 animate-float rounded-full bg-gradient-to-br from-indigo-400/40 to-transparent opacity-60 blur-sm"></div>
            <div className="animate-float-delay fixed bottom-1/3 right-1/3 h-5 w-5 rounded-full bg-gradient-to-br from-purple-400/40 to-transparent opacity-60 blur-sm"></div>
        </div>
    )

})
export default ShowView
