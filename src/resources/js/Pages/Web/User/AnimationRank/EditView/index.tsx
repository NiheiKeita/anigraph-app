
import { AnimeCard } from '@/Components/AnimeCard'
import { AnimeEditCard } from '@/Components/AnimeEditCard'
import { getSeasonText } from '@/hooks/anime'
import { Anime } from '@/types/anime'
import { Term } from '@/types/term'
import { User } from '@/types/user'
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

    const handleClickEvaluationButton = useCallback(async (animeId: number, evaluation: string) => {
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
        <>
            <p className='p-4 text-2xl font-bold text-gray-700'>
                見たことあるアニメランキング(編集)
            </p>
            <div className='flex items-center justify-center'>
                <div className='grid grid-cols-2 gap-2 shadow-sm md:grid-cols-2'>
                    {animes?.map(animation => {
                        return (
                            <>
                                <AnimeEditCard
                                    anime={animation}
                                    isLoading={loadingIds.includes(animation.id)}
                                    onClickEvaluation={(evaluation) => handleClickEvaluationButton(animation.id, evaluation)}
                                />
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )

})
export default EditView
