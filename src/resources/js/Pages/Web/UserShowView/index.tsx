
import { getSeasonText } from '@/hooks/anime'
import { router } from '@inertiajs/react'
import React, { useCallback, useState } from 'react'

type Props = {
    user: any,
    terms: {
        id: string,
        year: string,
        season: string
    }[]
}

export const UserShowView = React.memo<Props>(function UserShowView({
    user,
    terms
}) {
    const [activeId] = useState<string>()

    const handleClick = (id: string) => {
        // setActiveId(id)
        router.visit(route("web.term.animations", id))
    }
    return (
        <>
            <p className='text-gray-700p-4 p-4 text-2xl font-bold'>
                アニメシーズン一覧
            </p>

            <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4 md:grid-cols-4">
                {terms.map((term) => (
                    <button
                        key={term.id}
                        onClick={() => handleClick(term.id)}
                        className={`
                            flex h-16 w-full
                            transform items-center
                            justify-center
                            rounded-lg
                            shadow-md transition-transform
                            hover:scale-105
                            focus:outline-none
                            focus:ring-4 focus:ring-blue-300
                            ${activeId === term.id
                                ? "bg-blue-600 text-white shadow-lg"
                                : "bg-white text-gray-800 hover:bg-blue-100"
                            }
                            `}
                    >
                        <span className="text-sm font-medium sm:text-base">
                            {term.year} 年 {getSeasonText(term.season)}
                        </span>
                    </button>
                ))}
            </div>
        </>
    )

})
export default UserShowView
