
import { getSeasonText } from '@/hooks/anime'
import { useTerm } from '@/hooks/useTerm'
import { Term } from '@/types/term'
import { router } from '@inertiajs/react'
import React from 'react'

type Props = {
    terms: Term[]
}

export const ListView = React.memo<Props>(function ListView({
    terms
}) {
    const { groupedTerms } = useTerm()
    const grouped = groupedTerms(terms)

    const handleClick = (id: string) => {
        // router.visit(route("web.term.show", id))
        router.visit(route("web.term.show", id), {
            data: {
                media: "tv",
            },
        })
    }

    return (
        <div className='p-4'>
            <p className='text-gray-700p-4 p-4 text-2xl font-bold'>
                アニメシーズン一覧
            </p>
            {Object.keys(grouped)
                .sort((a, b) => Number(b) - Number(a)).map((year) => (
                    <div key={year} className="mb-6">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 sm:text-xl">
                            {year} 年
                        </h2>
                        <div className="grid grid-cols-4 gap-4">
                            {grouped[year].map((term) => (
                                <button
                                    key={term.id}
                                    onClick={() => handleClick(term.id)}
                                    className={`
                                flex h-16 w-full
                                transform items-center
                                justify-center
                                rounded-lg
                                bg-white text-gray-800
                                shadow-md
                                transition-transform
                                hover:scale-105 hover:bg-blue-100
                                focus:outline-none focus:ring-4 focus:ring-blue-300
                            `}
                                >
                                    <span className="text-sm font-medium sm:text-base">
                                        {getSeasonText(term.season)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
        </div >
    )

})
export default ListView
