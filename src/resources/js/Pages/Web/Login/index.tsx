
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Button from '@/Components/Button'
import TextInput from '@/Components/TextInput'
import { useLogin } from './hooks'
import TitleText from '@/Components/TitleText'
import React from 'react'
import WebLayout from '@/Layouts/WebLayout'

export const Login = React.memo(function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset, submit } = useLogin()

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 p-4">
            {/* 背景デコレーション */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-float rounded-full bg-purple-300/20 blur-3xl"></div>
                <div className="animate-float-delay absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/3 h-64 w-64 animate-float rounded-full bg-pink-300/20 blur-3xl"></div>
            </div>

            {/* ログインカード */}
            <div className="relative z-10 w-full max-w-md">
                <div className="anime-card border-2 border-purple-200/50 p-8 shadow-2xl shadow-purple-500/20">
                    {/* ヘッダー */}
                    <div className="mb-8 animate-slide-down text-center">
                        {/* ロゴアイコン */}
                        <div className="mx-auto mb-6 flex h-20 w-20 animate-glow items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                            <span className="text-3xl">🎭</span>
                        </div>
                        
                        {/* タイトル */}
                        <h1 className="text-shimmer mb-2 text-3xl font-bold">ログイン</h1>
                        <p className="font-medium text-purple-600/70">あなたのアカウントにアクセス</p>
                        
                        {/* デコレーティブライン */}
                        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    </div>

                    {/* ステータスメッセージ */}
                    {status && (
                        <div className="mb-6 animate-scale-in rounded-xl border border-green-200 bg-green-50 p-4">
                            <p className="text-center text-sm font-medium text-green-600">{status}</p>
                        </div>
                    )}

                    {/* ログインフォーム */}
                    <form onSubmit={submit} className="animate-fade-in space-y-6" style={{ animationDelay: '200ms' }}>
                        {/* Email Field */}
                        <div className="group">
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-lg text-purple-400">📧</span>
                                </div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full rounded-xl border-2 border-purple-200/50 bg-white/80 px-4 py-3 pl-12 text-gray-700 placeholder-purple-300 backdrop-blur-sm transition-all duration-300 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/10 focus:ring-4 focus:ring-purple-400/20"
                                    placeholder="メールアドレス"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.email} className="mt-2 text-sm text-red-500" />
                        </div>

                        {/* Password Field */}
                        <div className="group">
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-lg text-purple-400">🔐</span>
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full rounded-xl border-2 border-purple-200/50 bg-white/80 px-4 py-3 pl-12 text-gray-700 placeholder-purple-300 backdrop-blur-sm transition-all duration-300 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/10 focus:ring-4 focus:ring-purple-400/20"
                                    placeholder="パスワード"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.password} className="mt-2 text-sm text-red-500" />
                        </div>

                        {/* ログインボタン */}
                        <Button 
                            className={`neo-button group relative w-full overflow-hidden !py-4 !text-lg ${processing ? 'cursor-not-allowed opacity-50' : ''}`}
                            disabled={processing}
                            variant="blue"
                        >
                            <div className="flex items-center justify-center gap-3">
                                {processing ? (
                                    <>
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                                        <span>ログイン中...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>ログイン</span>
                                        <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </>
                                )}
                            </div>
                            
                            {/* ホバー時のシマー効果 */}
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                        </Button>
                    </form>

                    {/* フッター */}
                    <div className="mt-8 animate-fade-in text-center" style={{ animationDelay: '400ms' }}>
                        <p className="text-sm text-purple-600/60">
                            アカウントをお持ちでない場合は管理者にお問い合わせください
                        </p>
                    </div>
                </div>

                {/* カードの影とグロー効果 */}
                <div className="absolute inset-0 -z-10 animate-pulse-glow rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl"></div>
            </div>

            {/* 小さなデコレーション要素 */}
            <div className="fixed left-10 top-10 h-4 w-4 animate-float rounded-full bg-purple-400/30 opacity-60 blur-sm"></div>
            <div className="animate-float-delay fixed right-16 top-20 h-6 w-6 rounded-full bg-pink-400/30 opacity-60 blur-sm"></div>
            <div className="fixed bottom-16 left-20 h-3 w-3 animate-float rounded-full bg-indigo-400/30 opacity-60 blur-sm"></div>
            <div className="animate-float-delay fixed bottom-20 right-10 h-5 w-5 rounded-full bg-purple-400/30 opacity-60 blur-sm"></div>
        </div>
    )
})

export default Login
