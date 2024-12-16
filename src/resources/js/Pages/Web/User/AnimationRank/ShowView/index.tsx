
import { AnimeCard } from '@/Components/AnimeCard'
import { AnimeEditCard } from '@/Components/AnimeEditCard'
import { evaluations } from '@/config/evaluation'
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

    return (
        <div className='p-2'>
            <p className='p-4 text-2xl font-bold text-gray-700'>
                見たことあるアニメランキング(評価順)
            </p>
            <div className='flex items-center justify-center'>
                <div className='grid gap-2'>
                    {evaluations.map(evaluation => {
                        return (
                            <div key={evaluation}>
                                <p>{evaluation}ランク</p>
                                <div className='grid grid-cols-2 gap-2 md:grid-cols-2'>
                                    {animations?.filter(data => data.pivot?.evaluation === evaluation).length === 0 && "-"}
                                    {animations?.filter(data => data.pivot?.evaluation === evaluation).map(animation => {
                                        return (
                                            <>
                                                <AnimeCard
                                                    anime={animation}
                                                    isLoading={false}
                                                />
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                    <div>
                        <p>未評価</p>
                        <div className='grid grid-cols-2 gap-2 md:grid-cols-2'>
                            {animations?.filter(data => !data.pivot?.evaluation).length === 0 && "-"}
                            {animations?.filter(data => !data.pivot?.evaluation).map(animation => {
                                return (
                                    <>
                                        <AnimeCard
                                            anime={animation}
                                            isLoading={false}
                                        />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

})
export default EditView
