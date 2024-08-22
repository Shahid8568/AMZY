import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ratingImg from '../Assets/images/Rating.png'
import { FaCartPlus, FaEye, FaHeart, FaStar } from 'react-icons/fa'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux'
import { setWishlistData } from '@/store/slices/UserProducts'
import toast from 'react-hot-toast'
import { isLoginSelector } from '@/store/slices/authSlice'
import { setCartData } from '@/store/slices/UserProducts'


const CommonCard = ({ product, sectionTitle, brand, title, img, price, offerPrice, id, }) => {

    const isLogin = useSelector(isLoginSelector)
    const dispatch = useDispatch()

    const quantity = 1;

    const addToWishlist = (e) => {
        e.stopPropagation()
        // console.log(isLogin)
        if (isLogin) {
            dispatch(setWishlistData({ data: product }))
            toast.success('Succesfully Added To Wishlist')
        }
        else {
            toast.error('Please Login First')
        }
    }

    const addToCart = (e) => {
        e.stopPropagation()
        // console.log(isLogin)
        if (isLogin) {
            const productData = {
                ...product,
                quantity,
            }
            dispatch(setCartData({ data: productData }))
            toast.success('Succesfully Added To Cart')
        }
        else {
            toast.error('Please Login First')
        }
    }

    return (
        <Link href={`/product-detail/${id}`} >
            <div className='card'>
                <Image src={img} className={`${sectionTitle === 'Trending Footwear' ? 'shoesproduct' : 'productImg'} `} alt="productImg" height={0} width={0} />
                <div className="productDetails">
                    <h3 className='brandName'>{brand}</h3>
                    <span className='productName'>{title}</span>
                </div>

                <div className="priceWrapper">
                    <span className='offerPrice'>{offerPrice ? `₹${offerPrice}` : ''}
                        {
                            price &&
                        <span className='price'>{`₹${price}`}</span>
                        }
                    </span>
                    <span className='discount'>20% Off</span>
                </div>
                <div className="ratingWrapper">
                    <div className="starsWrapper">
                        <span><FaStar /></span>
                        <span><FaStar /></span>
                        <span><FaStar /></span>
                        <span><FaStar /></span>
                        <span><FaStar /></span>
                    </div>
                    <div className="reviewWrapper">
                        <span className="review">(70)</span>
                    </div>

                </div>
                <div className="iconsWrapper">
                    <span className='iconsViewBtn'><BsThreeDotsVertical /></span>

                    <div className="hoverIcons">
                        <span className='viewIcons'>
                            <Link href={`/product-detail/${id}`}>
                                <FaEye />
                            </Link>
                        </span>
                        <span className='viewIcons'>
                            <Link href={''}>
                                <FaHeart onClick={(e) => addToWishlist(e)} />
                            </Link>
                        </span>
                        <span className='viewIcons'>
                            <Link href={''}>
                                <FaCartPlus onClick={(e) => addToCart(e)} />
                            </Link>
                        </span>
                    </div>

                </div>

            </div>
        </Link>

    )
}

export default CommonCard