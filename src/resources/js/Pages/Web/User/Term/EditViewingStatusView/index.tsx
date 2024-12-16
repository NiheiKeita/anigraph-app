
import { AnimeCard } from '@/Components/AnimeCard'
import { getSeasonText } from '@/hooks/anime'
import { Anime } from '@/types/anime'
import { Term } from '@/types/term'
import { User } from '@/types/user'
import React, { useCallback, useState } from 'react'

type Props = {
    user?: User,
    term?: Term,
    animations: Anime[]
}

export const EditViewingStatusView = React.memo<Props>(function EditViewingStatusView({
    user,
    term,
    animations
}) {
    const [animes, setAnimes] = useState<Anime[]>(animations)
    const [loadingIds, setLoadingIds] = useState<number[]>([])

    const handleClickSeeButton = useCallback(async (animeId: number) => {
        setLoadingIds(prev => [...new Set([...(prev ?? []), animeId])])
        try {
            const response = await fetch(`/users/${user?.id}/animations/${animeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    viewing_status: 1,
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
                return prevData.filter(data => data.id !== animeId)
            })
        }

    }, [])
    const handleClickNotSeeButton = useCallback(async (animeId: number) => {
        setLoadingIds(prev => [...new Set([...(prev ?? []), animeId])])
        try {
            const response = await fetch(`/users/${user?.id}/animations/${animeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    viewing_status: 2,
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
                return prevData.filter(data => data.id !== animeId)
            })
        }
    }, [])
    return (
        <div className='p-2'>
            <p className='p-4 text-2xl font-bold text-gray-700'>
                {`${term?.year}年${getSeasonText(term?.season ?? "")}`}シーズン一覧
            </p>
            <div className='flex items-center justify-center'>
                <div className='grid grid-cols-2 gap-2 shadow-sm md:grid-cols-2'>
                    {animes?.map(anime => {
                        return (
                            <>
                                <AnimeCard
                                    isLogin={!!user}
                                    onClickSeeButton={() => handleClickSeeButton(anime.id)}
                                    onClickNotSeeButton={() => handleClickNotSeeButton(anime.id)}
                                    anime={anime}
                                    isLoading={loadingIds.includes(anime.id)}
                                />
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )

})
export default EditViewingStatusView
