
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
        <div className='p-2'>
            <p className='p-4 text-2xl font-bold text-gray-700'>
                見たことあるアニメランキング(編集)
            </p>
            <div>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Typography>評価済みのみ</Typography>
                    <Switch
                        checked={isNotFilterEvaluated}
                        onChange={handleClickFilterEvaluated}
                    />
                    <Typography>見評価</Typography>
                </Stack>
                {!isNotFilterEvaluated &&
                    (["SSS", "SS", "S", "A", "B", "C", "D", "E"] as EvaluationType[])
                        .map(v => <FormControlLabel key={v} control={<Checkbox value={v} onChange={() => handleChangeEvaluation(v)} checked={selectEvaluation.includes(v)} />} label={v} />)
                }
            </div>
            <div className='flex items-center justify-center'>
                <div className='grid grid-cols-2 gap-2 shadow-sm md:grid-cols-2'>
                    {animes?.filter(v => isNotFilterEvaluated ? !v.pivot?.evaluation : (v.pivot?.evaluation && selectEvaluation.includes(v.pivot.evaluation)))
                        // ?.filter(v => v.pivot?.evaluation && selectEvaluation.includes(v.pivot.evaluation))
                        ?.map(animation => {
                            return (
                                <>
                                    <AnimeEditCard
                                        key={animation.id}
                                        anime={animation}
                                        isLoading={loadingIds.includes(animation.id)}
                                        onClickEvaluation={(evaluation) => handleClickEvaluationButton(animation.id, evaluation)}
                                    />
                                </>
                            )
                        })}
                </div>
            </div>
        </div>
    )

})
export default EditView
