
import { AnimeCard } from '@/Components/AnimeCard'
import { getSeasonText } from '@/hooks/anime'
import { Anime } from '@/types/anime'
import React, { useCallback, useState } from 'react'

type Props = {
    user?: any,
    term?: {
        id: string,
        year: string,
        season: string
    },
    animations: Anime[]
}

export const ShowTermAnimationsView = React.memo<Props>(function ShowTermAnimationsView({
    user,
    term,
    animations
}) {
    const [animes, setAnimes] = useState<Anime[]>(animations)
    const handleClickSeeButton = useCallback(async (animeId: number) => {
        try {
            const response = await fetch(`/users/${user.id}/animations/${animeId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    viewingStatus: 1,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to update')
            }

            const data = await response.json()
            console.log('Animation marked as watched:', data)
        } catch (error) {
            console.error('Error:', error)
        }

        setAnimes(prevData => {
            return prevData.filter(data => data.id !== animeId)
        })
    }, [])
    const handleClickNotSeeButton = useCallback((animeId: number) => {
        setAnimes(prevData => {
            return prevData.filter(data => data.id !== animeId)
        })
    }, [])
    return (
        <>
            <p className='p-4 text-2xl font-bold text-gray-700'>
                {`${term?.year}年${getSeasonText(term?.season ?? "")}`}シーズン一覧
            </p>
            <div className='flex items-center justify-center'>
                <div className='grid grid-cols-1 gap-2 shadow-sm md:grid-cols-2'>
                    {animes?.map(anime => {
                        return (
                            <>
                                <AnimeCard
                                    isLogin={!!user}
                                    onClickSeeButton={() => handleClickSeeButton(anime.id)}
                                    onClickNotSeeButton={() => handleClickNotSeeButton(anime.id)}
                                    anime={anime} />
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )

})
export default ShowTermAnimationsView
