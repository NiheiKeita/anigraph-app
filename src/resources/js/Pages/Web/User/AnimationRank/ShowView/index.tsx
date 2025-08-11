
import { AnimeCard } from '@/Components/AnimeCard'
import { AnimeEditCard } from '@/Components/AnimeEditCard'
import { evaluations } from '@/config/evaluation'
import { getSeasonText } from '@/hooks/anime'
import { Anime } from '@/types/anime'
import { Term } from '@/types/term'
import { User } from '@/types/user'
import React, { useCallback, useState } from 'react'

type Props = {
    user?: User,
    animations: Anime[]
}

export const ShowView = React.memo<Props>(function ShowView({
    user,
    animations
}) {

    const getEvaluationIcon = (evaluation: string) => {
        const icons: Record<string, string> = {
            "SSS": "👑",
            "SS": "💎", 
            "S": "⭐",
            "A": "🏆",
            "B": "🥇",
            "C": "🥈",
            "D": "🥉",
            "E": "📚"
        }
        return icons[evaluation] || "❓"
    }

    const getEvaluationGradient = (evaluation: string) => {
        const gradients: Record<string, string> = {
            "SSS": "from-yellow-400 via-amber-500 to-orange-600",
            "SS": "from-purple-500 via-indigo-500 to-purple-700", 
            "S": "from-pink-500 via-rose-500 to-red-600",
            "A": "from-green-400 via-emerald-500 to-green-600",
            "B": "from-blue-400 via-blue-500 to-blue-600",
            "C": "from-gray-400 via-gray-500 to-gray-600",
            "D": "from-slate-400 via-slate-500 to-slate-600",
            "E": "from-stone-400 via-stone-500 to-stone-600"
        }
        return gradients[evaluation] || "from-purple-400 to-purple-600"
    }

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
                        {/* メインアイコン */}
                        <div className="mb-6 animate-bounce-subtle text-7xl">🎖️</div>
                        
                        {/* タイトル */}
                        <h1 className="text-shimmer mb-4 text-4xl font-bold md:text-5xl">
                            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">{user?.name}</span>の
                        </h1>
                        <h2 className="text-shimmer mb-4 text-3xl font-bold md:text-4xl">
                            アニメランキング
                        </h2>
                        
                        {/* アンダーライン */}
                        <div className="mx-auto mb-4 h-1 w-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>
                        
                        {/* サブタイトル */}
                        <p className="text-xl font-medium text-purple-600/80">
                            評価順 • {animations?.length || 0}作品
                        </p>
                    </div>
                </div>
            </div>

            {/* ランキングセクション */}
            <div className="px-6 pb-12">
                <div className="mx-auto max-w-7xl">
                    {evaluations.map((evaluation, evalIndex) => {
                        const filteredAnimations = animations?.filter(data => data.pivot?.evaluation === evaluation) || []
                        
                        return (
                            <div key={evaluation} className="mb-16 animate-fade-in" style={{ animationDelay: `${evalIndex * 150}ms` }}>
                                {/* 評価ヘッダー */}
                                <div className="mb-8 text-center">
                                    <div className="group relative mx-auto inline-block">
                                        <div className={`rounded-2xl border-2 border-white/50 bg-gradient-to-r ${getEvaluationGradient(evaluation)} hover:shadow-3xl p-6 shadow-2xl shadow-purple-500/20 transition-all duration-300 hover:scale-110 hover:shadow-purple-500/30`}>
                                            <div className="flex items-center gap-4">
                                                <span className="text-4xl">{getEvaluationIcon(evaluation)}</span>
                                                <div className="text-left">
                                                    <h3 className="text-2xl font-bold text-white md:text-3xl">{evaluation} ランク</h3>
                                                    <p className="text-sm font-medium text-white/80">
                                                        {filteredAnimations.length}作品
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* グロー効果 */}
                                        <div className={`absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-r ${getEvaluationGradient(evaluation)} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50`}></div>
                                    </div>
                                </div>
                                
                                {/* アニメカードグリッド */}
                                {filteredAnimations.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {filteredAnimations.map((animation, index) => (
                                            <div 
                                                key={animation.id} 
                                                className="hover-lift animate-scale-in"
                                                style={{ animationDelay: `${(evalIndex * 300) + (index * 100)}ms` }}
                                            >
                                                <div className="anime-card group relative">
                                                    <AnimeCard
                                                        anime={animation}
                                                        isLoading={false}
                                                    />
                                                    {/* ランク表示 */}
                                                    <div className="absolute right-2 top-2">
                                                        <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-r ${getEvaluationGradient(evaluation)} text-xs font-bold text-white shadow-lg`}>
                                                            {evaluation}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <div className="mb-4 text-4xl opacity-50">😴</div>
                                        <p className="text-gray-500">このランクにはまだ作品がありません</p>
                                    </div>
                                )}
                            </div>
                        )
                    })}

                    {/* 未評価セクション */}
                    {(() => {
                        const unratedAnimations = animations?.filter(data => !data.pivot?.evaluation) || []
                        
                        return (
                            <div className="mb-16 animate-fade-in" style={{ animationDelay: `${evaluations.length * 150}ms` }}>
                                {/* 未評価ヘッダー */}
                                <div className="mb-8 text-center">
                                    <div className="group relative mx-auto inline-block">
                                        <div className="hover:shadow-3xl rounded-2xl border-2 border-white/50 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 p-6 shadow-2xl shadow-purple-500/20 transition-all duration-300 hover:scale-110 hover:shadow-purple-500/30">
                                            <div className="flex items-center gap-4">
                                                <span className="text-4xl">❓</span>
                                                <div className="text-left">
                                                    <h3 className="text-2xl font-bold text-white md:text-3xl">未評価</h3>
                                                    <p className="text-sm font-medium text-white/80">
                                                        {unratedAnimations.length}作品
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* グロー効果 */}
                                        <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-600 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50"></div>
                                    </div>
                                </div>
                                
                                {/* 未評価アニメカードグリッド */}
                                {unratedAnimations.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {unratedAnimations.map((animation, index) => (
                                            <div 
                                                key={animation.id} 
                                                className="hover-lift animate-scale-in"
                                                style={{ animationDelay: `${(evaluations.length * 300) + (index * 100)}ms` }}
                                            >
                                                <div className="anime-card group relative">
                                                    <AnimeCard
                                                        anime={animation}
                                                        isLoading={false}
                                                    />
                                                    {/* 未評価マーク */}
                                                    <div className="absolute right-2 top-2">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-r from-gray-400 to-gray-600 text-xs font-bold text-white shadow-lg">
                                                            ?
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <div className="mb-4 text-4xl opacity-50">✨</div>
                                        <p className="text-gray-500">すべて評価済みです！</p>
                                    </div>
                                )}
                            </div>
                        )
                    })()}
                </div>
            </div>

            {/* フローティング装飾要素 */}
            <div className="pointer-events-none fixed left-8 top-1/4 h-6 w-6 animate-float rounded-full bg-gradient-to-br from-purple-400/40 to-transparent opacity-60 blur-sm"></div>
            <div className="animate-float-delay pointer-events-none fixed right-12 top-1/3 h-8 w-8 rounded-full bg-gradient-to-br from-pink-400/40 to-transparent opacity-60 blur-sm"></div>
            <div className="pointer-events-none fixed bottom-1/4 left-1/4 h-4 w-4 animate-float rounded-full bg-gradient-to-br from-indigo-400/40 to-transparent opacity-60 blur-sm"></div>
            <div className="animate-float-delay pointer-events-none fixed bottom-1/3 right-1/3 h-5 w-5 rounded-full bg-gradient-to-br from-purple-400/40 to-transparent opacity-60 blur-sm"></div>
        </div>
    )

})
export default ShowView
