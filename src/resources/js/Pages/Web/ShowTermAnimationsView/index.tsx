
import { AnimeCard } from '@/Components/AnimeCard'
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
    console.log("animations")
    console.log(animations)
    return (
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
    )

})
export default ShowTermAnimationsView
