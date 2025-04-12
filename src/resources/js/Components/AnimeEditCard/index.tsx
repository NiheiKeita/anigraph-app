import { Anime, EvaluationType } from "@/types/anime"
import React from "react"
import Button from "../Button"
import { evaluations } from "@/config/evaluation"

type Props = {
    anime?: Anime
    onClickSeeButton?: () => void
    onClickNotSeeButton?: () => void
    onClickEvaluation: (evaluation: EvaluationType) => void
    isLoading: boolean
}
export const AnimeEditCard = React.memo<Props>(function AnimeEditCard({
    anime,
    onClickSeeButton,
    onClickNotSeeButton,
    onClickEvaluation,
    isLoading = false
}) {

    return (
        <div className="max-w-md rounded-lg bg-white p-6 shadow-lg transition-transform duration-200 hover:scale-105">
            <div className="w-full rounded-lg bg-gray-100 md:h-44">
                <img
                    src={anime?.facebook_image_url == '' ? "/imgs/unnamed.jpg" : anime?.facebook_image_url ?? ''}
                    alt={anime?.title ?? ''}
                    className="max-h-full w-full rounded-lg object-contain"
                    onError={(event) => {
                        const target = event.currentTarget
                        target.src = "/imgs/unnamed.jpg"
                    }}
                />
            </div>
            <h3 className="mt-4 text-sm font-bold">{anime?.title}</h3>
            <p className="mt-2 text-xs">メディア: {anime?.media}</p>
            <p className="mt-2 text-xs">シーズン: {anime?.season_name}</p>
            <p className="mt-2 text-xs">評価: {anime?.pivot?.evaluation ?? "-"}</p>
            <div className="mt-2 flex justify-between text-xs">
                {anime?.official_site_url &&
                    <a
                        href={anime.official_site_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        公式サイト
                    </a>
                }
                {anime?.wikipedia_url &&
                    <a
                        href={anime.wikipedia_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        Wikipedia
                    </a>
                }
            </div>
            {!anime?.pivot?.viewing_status && (
                <div className="mt-2 flex gap-1 p-1">
                    {isLoading && <>送信中....</>}
                    {!isLoading && (
                        <>
                            <Button className="!px-2 !py-1" variant="red" onClick={onClickNotSeeButton}>見てない</Button>
                            <Button className="!px-2 !py-1" variant="blue" onClick={onClickSeeButton}>見た</Button>
                        </>
                    )}
                </div>
            )}
            <div className="mt-2 flex gap-1 p-1">
                {isLoading && <>送信中....</>}
                {!isLoading && (
                    <div className="grid grid-cols-4 gap-1">
                        {evaluations.map(evaluation => {
                            return (
                                <Button
                                    key={evaluation}
                                    className="!px-2 !py-1"
                                    variant={evaluation === anime?.pivot?.evaluation ? "attention"
                                        : ["SSS", "SS", "S", "A"].includes(evaluation) ? "blue" : "red"}
                                    onClick={() => onClickEvaluation(evaluation)}
                                    disabled={evaluation === anime?.pivot?.evaluation}
                                >
                                    {evaluation}
                                </Button>
                            )
                        })}
                    </div>
                )}
            </div>
        </div >
    )
})
