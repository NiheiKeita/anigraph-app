
import Button from '@/Components/Button'
import { User } from '@/types/user'
import { router } from '@inertiajs/react'
import React, { useCallback, useState } from 'react'

type Props = {
    users?: User[],
}

export const ListView = React.memo<Props>(function ListView({
    users
}) {

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-theme-backgroundColor to-indigo-50 p-6">
            {/* ヘッダーセクション */}
            <div className="mb-12 text-center">
                <div className="animate-slide-down">
                    <div className="mb-6 animate-bounce-subtle text-6xl">👥</div>
                    <h1 className="text-shimmer mb-4 text-4xl font-bold md:text-5xl">
                        ユーザー一覧
                    </h1>
                    <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <p className="mt-4 text-lg font-medium text-purple-600/80">
                        コミュニティメンバーを見つけよう
                    </p>
                </div>
            </div>

            {/* ユーザーカードグリッド */}
            <div className="mx-auto max-w-6xl">
                {users && users.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {users.map((user, index) => (
                            <div
                                key={user.id}
                                className="hover-lift group animate-scale-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="anime-card relative overflow-hidden rounded-2xl border border-purple-200/50 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/50 p-6 shadow-lg shadow-purple-500/10 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                                    {/* 背景パターン */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-pink-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    
                                    {/* シマー効果 */}
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                                    
                                    {/* ユーザー情報 */}
                                    <div className="relative z-10 text-center">
                                        {/* アバター */}
                                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg transition-transform duration-300 group-hover:scale-110">
                                            <span className="text-2xl font-bold text-white">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        
                                        {/* 名前 */}
                                        <h3 className="mb-2 text-lg font-bold text-gray-800 transition-colors duration-300 group-hover:text-purple-700">
                                            {user.name}
                                        </h3>
                                        
                                        {/* ID表示 */}
                                        <p className="mb-4 font-mono text-sm text-purple-600/70">
                                            ID: {user.id}
                                        </p>
                                        
                                        {/* アクションボタン */}
                                        <Button
                                            className="neo-button w-full !px-4 !py-2 !text-sm"
                                            variant="default"
                                            onClick={() => router.visit(route('web.user.show', user.id))}
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                <span>プロフィールを見る</span>
                                                <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
                                            </span>
                                        </Button>
                                    </div>
                                    
                                    {/* デコレーション */}
                                    <div className="absolute right-2 top-2 h-3 w-3 animate-pulse rounded-full bg-gradient-to-br from-purple-400/50 to-pink-400/50 blur-sm"></div>
                                    <div className="absolute bottom-2 left-2 h-2 w-2 animate-pulse rounded-full bg-gradient-to-br from-indigo-400/50 to-purple-400/50 blur-sm" style={{ animationDelay: '1s' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="mb-6 text-6xl opacity-50">😅</div>
                        <h3 className="mb-4 text-2xl font-bold text-gray-600">ユーザーが見つかりません</h3>
                        <p className="text-gray-500">まだ登録されているユーザーがいないようです。</p>
                    </div>
                )}
            </div>

            {/* デコレーション要素 */}
            <div className="fixed left-10 top-20 h-20 w-20 animate-float rounded-full bg-gradient-to-br from-purple-300/30 to-pink-300/30 opacity-60 blur-xl"></div>
            <div className="animate-float-delay fixed right-20 top-40 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-300/30 to-purple-300/30 opacity-60 blur-xl"></div>
            <div className="fixed bottom-20 left-1/4 h-16 w-16 animate-float rounded-full bg-gradient-to-br from-pink-300/30 to-purple-300/30 opacity-60 blur-xl"></div>
        </div>
    )

})
export default ListView
