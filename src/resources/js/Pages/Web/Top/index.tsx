
import Button from '@/Components/Button'
import { router } from '@inertiajs/react'
import React from 'react'

export const Top = React.memo(function Top() {
    return (
        <>
            <p className='text-2xl font-bold text-gray-700'>
                Top
            </p>

            <Button
                className='ml-4 w-fit'
                onClick={() => router.visit(route('web.user.list'))}
            >
                ユーザ一覧ページへ
            </Button>
        </>
    )

})
export default Top
