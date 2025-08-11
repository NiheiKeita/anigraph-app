
import Button from '@/Components/Button'
import { User } from '@/types/user'
import { router } from '@inertiajs/react'
import React from 'react'

type Props = {
    user?: User,
    authUser?: User,
}

export const ShowView = React.memo<Props>(function ShowView({
    user,
    authUser
}) {
    const isOwnProfile = authUser?.id === user?.id

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-theme-backgroundColor to-indigo-50 p-6">
            {/* プロフィールヘッダー */}
            <div className="mb-12">
                <div className="mx-auto max-w-4xl">
                    {/* カバー背景 */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 p-8 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 via-pink-500/80 to-indigo-600/80"></div>
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}></div>
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                            {/* プロフィール画像 */}
                            <div className="mb-6 flex h-32 w-32 animate-glow items-center justify-center rounded-full border border-white/30 bg-gradient-to-br from-white/20 to-white/10 shadow-2xl backdrop-blur-xl">
                                <span className="text-5xl font-bold text-white drop-shadow-lg">
                                    {user?.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            
                            {/* ユーザー名 */}
                            <h1 className="mb-2 animate-slide-down text-4xl font-bold text-white drop-shadow-lg">
                                {user?.name}
                            </h1>
                            
                            {/* ユーザー種別バッジ */}
                            <div className="mb-4 inline-flex items-center rounded-full border border-white/30 bg-white/20 px-4 py-2 font-medium text-white backdrop-blur-xl">
                                {isOwnProfile ? (
                                    <>
                                        <span className="mr-2">👤</span>
                                        <span>あなたのプロフィール</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="mr-2">🌟</span>
                                        <span>メンバープロフィール</span>
                                    </>
                                )}
                            </div>
                            
                            {/* ID */}
                            <p className="font-mono text-sm text-white/80">ID: {user?.id}</p>
                        </div>
                        
                        {/* デコレーション */}
                        <div className="absolute right-4 top-4 h-8 w-8 animate-float rounded-full bg-white/20"></div>
                        <div className="animate-float-delay absolute bottom-4 left-4 h-6 w-6 rounded-full bg-white/15"></div>
                    </div>
                </div>
            </div>

            {/* メインコンテンツ */}
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* 閲覧用アクション */}
                    <div className="anime-card animate-scale-in p-8">
                        <div className="mb-6 text-center">
                            <div className="mb-4 text-4xl">📺</div>
                            <h2 className="mb-2 text-2xl font-bold text-gray-800">アニメ閲覧</h2>
                            <p className="text-purple-600/70">
                                {user?.name}さんのアニメ情報を見る
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <Button 
                                className="neo-button group w-full !py-4 !text-base"
                                variant="default"
                                onClick={() => router.visit(route('web.user.term.list', user?.id))}
                            >
                                <div className="flex w-full items-center justify-between">
                                    <span className="flex items-center gap-3">
                                        <span>🗓️</span>
                                        <span>シーズン別アニメを見る</span>
                                    </span>
                                    <span className="text-purple-500 transition-transform duration-300 group-hover:translate-x-2">→</span>
                                </div>
                            </Button>
                            
                            <Button 
                                className="neo-button group w-full !py-4 !text-base"
                                variant="default"
                                onClick={() => {
                                    router.visit(route("web.user.animations.show.evaluation", user?.id), {
                                        data: { media: "tv" },
                                    })
                                }}
                            >
                                <div className="flex w-full items-center justify-between">
                                    <span className="flex items-center gap-3">
                                        <span>⭐</span>
                                        <span>評価したアニメを見る</span>
                                    </span>
                                    <span className="text-purple-500 transition-transform duration-300 group-hover:translate-x-2">→</span>
                                </div>
                            </Button>
                        </div>
                    </div>

                    {/* 編集用アクション（本人のみ） */}
                    {isOwnProfile && (
                        <div className="anime-card animate-scale-in p-8" style={{ animationDelay: '200ms' }}>
                            <div className="mb-6 text-center">
                                <div className="mb-4 text-4xl">✏️</div>
                                <h2 className="mb-2 text-2xl font-bold text-gray-800">編集機能</h2>
                                <p className="text-purple-600/70">
                                    あなたのアニメ情報を編集
                                </p>
                            </div>
                            
                            <div className="space-y-4">
                                <Button 
                                    className="neo-button group w-full border-2 border-purple-300 !py-4 !text-base hover:border-purple-400"
                                    variant="default"
                                    onClick={() => router.visit(route('web.user.term.edit.list.viewingStatus', user?.id))}
                                >
                                    <div className="flex w-full items-center justify-between">
                                        <span className="flex items-center gap-3">
                                            <span>📝</span>
                                            <span>視聴アニメを編集</span>
                                        </span>
                                        <span className="text-purple-500 transition-transform duration-300 group-hover:translate-x-2">→</span>
                                    </div>
                                </Button>
                                
                                <Button 
                                    className="neo-button group w-full border-2 border-purple-300 !py-4 !text-base hover:border-purple-400"
                                    variant="default"
                                    onClick={() => {
                                        router.visit(route("web.user.animations.edit.evaluation", user?.id), {
                                            data: { media: "tv" },
                                        })
                                    }}
                                >
                                    <div className="flex w-full items-center justify-between">
                                        <span className="flex items-center gap-3">
                                            <span>🌟</span>
                                            <span>アニメ評価を編集</span>
                                        </span>
                                        <span className="text-purple-500 transition-transform duration-300 group-hover:translate-x-2">→</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    )}
                    
                    {/* 他ユーザーの場合の空きスペース用カード */}
                    {!isOwnProfile && (
                        <div className="anime-card flex animate-scale-in items-center justify-center p-8" style={{ animationDelay: '200ms' }}>
                            <div className="text-center">
                                <div className="mb-4 text-6xl opacity-50">🎭</div>
                                <h3 className="mb-2 text-xl font-bold text-gray-600">プロフィール情報</h3>
                                <p className="text-gray-500">
                                    {user?.name}さんのアニメ活動をチェックしよう
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* デコレーション要素 */}
            <div className="fixed left-10 top-20 h-20 w-20 animate-float rounded-full bg-gradient-to-br from-purple-300/30 to-pink-300/30 opacity-60 blur-xl"></div>
            <div className="animate-float-delay fixed right-20 top-40 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-300/30 to-purple-300/30 opacity-60 blur-xl"></div>
            <div className="fixed bottom-20 left-1/4 h-16 w-16 animate-float rounded-full bg-gradient-to-br from-pink-300/30 to-purple-300/30 opacity-60 blur-xl"></div>
        </div>
    )

})
export default ShowView
