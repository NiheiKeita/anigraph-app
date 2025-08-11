
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode,
    className?: string,
    disabled?: boolean,
    variant?: "default" | "blue"
}

export const Tag = React.memo<Props>(function Tag({
    children,
    className = "",
    disabled = false,
    variant = "default",
    ...props
}) {

    const variantCss = (() => {
        switch (variant) {
            case 'default':
                return ' bg-gradient-to-r from-purple-100 to-purple-200 border-2 text-purple-700 border-purple-300/50 hover:from-purple-500 hover:to-purple-600 hover:text-white hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105'
            case 'blue':
                return ' bg-gradient-to-r from-purple-500 to-purple-600 border-2 text-white border-purple-400/50 hover:from-purple-600 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/40 hover:scale-105'
        }
    })()

    return (
        <button
            {...props}
            className={
                `inline-flex justify-center items-center px-4 py-2 rounded-full w-fit group relative overflow-hidden
                font-semibold text-sm uppercase tracking-widest transition-all duration-300 transform
                ${disabled && 'opacity-25 cursor-not-allowed'} ` + className + variantCss
            }
            disabled={disabled}
        >
            {/* シマー効果 */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
            
            {/* コンテンツ */}
            <div className='relative z-10'>{children}</div>
            
            {/* グロー効果 */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/0 to-pink-400/0 transition-all duration-300 group-hover:from-purple-400/20 group-hover:to-pink-400/20"></div>
        </button>
    )
})
export default Tag
