
import { AnimeCard } from '@/Components/AnimeCard'
import { getSeasonText } from '@/hooks/anime'
import { Anime } from '@/types/anime'
import React, { useCallback, useState } from 'react'

type Props = {
    user?: any,
}

export const ShowView = React.memo<Props>(function ShowView({
    user
}) {

    return (
        <>
            <p className='p-4 text-2xl font-bold text-gray-700'>
                {user?.name}のページ
            </p>
        </>
    )

})
export default ShowView
