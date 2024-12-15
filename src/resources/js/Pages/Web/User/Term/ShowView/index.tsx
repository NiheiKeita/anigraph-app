
import { AnimeCard } from '@/Components/AnimeCard'
import { getSeasonText } from '@/hooks/anime'
import { Anime } from '@/types/anime'
import { Term } from '@/types/term'
import React from 'react'

type Props = {
    term?: Term,
    animations: Anime[]
}

export const ShowView = React.memo<Props>(function ShowView({
    term,
    animations
}) {

    return (
        <>
            <p className='p-4 text-2xl font-bold text-gray-700'>
                {`${term?.year}年${getSeasonText(term?.season ?? "")}`}シーズン 見たアニメ一覧
            </p>
            <div className='flex items-center justify-center'>
                <div className='grid grid-cols-2 gap-2 shadow-sm md:grid-cols-2'>
                    {animations?.map(animation => {
                        return (
                            <>
                                <AnimeCard
                                    isLogin={false}
                                    anime={animation}
                                    isLoading={false}
                                />
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )

})
export default ShowView
