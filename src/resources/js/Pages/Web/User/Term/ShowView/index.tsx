
import { AnimeCard } from '@/Components/AnimeCard'
import { getSeasonText } from '@/hooks/anime'
import { Anime } from '@/types/anime'
import { Term } from '@/types/term'
import { User } from '@/types/user'
import React from 'react'

type Props = {
    user?: User,
    term?: Term,
    animations: Anime[]
}

export const ShowView = React.memo<Props>(function ShowView({
    user,
    term,
    animations
}) {

    return (
        <div className='p-2'>
            <p className='p-4 text-2xl font-bold text-gray-700'>
                {`${term?.year}年${getSeasonText(term?.season ?? "")}`}シーズン {user?.name}が見たアニメ一覧
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
        </div>
    )

})
export default ShowView
