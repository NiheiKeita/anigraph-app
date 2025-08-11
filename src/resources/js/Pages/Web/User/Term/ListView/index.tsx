
import { getSeasonText } from '@/hooks/anime'
import { useTerm } from '@/hooks/useTerm'
import { Term } from '@/types/term'
import { User } from '@/types/user'
import { router } from '@inertiajs/react'
import React from 'react'

type Props = {
    user?: User,
    terms: Term[]
}

export const ListView = React.memo<Props>(function ListView({
    user,
    terms
}) {
    const { groupedTerms } = useTerm()
    const grouped = groupedTerms(terms)

    const handleClick = (id: string) => {
        router.visit(route("web.user.term.show", { "user_id": user?.id, "term_id": id }), {
            data: {
                media: "tv",
            },
        })
    }

    return (
        <div className='scrollbar-thin min-h-screen bg-gradient-to-br from-purple-50 via-theme-backgroundColor to-indigo-50 p-6'>
            {/* ヘッダーセクション */}
            <div className="relative mb-12 overflow-hidden rounded-3xl border border-purple-200/50 bg-gradient-to-br from-white/80 via-purple-50/80 to-indigo-50/80 p-8 shadow-2xl shadow-purple-500/20 backdrop-blur-xl">
                {/* 装飾エフェクト */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-transparent to-pink-400/10"></div>
                <div className="absolute left-1/4 top-0 h-32 w-32 animate-float rounded-full bg-purple-300/20 blur-3xl"></div>
                <div className="animate-float-delay absolute bottom-0 right-1/4 h-24 w-24 rounded-full bg-indigo-300/20 blur-3xl"></div>
                
                <div className="relative z-10 text-center">
                    {/* ユーザーアイコン */}
                    <div className="mb-6 animate-bounce-subtle text-6xl">👤</div>
                    
                    {/* タイトル */}
                    <h1 className='text-shimmer mb-4 text-3xl font-bold md:text-4xl'>
                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">{user?.name}</span>が見たアニメ
                    </h1>
                    <div className="mx-auto mb-4 h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                    <p className="text-lg font-medium text-purple-600/80">シーズン一覧</p>
                </div>
            </div>

            {/* 年別リスト */}
            <div className="mx-auto max-w-6xl">
                {Object.keys(grouped)
                    .sort((a, b) => Number(b) - Number(a)).map((year, yearIndex) => (
                        <div key={year} className="mb-16 animate-fade-in" style={{ animationDelay: `${yearIndex * 100}ms` }}>
                            {/* 年のヘッダー */}
                            <div className="mb-8 flex items-center">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                                <div className="relative">
                                    <h2 className="mx-8 bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-2xl font-bold text-transparent">
                                        {year} 年
                                    </h2>
                                    <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 opacity-30 blur-sm"></div>
                                </div>
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                            </div>
                            
                            {/* シーズンカード */}
                            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
                                {grouped[year].map((term, termIndex) => (
                                    <button
                                        key={term.id}
                                        onClick={() => handleClick(term.id)}
                                        className="group relative animate-scale-in overflow-hidden rounded-2xl border border-purple-200/50 bg-gradient-to-br from-white via-purple-50 to-purple-100 p-6 shadow-lg shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30 focus:outline-none focus:ring-4 focus:ring-purple-300/50"
                                        style={{ 
                                            animationDelay: `${(yearIndex * 200) + (termIndex * 100)}ms`
                                        }}
                                    >
                                        {/* 背景グラデーション効果 */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-transparent to-pink-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                        
                                        {/* シマー効果 */}
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                                        
                                        {/* コンテンツ */}
                                        <div className="relative z-10 flex h-20 flex-col items-center justify-center">
                                            <div className="mb-2 text-3xl transition-transform duration-300 group-hover:scale-110">
                                                {term.season === "spring" && "🌸"}
                                                {term.season === "summer" && "☀️"}
                                                {term.season === "autumn" && "🍂"}
                                                {term.season === "winter" && "❄️"}
                                            </div>
                                            <span className="text-center text-sm font-bold text-purple-700 transition-colors duration-300 group-hover:text-purple-900">
                                                {getSeasonText(term.season)}
                                            </span>
                                        </div>
                                        
                                        {/* ホバー時のグロー効果 */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 transition-all duration-300 group-hover:from-purple-500/10 group-hover:to-pink-500/10"></div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>

            {/* 装飾要素 */}
            <div className="pointer-events-none fixed left-10 top-20 h-20 w-20 animate-float rounded-full bg-gradient-to-br from-purple-300/30 to-pink-300/30 opacity-60 blur-xl"></div>
            <div className="animate-float-delay pointer-events-none fixed right-20 top-40 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-300/30 to-purple-300/30 opacity-60 blur-xl"></div>
            <div className="pointer-events-none fixed bottom-20 left-1/4 h-16 w-16 animate-float rounded-full bg-gradient-to-br from-pink-300/30 to-purple-300/30 opacity-60 blur-xl"></div>
        </div>
    )

})
export default ListView
