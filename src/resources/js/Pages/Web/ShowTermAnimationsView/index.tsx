
import { AnimeCard } from '@/Components/AnimeCard'
import { getSeasonText } from '@/hooks/anime'
import { Anime } from '@/types/anime'
import React from 'react'

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
    return (
        <>
            <p className='p-4 text-2xl font-bold text-gray-700'>
                {`${term?.year}年${getSeasonText(term?.season ?? "")}`}シーズン一覧
            </p>
            <div className='flex items-center justify-center'>
                <div className='grid grid-cols-1 gap-2 shadow-sm md:grid-cols-2'>
                    {animations?.map(animation => {
                        return (
                            <>
                                <AnimeCard anime={animation} />
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )

})
export default ShowTermAnimationsView
