'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AllProducts from '@/Components/allProducts/AllProducts'
import { useDispatch, useSelector } from 'react-redux'
import { isLoginSelector } from '@/store/slices/authSlice'
import { cartDataSelector, setCartData, setWishlistData, wishlistSelector } from '@/store/slices/UserProducts'
import toast from 'react-hot-toast'
import CommonCardSections from '@/Components/CommonCardSections'
import newArrivals from '@/Components/commonProducts/newArrivals'
import { FaStar } from 'react-icons/fa'
import { TbTruckDelivery } from "react-icons/tb";
import { FaArrowsRotate } from "react-icons/fa6";

const index = () => {
    const allProductsData = AllProducts;
    const dispatch = useDispatch()
    const isLogin = useSelector(isLoginSelector)
    const router = useRouter()
    const productId = Number(router?.query.id);
    const [prevImg, setPrevImg] = useState()
    const quantity = 1;
    const [color, setColor] = useState('red')
    const [size, setSize] = useState('L')

    const newArrivalsData = newArrivals.slice(0, 4)

    const cartData = useSelector(cartDataSelector)
    const wishlistData = useSelector(wishlistSelector)

    // Check if the product is already in the wishlist
    const isInWishlist = wishlistData.find(item => item.id === productId);

    // Check if the product is already in the cart
    const isInCart = cartData.find(item => item.id === productId);

    const addToCart = (e) => {
        e.stopPropagation()
        if (isLogin) {
            if (isInCart) {
                toast.error('Item already in Cart');
            }
            else {

                const product = {
                    ...allProductsData[productId],
                    quantity,
                    size,
                    color,
                }
                dispatch(setCartData({ data: product }))
                toast.success('Item Added To Cart')
            }
        }
        else {
            toast.error('Please Login First')
        }
    }
    const addToWishlist = (e) => {
        e.stopPropagation()
        if (isLogin) {
            if (isInWishlist) {
                toast.error('Item already in Wishlist');
            }
            else {

                const product = {
                    ...allProductsData[productId],
                    quantity,
                    size,
                    color,
                }
                dispatch(setWishlistData({ data: product }))
                toast.success('Succesfully Added To Wishlist')
            }
        }
        else {
            toast.error('Please Login First')
        }
    }

    useEffect(() => {
    }, [prevImg, productId])
    useEffect(() => {
        setPrevImg(allProductsData && allProductsData[productId]?.img)
    }, [productId])


    return (
        <>
            <section className='productDetailPage container commonMT'>
                <div className="row">
                    <div className="col-12 col-xl-5">
                        <div className="imgsWrapper">
                            <div className="prevImg">
                                <img src={prevImg?.src} height={0} width={0} alt='mainImg' />
                            </div>
                            <div className="otherImgs">
                                <img src={allProductsData[productId]?.img1.src} onClick={() => setPrevImg(allProductsData[productId]?.img1)} height={100} width={100} alt='othermgI' />
                                <img src={allProductsData[productId]?.img2.src} onClick={() => setPrevImg(allProductsData[productId]?.img2)} height={100} width={100} alt='othermgI' />
                                <img src={allProductsData[productId]?.img3.src} onClick={() => setPrevImg(allProductsData[productId]?.img3)} height={100} width={100} alt='othermgI' />
                                <img src={allProductsData[productId]?.img.src} onClick={() => setPrevImg(allProductsData[productId]?.img)} height={100} width={100} alt='othermgI' />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-7">
                        <div className="detailsWrapper">
                            <div className="upperDiv">
                                <div>
                                    <span className='itemTitle'>{allProductsData[productId]?.title}</span>
                                </div>
                                <div>
                                    <div className="ratingWrapper">
                                        <div className="starsWrapper">
                                            <span><FaStar /></span>
                                            <span><FaStar /></span>
                                            <span><FaStar /></span>
                                            <span><FaStar /></span>
                                            <span><FaStar /></span>
                                            <span className='ms-2'> (150review)</span>
                                        </div>
                                        <div className='stock'>
                                            <span>In Stock</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center gap-2'>
                                        <span className='price'>₹{allProductsData[productId]?.offerPrice}</span>
                                        <span className='cutPrice'>{allProductsData[productId]?.price}</span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita sapiente earum, autem iure sit excepturi quas quod dignissimos impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                </div>
                            </div>
                            <div className="middleDiv">
                                <div className='colorsWrapper d-flex align-items-center gap-3'>
                                    <span className='labelSpan'>Colors : </span>
                                    <span className={`bg-danger color ${color === 'red' ? 'selectedColor' : ''}`} onClick={() => setColor('red')}></span>
                                    <span className={`bg-primary color ${color === 'blue' ? 'selectedColor' : ''}`} onClick={() => setColor('blue')}></span>

                                </div>
                                <div className="sizeWrapper d-flex align-items-center gap-3">
                                    <span className='labelSpan'>Size : </span>
                                    <span className={`size ${size === 'S' ? 'selectedSize' : ''}`} onClick={() => setSize('S')}>S</span>
                                    <span className={`size ${size === 'M' ? 'selectedSize' : ''}`} onClick={() => setSize('M')}>M</span>
                                    <span className={`size ${size === 'L' ? 'selectedSize' : ''}`} onClick={() => setSize('L')}>L</span>
                                    <span className={`size ${size === 'XL' ? 'selectedSize' : ''}`} onClick={() => setSize('XL')}>Xl</span>
                                </div>
                                <div className='btnWrapper'>
                                    <button className='btn btn-primary' onClick={addToWishlist}>Add To Wishlist</button>
                                    <button className='btn btn-danger' onClick={addToCart}>Add To Cart</button>
                                </div>
                            </div>
                            <div className="bottomDiv">
                                <div className="innerDiv d-flex align-items-center gap-4">
                                    <span><TbTruckDelivery size={34} /></span>
                                    <div className='d-flex gap-2 flex-column'>
                                        <span>Free Delivery</span>
                                        <span>Enter your pin-code for Delivery Availability</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="innerDiv d-flex align-items-center gap-4">
                                    <span><FaArrowsRotate size={30} /></span>
                                    <div className='d-flex gap-2 flex-column'>
                                        <span>Return Delivery</span>
                                        <span>Free 30 Days Delivery Returns</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CommonCardSections title="New Arrivals" products={newArrivalsData} />
        </>

    )
}

export default index
