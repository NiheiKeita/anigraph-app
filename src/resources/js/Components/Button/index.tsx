
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
                return ' bg-white border-2 text-theme border-theme-default hover:bg-theme hover:text-white'
            case 'blue':
                return ' bg-theme  text-white border-gray-500 hover:opacity-90'
            case 'red':
                return ' bg-red-500 border text-white border-gray-500 hover:opacity-90'
            case 'attention':
                return ' bg-yellow-500 text-black border-2 border-red-500 hover:bg-yellow-600 hover:shadow-lg animate-pulse'
        }
    })()

    return (
        <button
            {...props}
            className={
                `inline-flex justify-center items-center px-4 py-2 rounded-full
                font-semibold text-sm uppercase tracking-widest transition ease-in duration-150
                ${disabled && 'opacity-25'} ` + className + variantCss
            }
            disabled={disabled}
        >
            <div className=''>{children}</div>
        </button>
    )
})
export default Button
