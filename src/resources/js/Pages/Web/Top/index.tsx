
import Button from '@/Components/Button'
import { router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

export const Top = React.memo(function Top() {

    const [showHeader, setShowHeader] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setMenuOpen(false)
                setShowHeader(false)
            } else {
                setShowHeader(true)
            }
            setLastScrollY(currentScrollY)
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [lastScrollY])

    return (
        <div className="scrollbar-thin relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-theme-backgroundColor to-indigo-50 font-sans">
            {/* 背景装飾エフェクト */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -right-40 -top-40 h-80 w-80 animate-float rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl"></div>
                <div className="animate-float-delay absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 blur-3xl"></div>
                <div className="absolute left-1/3 top-1/4 h-32 w-32 animate-float rounded-full bg-gradient-to-br from-pink-300/30 to-purple-300/30 blur-2xl"></div>
                <div className="animate-float-delay absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-gradient-to-br from-purple-300/20 to-indigo-300/20 blur-3xl"></div>
            </div>

            {/* Header Section */}
            <header
                className={`sticky top-0 z-50 border-b border-purple-600/20 bg-gradient-to-r from-purple-900/90 via-purple-800/90 to-purple-700/90 shadow-lg shadow-purple-500/20 backdrop-blur-xl transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <div className="container mx-auto flex items-center justify-between px-4 py-4">
                    <div className="group relative">
                        <h1 className="animate-shimmer bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-3xl font-bold text-transparent transition-all duration-300 hover:scale-105">
                            あにぐらふ
                        </h1>
                        {/* ロゴの装飾 */}
                        <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 opacity-0 blur-md transition-all duration-300 group-hover:from-purple-500/20 group-hover:to-pink-500/20 group-hover:opacity-100"></div>
                    </div>
                    <nav className="hidden space-x-6 md:flex">
                        <button className="group relative overflow-hidden rounded-lg px-4 py-2 font-medium text-purple-100 transition-all duration-300 hover:scale-105 hover:text-white" onClick={() => router.visit(route('web.term.list'))}>
                            <span className="relative z-10">アニメシーズン一覧</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-purple-500/0 transition-all duration-300 group-hover:from-purple-600/50 group-hover:to-purple-500/50"></div>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                        </button>
                        <button className="group relative overflow-hidden rounded-lg px-4 py-2 font-medium text-purple-100 transition-all duration-300 hover:scale-105 hover:text-white" onClick={() => router.visit(route('web.user.list'))}>
                            <span className="relative z-10">ユーザ一覧</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-purple-500/0 transition-all duration-300 group-hover:from-purple-600/50 group-hover:to-purple-500/50"></div>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                        </button>
                    </nav>
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="rounded-lg p-2 text-white transition-colors hover:bg-purple-700/50 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                {menuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                )}
                            </svg>
                        </button>
                        {menuOpen && (
                            <div className="absolute right-4 top-16 w-48 rounded-lg bg-gradient-to-b from-purple-800 to-purple-900 py-2 shadow-lg shadow-purple-500/20 backdrop-blur-lg">
                                <button
                                    className="block w-full rounded-lg px-4 py-2 text-left font-medium text-purple-100 transition-all hover:bg-purple-700/50 hover:text-white"
                                    onClick={() => router.visit(route('web.term.list'))}
                                >
                                    アニメシーズン一覧
                                </button>
                                <button
                                    className="block w-full rounded-lg px-4 py-2 text-left font-medium text-purple-100 transition-all hover:bg-purple-700/50 hover:text-white"
                                    onClick={() => router.visit(route('web.user.list'))}
                                >
                                    ユーザ一覧
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative px-4 py-20 text-center">
                <div className="relative z-10 mx-auto max-w-4xl">
                    {/* メインタイトル */}
                    <div className="mb-8 animate-slide-down">
                        <h2 className="text-shimmer mb-6 text-5xl font-extrabold leading-tight md:text-6xl">
                            あなたの<span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">アニメランキング</span><br />
                            を作成しよう！
                        </h2>
                        <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>
                    </div>

                    {/* ヒーローカード */}
                    <div className="hover:shadow-3xl group relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-purple-200/50 bg-gradient-to-br from-white/80 via-purple-50/80 to-indigo-50/80 p-8 shadow-2xl shadow-purple-500/20 backdrop-blur-xl transition-all duration-700 hover:-translate-y-2 hover:shadow-purple-500/30 md:p-12">
                        {/* カードの装飾エフェクト */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-pink-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                        
                        {/* コンテンツ */}
                        <div className="relative z-10">
                            <p className="mb-8 text-xl leading-relaxed text-gray-700 md:text-2xl">
                                <span className="font-semibold text-purple-700">Anigraph</span>は、アニメのランキングを作成し、<br />
                                シーズンごとのアニメをチェックして、<br />
                                自分のランキングの変化を<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-transparent">グラフで楽しめる</span><br />
                                プラットフォームです。
                            </p>

                            {/* CTA ボタン */}
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <button
                                    className="neo-button group relative overflow-hidden rounded-xl border border-purple-300/50 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 px-8 py-4 font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40 focus:outline-none focus:ring-4 focus:ring-purple-300/50"
                                    onClick={() => router.visit(route('web.term.list'))}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        🎬 アニメシーズン一覧を見る
                                    </span>
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                                </button>
                            </div>
                        </div>
                        
                        {/* カードのグロー効果 */}
                        <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
                    </div>
                </div>

                {/* フローティング装飾要素 */}
                <div className="absolute left-10 top-20 h-16 w-16 animate-float rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-xl"></div>
                <div className="animate-float-delay absolute right-16 top-32 h-12 w-12 rounded-full bg-gradient-to-br from-indigo-400/30 to-purple-400/30 blur-xl"></div>
            </section>

            {/* Features Section */}
            <section className="relative bg-gradient-to-b from-purple-50/50 via-white to-indigo-50/30 px-4 py-20">
                <div className="container mx-auto">
                    {/* セクションヘッダー */}
                    <div className="mb-16 text-center">
                        <h3 className="text-shimmer mb-4 text-3xl font-bold md:text-4xl">
                            Anigraph の<span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">特徴</span>
                        </h3>
                        <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                        <p className="mt-4 text-lg text-gray-600">あなたのアニメ体験を次のレベルへ</p>
                    </div>

                    {/* フィーチャーグリッド */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
                        {/* Feature 1 */}
                        <div className="group relative animate-fade-in overflow-hidden rounded-2xl border border-purple-200/50 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/50 p-8 shadow-lg shadow-purple-500/10 transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-pink-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                            
                            <div className="relative z-10 text-center">
                                <div className="mb-6 text-5xl transition-transform duration-300 group-hover:scale-110">📺</div>
                                <h4 className="mb-4 text-xl font-bold text-purple-700 transition-colors duration-300 group-hover:text-purple-900">アニメ一覧をチェック！</h4>
                                <p className="leading-relaxed text-gray-700">
                                    シーズンごとのアニメ一覧を閲覧して、お気に入りのアニメを見つけましょう。
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="group relative animate-fade-in overflow-hidden rounded-2xl border border-purple-200/50 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/50 p-8 shadow-lg shadow-purple-500/10 transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25" style={{ animationDelay: '100ms' }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-pink-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                            
                            <div className="relative z-10 text-center">
                                <div className="mb-6 text-5xl transition-transform duration-300 group-hover:scale-110">🏆</div>
                                <h4 className="mb-4 text-xl font-bold text-purple-700 transition-colors duration-300 group-hover:text-purple-900">自分だけのランキングを作成！</h4>
                                <p className="leading-relaxed text-gray-700">
                                    あなたが好きなアニメを順位付けして、オリジナルのランキングを公開できます。
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="group relative animate-fade-in overflow-hidden rounded-2xl border border-purple-200/50 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/50 p-8 shadow-lg shadow-purple-500/10 transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25" style={{ animationDelay: '200ms' }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-pink-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                            
                            <div className="relative z-10 text-center">
                                <div className="mb-6 text-5xl transition-transform duration-300 group-hover:scale-110">📊</div>
                                <h4 className="mb-4 text-xl font-bold text-purple-700 transition-colors duration-300 group-hover:text-purple-900">ランキングの変化をグラフで確認！</h4>
                                <p className="leading-relaxed text-gray-700">
                                    シーズンごとにあなたのランキングがどのように変わったのかをグラフで可視化。
                                </p>
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div className="group relative animate-fade-in overflow-hidden rounded-2xl border border-purple-200/50 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/50 p-8 shadow-lg shadow-purple-500/10 transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25" style={{ animationDelay: '300ms' }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-pink-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                            
                            <div className="relative z-10 text-center">
                                <div className="mb-6 text-5xl transition-transform duration-300 group-hover:scale-110">👥</div>
                                <h4 className="mb-4 text-xl font-bold text-purple-700 transition-colors duration-300 group-hover:text-purple-900">他のユーザーのランキングを見る！</h4>
                                <p className="leading-relaxed text-gray-700">
                                    他のユーザーがどんなランキングを作成しているのかを参考にできます。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="relative bg-gradient-to-r from-purple-100 via-purple-200 to-indigo-200 px-4 py-20 text-center">
                <div className="relative z-10 mx-auto max-w-4xl">
                    {/* CTA カード */}
                    <div className="hover:shadow-3xl group relative overflow-hidden rounded-3xl border border-purple-200/50 bg-gradient-to-br from-white/90 via-purple-50/90 to-indigo-50/90 p-12 shadow-2xl shadow-purple-500/20 backdrop-blur-xl transition-all duration-700 hover:-translate-y-3 hover:shadow-purple-500/30">
                        {/* 背景エフェクト */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-transparent to-pink-400/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                        <div className="duration-1200 absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform group-hover:translate-x-full"></div>
                        
                        {/* コンテンツ */}
                        <div className="relative z-10">
                            <div className="mb-6 animate-bounce-subtle text-6xl">🚀</div>
                            <h2 className="text-shimmer mb-6 text-4xl font-bold md:text-5xl">
                                さっそく<span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">始めよう！</span>
                            </h2>
                            <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>
                            <p className="mb-10 text-xl leading-relaxed text-gray-700">
                                あなたのアニメランキングを作成して、<br />
                                <span className="font-semibold text-purple-700">楽しさを共有</span>しましょう。
                            </p>
                            
                            {/* CTAボタンズ */}
                            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
                                <button
                                    className="neo-button group relative overflow-hidden rounded-xl border border-purple-300/50 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 px-10 py-4 font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40 focus:outline-none focus:ring-4 focus:ring-purple-300/50"
                                    onClick={() => router.visit(route('web.term.list'))}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        🎬 アニメシーズン一覧
                                    </span>
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                                </button>
                                
                                <button
                                    className="neo-button group relative overflow-hidden rounded-xl border border-purple-300/50 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 px-10 py-4 font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40 focus:outline-none focus:ring-4 focus:ring-purple-300/50"
                                    onClick={() => router.visit(route('web.user.list'))}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        👥 ユーザ一覧
                                    </span>
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                                </button>
                            </div>
                        </div>
                        
                        {/* カードのグロー効果 */}
                        <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
                    </div>
                </div>

                {/* 装飾要素 */}
                <div className="absolute left-16 top-16 h-20 w-20 animate-float rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-xl"></div>
                <div className="animate-float-delay absolute bottom-20 right-20 h-16 w-16 rounded-full bg-gradient-to-br from-indigo-400/30 to-purple-400/30 blur-xl"></div>
            </section>

            {/* Footer Section */}
            <footer className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 py-12 text-center">
                {/* 装飾背景 */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
                <div className="absolute left-1/4 top-0 h-32 w-32 animate-float rounded-full bg-purple-600/20 blur-3xl"></div>
                <div className="animate-float-delay absolute bottom-0 right-1/3 h-24 w-24 rounded-full bg-indigo-600/20 blur-3xl"></div>
                
                {/* コンテンツ */}
                <div className="relative z-10">
                    <div className="mb-4 animate-shimmer bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-2xl font-bold text-transparent">
                        Anigraph
                    </div>
                    <p className="font-medium text-purple-200/80">
                        &copy; 2025 Anigraph. All rights reserved.
                    </p>
                    <div className="mt-4 flex justify-center space-x-6 text-purple-300/60">
                        <span className="transition-colors hover:text-purple-200">🎨</span>
                        <span className="transition-colors hover:text-purple-200">📺</span>
                        <span className="transition-colors hover:text-purple-200">🎬</span>
                        <span className="transition-colors hover:text-purple-200">⭐</span>
                    </div>
                </div>
            </footer>

            {/* 最終フローティング装飾要素 */}
            <div className="pointer-events-none fixed bottom-8 left-8 h-4 w-4 animate-float rounded-full bg-gradient-to-br from-purple-400/40 to-transparent opacity-60 blur-sm"></div>
            <div className="animate-float-delay pointer-events-none fixed bottom-12 right-16 h-3 w-3 rounded-full bg-gradient-to-br from-pink-400/40 to-transparent opacity-60 blur-sm"></div>
        </div>
    )

})
export default Top
