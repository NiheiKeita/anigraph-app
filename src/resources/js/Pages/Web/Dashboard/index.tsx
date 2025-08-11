
import React from 'react'

export const Dashboard = React.memo(function Dashboard() {
    return (
        <div className="min-h-screen">
            <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-100 to-purple-200 p-8 shadow-lg shadow-purple-500/10">
                <h1 className='bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-3xl font-bold text-transparent'>
                    Dashboard
                </h1>
                <p className="mt-2 text-purple-600">あなたのアニメランキングダッシュボード</p>
            </div>
        </div>
    )

})
export default Dashboard