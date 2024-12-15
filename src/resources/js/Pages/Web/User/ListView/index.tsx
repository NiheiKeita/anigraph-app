
import Button from '@/Components/Button'
import { User } from '@/types/user'
import { router } from '@inertiajs/react'
import React, { useCallback, useState } from 'react'

type Props = {
    users?: User[],
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
