
import Button from '@/Components/Button'
import { useAuth } from '@/hooks/useAuth'
import { User } from '@/types/user'
import { router } from '@inertiajs/react'
import React from 'react'

type Props = {
    user?: User,
}

export const ShowView = React.memo<Props>(function ShowView({
    user
}) {
    const { authUser } = useAuth()

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
            {authUser?.id && authUser?.id === user?.id &&
                <div>
                    <Button className='ml-4 w-fit' onClick={() => router.visit(route('web.user.term.edit.list.viewingStatus', user?.id))}>
                        視聴アニメを編集する
                    </Button>
                </div>
            }
        </div>
    )

})
export default ShowView
