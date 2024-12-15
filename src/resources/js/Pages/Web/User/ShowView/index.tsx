
import Button from '@/Components/Button'
import { User } from '@/types/user'
import { router } from '@inertiajs/react'
import React from 'react'

type Props = {
    user?: User,
}

export const ShowView = React.memo<Props>(function ShowView({
    user
}) {

    return (
        <div>
            <p className='p-4 text-2xl font-bold text-gray-700'>
                {user?.name}のページ
            </p>
            <div>
                <Button className='ml-4 w-fit' onClick={() => router.visit(route('web.user.term.list', user?.id))}>
                    {user?.name}が見たアニメを見る(シーズン一覧)
                </Button>
            </div>
        </div>
    )

})
export default ShowView
