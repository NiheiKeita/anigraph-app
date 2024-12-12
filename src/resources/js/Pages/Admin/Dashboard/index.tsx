
import Button from '@/Components/Button'
import React from 'react'
import { router } from "@inertiajs/react"

export const Dashboard = React.memo(function Dashboard() {
    const handleClick = () => {
        console.log(route("user.test"))
        fetch(route("user.test"))
            .then(response => response.json())
            .then(data => console.error('data:', data))
            .catch(error => console.error('Error fetching routes:', error))
    }
    return (
        <>
            <p className='text-2xl font-bold text-gray-700'>
                Dashboard
            </p>
            <div className='mt-10 grid gap-3'>
                <Button className='ml-4 w-fit' onClick={() => router.visit(route("user.list"))}>ユーザ一覧</Button>
                <Button className='ml-4 w-fit' onClick={() => router.visit(route("user.create"))}>ユーザ追加</Button>
                <Button className='ml-4 w-fit' onClick={() => router.visit(route("admin_user.list"))}>Adminユーザ一覧</Button>
                <Button className='ml-4 w-fit' onClick={() => router.visit(route("admin_user.create"))}>Adminユーザ作成</Button>
                <Button className='ml-4 w-fit' onClick={handleClick}>test</Button>
            </div>
        </>
    )
})
export default Dashboard
