
import React from 'react'
import Button from '../Button'

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    // handleTelClick: () => void,
    // handleInquiryClick: () => void,
    children: React.ReactNode;
}

export const ModalView = React.memo<Props>(function TitleText({
    isOpen,
    onClose,
    title,
    // handleTelClick,
    // handleInquiryClick,
    children
}) {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center p-4">
            {/* 背景オーバーレイ */}
            <div 
                className="fixed inset-0 bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-pink-900/50 backdrop-blur-sm transition-opacity duration-300" 
                onClick={onClose}
            ></div>
            
            {/* モーダルコンテンツ */}
            <div className="relative w-full max-w-2xl animate-scale-in">
                {/* メインモーダル */}
                <div className="anime-card border-2 border-purple-200/50 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/50 shadow-2xl shadow-purple-500/20 backdrop-blur-xl">
                    {/* ヘッダー */}
                    <div className="relative border-b border-purple-200/50 bg-gradient-to-r from-purple-500/5 to-pink-500/5 px-6 py-4">
                        <h2 className="text-shimmer text-2xl font-bold text-gray-800">
                            {title}
                        </h2>
                        
                        {/* デコレーティブライン */}
                        <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    </div>
                    
                    {/* コンテンツエリア */}
                    <div className="scrollbar-thin relative max-h-[70vh] w-full overflow-y-auto p-6">
                        <div className="animate-slide-up" style={{ animationDelay: '150ms' }}>
                            {children}
                        </div>
                    </div>
                    
                    {/* 閉じるボタン */}
                    <button
                        className="group absolute -right-3 -top-3 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-500 shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-red-500/40 focus:outline-none focus:ring-4 focus:ring-red-300/50"
                        onClick={onClose}
                    >
                        <span className="text-xl font-bold text-white transition-transform duration-300 group-hover:scale-110">
                            ×
                        </span>
                        
                        {/* ボタンのグロー効果 */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-300/0 to-red-600/0 transition-all duration-300 group-hover:from-red-300/20 group-hover:to-red-600/20"></div>
                    </button>
                </div>
                
                {/* モーダル外部のグロー効果 */}
                <div className="absolute inset-0 -z-10 animate-pulse-glow rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl"></div>
            </div>
        </div>
    )

})
export default ModalView
