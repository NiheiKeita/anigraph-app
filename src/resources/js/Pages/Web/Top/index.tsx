
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
        <div className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-50 font-sans">
            {/* Header Section */}
            <header
                className={`sticky top-0 z-50 bg-white shadow-md transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <div className="container mx-auto flex items-center justify-between px-4 py-4">
                    <h1 className="text-3xl font-bold text-pink-500">Anigraph</h1>
                    <nav className="hidden space-x-4 md:flex">
                        <button className="text-pink-500 hover:underline" onClick={() => router.visit(route('web.term.list'))}>
                            アニメシーズン一覧
                        </button>
                        <button className="text-pink-500 hover:underline" onClick={() => router.visit(route('web.user.list'))}>
                            ユーザ一覧
                        </button>
                    </nav>
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-pink-500 focus:outline-none"
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
                            <div className="absolute right-4 top-16 w-48 rounded-lg bg-white py-2 shadow-lg">
                                <button
                                    className="block w-full px-4 py-2 text-left text-pink-500 hover:bg-pink-100"
                                    onClick={() => router.visit(route('web.term.list'))}
                                >
                                    アニメシーズン一覧
                                </button>
                                <button
                                    className="block w-full px-4 py-2 text-left text-pink-500 hover:bg-pink-100"
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
            <section className="px-4 py-16 text-center">
                <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg">
                    <h2 className="mb-4 text-4xl font-extrabold text-pink-600">
                        あなたのアニメランキングを作成しよう！
                    </h2>
                    <p className="mb-8 text-lg text-gray-700">
                        Anigraphは、アニメのランキングを作成し、シーズンごとのアニメをチェックして、自分のランキングの変化をグラフで楽しめるプラットフォームです。
                    </p>

                    <button
                        className="rounded-lg border-none bg-pink-500 px-8 py-3 text-white shadow-md hover:bg-pink-600"
                        onClick={() => router.visit(route('web.term.list'))}
                    >
                        アニメシーズン一覧を見る
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white px-4 py-16">
                <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Feature 1 */}
                    <div className="rounded-lg bg-pink-50 p-6 text-center shadow-md">
                        <h3 className="mb-4 text-2xl font-bold text-blue-600">アニメ一覧をチェック！</h3>
                        <p className="text-gray-700">
                            シーズンごとのアニメ一覧を閲覧して、お気に入りのアニメを見つけましょう。
                        </p>
                    </div>
                    {/* Feature 2 */}
                    <div className="rounded-lg bg-pink-50 p-6 text-center shadow-md">
                        <h3 className="mb-4 text-2xl font-bold text-blue-600">自分だけのランキングを作成！</h3>
                        <p className="text-gray-700">
                            あなたが好きなアニメを順位付けして、オリジナルのランキングを公開できます。
                        </p>
                    </div>
                    {/* Feature 3 */}
                    <div className="rounded-lg bg-pink-50 p-6 text-center shadow-md">
                        <h3 className="mb-4 text-2xl font-bold text-blue-600">ランキングの変化をグラフで確認！</h3>
                        <p className="text-gray-700">
                            シーズンごとにあなたのランキングがどのように変わったのかをグラフで可視化。
                        </p>
                    </div>
                    {/* Feature 4 */}
                    <div className="rounded-lg bg-pink-50 p-6 text-center shadow-md">
                        <h3 className="mb-4 text-2xl font-bold text-blue-600">他のユーザーのランキングを見る！</h3>
                        <p className="text-gray-700">
                            他のユーザーがどんなランキングを作成しているのかを参考にできます。
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-pink-100 px-4 py-16 text-center">
                <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg">
                    <h2 className="mb-4 text-3xl font-bold text-pink-600">さっそく始めよう！</h2>
                    <p className="mb-8 text-gray-700">
                        あなたのアニメランキングを作成して、楽しさを共有しましょう。
                    </p>
                    <div className="grid justify-center justify-items-center gap-2 md:flex md:space-x-4">
                        <button
                            className="rounded-lg border-none bg-pink-500 px-8 py-3 text-white shadow-md hover:bg-pink-600"
                            onClick={() => router.visit(route('web.term.list'))}
                        >
                            アニメシーズン一覧を見る
                        </button>
                        <button
                            className="rounded-lg border-none bg-pink-500 px-8 py-3 text-white shadow-md hover:bg-pink-600"
                            onClick={() => router.visit(route('web.user.list'))}
                        >
                            ユーザ一覧
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-white py-8 text-center">
                <p className="text-gray-500">&copy; 2025 Anigraph. All rights reserved.</p>
            </footer>
        </div>
    )

})
export default Top
