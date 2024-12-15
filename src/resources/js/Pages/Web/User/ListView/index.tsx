
import { AnimeCard } from '@/Components/AnimeCard'
import Button from '@/Components/Button'
import { getSeasonText } from '@/hooks/anime'
import { Anime } from '@/types/anime'
import { router } from '@inertiajs/react'
import React, { useCallback, useState } from 'react'

type Props = {
    users?: {
        id: string,
        name: string,
    }[],
}

export const ListView = React.memo<Props>(function ListView({
    users
}) {

    return (
        <>
            <p className='p-4 text-2xl font-bold text-gray-700'>
                user一覧
            </p>
            {
                users?.map((user) => {
                    return (
                        <div key={user.id}>
                            <Button
                                className='ml-4 w-fit'
                                onClick={() => router.visit(route('web.user.show', user.id))}
                            >
                                {user.name}のページへ
                            </Button>
                        </div>
                    )
                })
            }
        </>
    )

})
export default ListView
