
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode,
    className?: string,
    disabled?: boolean,
    variant?: "default" | "blue" | "red" | "attention"
}

export const Button = React.memo<Props>(function Button({
    children,
    className = "",
    disabled = false,
    variant = "default",
    ...props
}) {

    const variantCss = (() => {
        switch (variant) {
            case 'default':
                return ' bg-gradient-to-r from-purple-100 to-purple-50 border-2 text-purple-700 border-purple-300 hover:from-purple-700 hover:to-purple-600 hover:text-white hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/25'
            case 'blue':
                return ' bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-500 hover:from-purple-700 hover:to-purple-800 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5'
            case 'red':
                return ' bg-gradient-to-r from-red-500 to-red-600 border text-white border-red-400 hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5'
            case 'attention':
                return ' bg-gradient-to-r from-yellow-400 to-yellow-500 text-black border-2 border-accent-500 hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg hover:shadow-yellow-500/40 animate-pulse hover:-translate-y-0.5'
        }
    })()

    return (
        <button
            {...props}
            className={
                `inline-flex justify-center items-center px-4 py-2 rounded-full
                font-semibold text-sm uppercase tracking-widest transition-all ease-in-out duration-200 transform
                ${disabled && 'opacity-25 cursor-not-allowed'} ` + className + variantCss
            }
            disabled={disabled}
        >
            <div className=''>{children}</div>
        </button>
    )
})
export default Button
