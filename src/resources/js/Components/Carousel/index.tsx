
import React, { useRef, useState } from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    images: string[],
}

export const Carousel = React.memo<Props>(function Carousel({
    images,
}) {
    const sliderRef = useRef<Slider>(null)
    const [currentSlide, setCurrentSlide] = useState(0)
    const settings = {
        dots: true,
        // infinite: true,
        infinite: images.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current: number, next: number) => setCurrentSlide(next),
    }

    return (
        <div className="anime-card relative w-full overflow-hidden rounded-2xl shadow-2xl shadow-purple-500/20">
            {/* カスタムスライダー */}
            <div className="relative">
                <Slider ref={sliderRef} {...settings}>
                    {images?.map((image, index) => (
                        <div key={index} className="relative">
                            <div className="relative w-full bg-gradient-to-br from-purple-100 to-purple-200" style={{ paddingTop: '56.25%' }}>
                                <img
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                                />
                                {!image && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-200 to-purple-300">
                                        <span className="text-6xl text-purple-400/50">🖼️</span>
                                    </div>
                                )}
                                
                                {/* 画像オーバーレイ */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* カスタムナビゲーションボタン */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
                <button
                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-purple-500/80 to-purple-600/80 text-white shadow-lg shadow-purple-500/30 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/40 focus:outline-none focus:ring-4 focus:ring-purple-300/50"
                    onClick={() => sliderRef.current?.slickPrev()}
                >
                    <span className="text-lg font-bold transition-transform duration-300 group-hover:scale-110">‹</span>
                    
                    {/* ボタンのシマー効果 */}
                    <div className="absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                </button>
            </div>
            
            <div className="absolute right-4 top-1/2 -translate-y-1/2 transform">
                <button
                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-purple-500/80 to-purple-600/80 text-white shadow-lg shadow-purple-500/30 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/40 focus:outline-none focus:ring-4 focus:ring-purple-300/50"
                    onClick={() => sliderRef.current?.slickNext()}
                >
                    <span className="text-lg font-bold transition-transform duration-300 group-hover:scale-110">›</span>
                    
                    {/* ボタンのシマー効果 */}
                    <div className="absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                </button>
            </div>

            {/* カスタムインジケーター */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 px-4 py-2 shadow-lg shadow-purple-500/30 backdrop-blur-xl">
                    <span className="text-sm font-medium text-white/90">
                        {currentSlide + 1}
                    </span>
                    <div className="h-4 w-px bg-white/30"></div>
                    <span className="text-sm text-white/70">
                        {images.length}
                    </span>
                </div>
            </div>

            {/* プログレスバー */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-purple-900/30">
                <div 
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
                    style={{ width: `${((currentSlide + 1) / images.length) * 100}%` }}
                ></div>
            </div>
        </div>
    )
})
export default Carousel
