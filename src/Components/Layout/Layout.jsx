import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setIsCartLink } from '@/store/slices/UserProducts'
import toast from 'react-hot-toast'

const Layout = ({ children }) => {

    const router = useRouter()
    const dispatch = useDispatch()

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
