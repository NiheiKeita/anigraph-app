
import React, { useEffect, useState } from 'react'
import Button from '../Button'
import { router, usePage } from '@inertiajs/react'

type Props = {
    page?: "rental" | "ma",
}
export const WebHeader = React.memo<Props>(function WebHeader({
    page
}) {
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const handleScroll = () => {
        if (typeof window !== 'undefined') {
            const currentScrollY = window.scrollY
            setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50)
            setLastScrollY(currentScrollY)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY])

    return (
        <header className={`sticky left-0 top-0 z-50 w-full bg-gradient-to-r from-purple-900 via-purple-800 to-purple-700 shadow-lg shadow-purple-500/20 backdrop-blur-lg transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="mx-auto flex items-center justify-between p-4">
                <div className="flex items-center" >
                    <div className='cursor-pointer' onClick={() => router.visit(route('web.top'))}>
                        <img src="/img/logo.png" alt="Logo" className="h-8" />
                    </div>
                    <div className="ms-6 hidden justify-start space-x-4 md:flex">
                        <div className={`cursor-pointer rounded-lg px-3 py-1 font-medium text-purple-100 transition-colors hover:bg-purple-700/50 hover:text-white`} onClick={() => { }}>メニュー１</div>
                        <div className={`cursor-pointer rounded-lg px-3 py-1 font-medium text-purple-100 transition-colors hover:bg-purple-700/50 hover:text-white`} onClick={() => { }}>メニュー２</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button className='ms-8' variant='blue' onClick={() => router.visit(route("user.login"))}>ログイン</Button>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2 rounded-lg p-2 transition-colors hover:bg-purple-700/50 md:hidden">
                        {isMenuOpen ? (
                            <span className="block h-6 w-6 text-white">✖</span>
                        ) : (
                            <span className="block h-auto w-6">
                                <span className="mb-1 block h-0.5 w-6 bg-white"></span>
                                <span className="mb-1 block h-0.5 w-6 bg-white"></span>
                                <span className="block h-0.5 w-6 bg-white"></span>
                            </span>
                        )}
                    </button>
                </div>
            </div >
            {/* ハンバーガーメニュー */}
            < nav className={`fixed left-0 top-16 flex w-full flex-col space-y-2 bg-gradient-to-b from-purple-800 to-purple-900 p-4 shadow-lg shadow-purple-500/20 backdrop-blur-lg ${isMenuOpen ? 'block' : 'hidden'}`}>
                <button className={`rounded-lg px-4 py-2 font-medium text-purple-100 transition-all hover:bg-purple-700/50 hover:text-white`} onClick={() => { }}>メニュー１</button>
                <button className={`rounded-lg px-4 py-2 font-medium text-purple-100 transition-all hover:bg-purple-700/50 hover:text-white`} onClick={() => { }}>メニュー２</button>
            </nav >
        </header >
    )
})
export default WebHeader
