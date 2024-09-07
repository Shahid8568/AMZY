import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setIsCartLink } from '@/store/slices/UserProducts'
import toast from 'react-hot-toast'
import { protectedRoutes } from '../routes/routes'
import { usePathname } from 'next/navigation'
import { isLoginSelector } from '@/store/slices/authSlice'

const Layout = ({ children }) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const isLogin = useSelector(isLoginSelector)

    const pathname = usePathname()

    const requiresAuth = protectedRoutes.includes(pathname)

    const authCheck = () => {
        if (requiresAuth) {
            if (!isLogin) {
                router.push('/')
                toast.error('please login first')
                return
            }
        }
    }

    useEffect(() => {
        authCheck()
    }, [requiresAuth])

    useEffect(() => {
        if (router.pathname === '/' || router.pathname === '/men' || router.pathname === '/women' || router.pathname.startsWith('product-detail')) {
            dispatch(setIsCartLink({ data: false }))
            // toast.error('sdfkjsbf');
        }
    }, [router])

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout
