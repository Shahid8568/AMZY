'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AllProducts from '@/Components/allProducts/AllProducts'
import { useDispatch, useSelector } from 'react-redux'
import { isLoginSelector } from '@/store/slices/authSlice'
import { setCartData } from '@/store/slices/UserProducts'
import toast from 'react-hot-toast'
import CommonCardSections from '@/Components/CommonCardSections'
import newArrivals from '@/Components/commonProducts/newArrivals'

const index = () => {
    const [size, setSize] = useState('')
    const [quantity, setQuantity] = useState(1)
    const allProductsData = AllProducts;
    const dispatch = useDispatch()
    const isLogin = useSelector(isLoginSelector)
    const router = useRouter()
    const productId = Number(router?.query.id);

    const newArrivalsData = newArrivals.slice(0,4)

    const addToCart = (e) => {
        e.stopPropagation()
        if (isLogin) {
            const product = {
                ...allProductsData[productId],
                size,
                quantity,
            }
            dispatch(setCartData({ data: product }))
            toast.success('Successfully Added To Cart')
        }
        else {
            toast.error('Please Login First')
        }
    }

    return (
        <>
        <section className='productDetailPage container commonMT'>
            <div className="row">
                <div className="col-md-6 col-lg-5">
                    <div className="imgsWrapper">
                        <div className="prevImg">
                            <img src={allProductsData[productId]?.img.src} height={0} width={0} alt='mainImg' />
                        </div>
                        <div className="otherImgs">
                            <img src={allProductsData[productId]?.img1.src} onClick={() => setPrevImg(allProductsData[productId]?.img1)} height={100} width={100} alt='othermgI' />
                            <img src={allProductsData[productId]?.img2.src} onClick={() => setPrevImg(allProductsData[productId]?.img2)} height={100} width={100} alt='othermgI' />
                            <img src={allProductsData[productId]?.img3.src} onClick={() => setPrevImg(allProductsData[productId]?.img3)} height={100} width={100} alt='othermgI' />
                            <img src={allProductsData[productId]?.img.src} onClick={() => setPrevImg(allProductsData[productId]?.img)} height={100} width={100} alt='othermgI' />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-7">
                    <div className="detailsWrapper">
                        <div className='detailsDiv'>
                            <span className='heading'>Product Name :</span>
                            <span>{allProductsData[productId]?.title}</span>
                        </div>
                        <div className='detailsDiv'>
                            <span className='heading'>Price :</span>
                            <span>₹{allProductsData[productId]?.price}</span>
                        </div>
                        <div className="inputBox">
                            <select value={size} onChange={(e) => setSize(e.target.value)}>
                                <option value="">Select Size</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="xl">XL</option>
                                <option value="xxl">XXL</option>
                            </select>
                            <input type="number" placeholder='Quantity' value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                        </div>
                        <div className='btnWrapper'>
                            <button className='btn btn-danger' onClick={addToCart}>Add To Cart</button>
                        </div>
                        <div className="productDetailsWrapper">
                            <span className='heading'> Product Details : </span>
                            <span className='detailSpan'>Sleeve : <span>Short</span></span>
                            <span className='detailSpan'>Material : <span>100% Cotton</span></span>
                            <span className='detailSpan'>Brand Name : <span>{allProductsData[productId]?.cName}</span></span>
                            <span className='detailSpan'>Made In : <span>India</span></span>
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
