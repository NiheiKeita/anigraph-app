
import { AnimeEditCard } from '@/Components/AnimeEditCard'
import { Anime, EvaluationType } from '@/types/anime'
import { User } from '@/types/user'
import { Checkbox, FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'

type Props = {
    user?: User,
    animations: Anime[]
}

export const EditView = React.memo<Props>(function EditView({
    user,
    animations
}) {
    const [animes, setAnimes] = useState<Anime[]>(animations)
    const [loadingIds, setLoadingIds] = useState<number[]>([])
    const [selectEvaluation, setSelectEvaluation] = useState<EvaluationType[]>(["SSS", "SS", "S", "A", "B", "C", "D", "E"])
    const [isNotFilterEvaluated, setIsNotFilterEvaluated] = useState<boolean>(true)
    const handleClickFilterEvaluated = useCallback(() => {
        setIsNotFilterEvaluated(prev => !prev)
    }, [setIsNotFilterEvaluated])
    const handleChangeEvaluation = useCallback((evaluation: EvaluationType) => {
        setSelectEvaluation(prev => {
            if (prev.includes(evaluation)) {
                return prev.filter(v => v !== evaluation)
            } else {
                return [...prev, evaluation]
            }
        })
    }, [setSelectEvaluation])

    const handleClickEvaluationButton = useCallback(async (animeId: number, evaluation: EvaluationType) => {
        setLoadingIds(prev => [...new Set([...(prev ?? []), animeId])])
        try {
            const response = await fetch(route("web.animations.update.evaluation", { "user_id": user?.id, "animation_id": animeId }), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    viewing_status: 1,
                    evaluation: evaluation
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to update')
            }

            const data = await response.json()
            console.log('Animation marked as watched:', data)
        } catch (error) {
            console.error('Error:', error)
        } finally {
            // 処理完了後にIDを削除
            setLoadingIds(prev => prev.filter(id => id !== animeId))
            setAnimes(prevData => {
                return prevData.map(data => {
                    if (data.id !== animeId) return data
                    if (data.pivot) {
                        data.pivot.evaluation = evaluation
                    }
                    return data
                })
            })
        }

    }, [])

    return (
        <div className="scrollbar-thin min-h-screen bg-gradient-to-br from-amber-50 via-theme-backgroundColor to-orange-50">
            {/* 編集ページ専用ヘッダー */}
            <div className="relative overflow-hidden">
                {/* 背景デコレーション */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 via-transparent to-orange-600/10"></div>
                <div className="absolute left-1/4 top-0 h-72 w-72 animate-float rounded-full bg-amber-300/20 blur-3xl"></div>
                <div className="animate-float-delay absolute right-1/4 top-20 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl"></div>
                
                <div className="relative z-10 px-6 py-12 text-center">
                    <div className="animate-slide-down">
                        {/* 編集アイコン */}
                        <div className="mb-6 animate-bounce-subtle text-7xl">⚙️</div>
                        
                        {/* タイトル */}
                        <h1 className="text-shimmer mb-4 text-4xl font-bold md:text-5xl">
                            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{user?.name}</span>の
                        </h1>
                        <h2 className="text-shimmer mb-4 text-3xl font-bold md:text-4xl">
                            ランキング編集
                        </h2>
                        
                        {/* アンダーライン */}
                        <div className="mx-auto mb-4 h-1 w-32 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500"></div>
                        
                        {/* サブタイトル */}
                        <p className="text-xl font-medium text-amber-600/80">
                            評価編集 • {animations?.length || 0}作品
                        </p>
                        
                        {/* 編集モード表示 */}
                        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-amber-100/50 px-4 py-2">
                            <span className="text-sm font-bold text-amber-700">⚙️ 評価編集モード</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* フィルターセクション */}
            <div className="px-6 pb-8">
                <div className="mx-auto max-w-4xl">
                    <div className="rounded-2xl border border-amber-200/50 bg-white/80 p-6 shadow-xl shadow-amber-500/10 backdrop-blur-xl">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="text-2xl">🔍</span>
                            <h3 className="text-lg font-bold text-amber-700">フィルター設定</h3>
                        </div>
                        
                        {/* MUI コンポーネントのカスタマイズ */}
                        <div className="mb-4">
                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Typography sx={{ color: '#b45309', fontWeight: 'bold' }}>評価済みのみ</Typography>
                                <Switch
                                    checked={isNotFilterEvaluated}
                                    onChange={handleClickFilterEvaluated}
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#f59e0b',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: '#f59e0b',
                                        },
                                    }}
                                />
                                <Typography sx={{ color: '#b45309', fontWeight: 'bold' }}>未評価</Typography>
                            </Stack>
                        </div>
                        
                        {!isNotFilterEvaluated && (
                            <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
                                {(["SSS", "SS", "S", "A", "B", "C", "D", "E"] as EvaluationType[])
                                    .map(v => (
                                        <FormControlLabel 
                                            key={v} 
                                            control={
                                                <Checkbox 
                                                    value={v} 
                                                    onChange={() => handleChangeEvaluation(v)} 
                                                    checked={selectEvaluation.includes(v)}
                                                    sx={{
                                                        color: '#f59e0b',
                                                        '&.Mui-checked': {
                                                            color: '#f59e0b',
                                                        },
                                                    }}
                                                />
                                            } 
                                            label={
                                                <span style={{ 
                                                    color: '#b45309', 
                                                    fontWeight: 'bold',
                                                    fontSize: '0.875rem'
                                                }}>
                                                    {v}
                                                </span>
                                            }
                                            sx={{ margin: 0 }}
                                        />
                                    ))
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* アニメカードセクション */}
            <div className="px-6 pb-12">
                <div className="mx-auto max-w-7xl">
                    {(() => {
                        const filteredAnimes = animes?.filter(v => 
                            isNotFilterEvaluated 
                                ? !v.pivot?.evaluation 
                                : (v.pivot?.evaluation && selectEvaluation.includes(v.pivot.evaluation))
                        ) || []
                        
                        return filteredAnimes.length > 0 ? (
                            <>
                                {/* 編集説明 */}
                                <div className="mb-8 text-center">
                                    <div className="mx-auto max-w-2xl rounded-2xl border border-amber-200/50 bg-amber-50/50 p-6 backdrop-blur-sm">
                                        <div className="mb-2 text-2xl">⭐</div>
                                        <p className="text-amber-700">
                                            各アニメの評価ボタンをクリックして、SSS〜Eランクで評価を編集できます
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {filteredAnimes.map((animation, index) => (
                                        <div 
                                            key={animation.id} 
                                            className="hover-lift animate-scale-in"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <div className="anime-card group relative">
                                                {/* 編集モードインジケーター */}
                                                <div className="absolute left-2 top-2 z-20">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-r from-amber-400 to-orange-400 text-xs text-white shadow-lg">
                                                        ⚙️
                                                    </div>
                                                </div>
                                                
                                                <AnimeEditCard
                                                    anime={animation}
                                                    isLoading={loadingIds.includes(animation.id)}
                                                    onClickEvaluation={(evaluation) => handleClickEvaluationButton(animation.id, evaluation)}
                                                />
                                                
                                                {/* 編集モード専用ホバー効果 */}
                                                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-amber-500/0 via-transparent to-amber-500/0 transition-all duration-300 group-hover:from-amber-500/5 group-hover:to-amber-500/5"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="mb-6 text-6xl opacity-50">⚙️</div>
                                <h3 className="mb-4 text-2xl font-bold text-gray-600">編集するアニメがありません</h3>
                                <p className="text-gray-500">フィルター条件に該当するアニメがありません。</p>
                            </div>
                        )
                    })()}
                </div>
            </div>

            {/* フローティング装飾要素 */}
            <div className="pointer-events-none fixed left-8 top-1/4 h-6 w-6 animate-float rounded-full bg-gradient-to-br from-amber-400/40 to-transparent opacity-60 blur-sm"></div>
            <div className="animate-float-delay pointer-events-none fixed right-12 top-1/3 h-8 w-8 rounded-full bg-gradient-to-br from-orange-400/40 to-transparent opacity-60 blur-sm"></div>
            <div className="pointer-events-none fixed bottom-1/4 left-1/4 h-4 w-4 animate-float rounded-full bg-gradient-to-br from-amber-400/40 to-transparent opacity-60 blur-sm"></div>
            <div className="animate-float-delay pointer-events-none fixed bottom-1/3 right-1/3 h-5 w-5 rounded-full bg-gradient-to-br from-orange-400/40 to-transparent opacity-60 blur-sm"></div>
        </div>
    )

})
export default EditView
