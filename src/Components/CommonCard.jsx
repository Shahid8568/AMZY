import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ratingImg from '../Assets/images/Rating.png'
import { FaCartPlus, FaEye, FaHeart, FaStar } from 'react-icons/fa'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux'
import { cartDataSelector, setWishlistData, wishlistSelector } from '@/store/slices/UserProducts'
import toast from 'react-hot-toast'
import { isLoginSelector } from '@/store/slices/authSlice'
import { setCartData } from '@/store/slices/UserProducts'


const CommonCard = ({ product, sectionTitle, brand, title, img, price, offerPrice, id, }) => {

    const isLogin = useSelector(isLoginSelector)
    const cartData = useSelector(cartDataSelector)
    const wishlistData = useSelector(wishlistSelector)
    const dispatch = useDispatch()

    const quantity = 1;

     // Check if the product is already in the wishlist
     const isInWishlist = wishlistData.find(item => item.id === product.id);
    
     // Check if the product is already in the cart
     const isInCart = cartData.find(item => item.id === product.id);

    const addToWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLogin) {
            if (isInWishlist) {
                toast.error('Item already in Wishlist');
            } else {
                dispatch(setWishlistData({ data: product }));
                toast.success('Item Added To Wishlist');
            }
        }
        else {
            toast.error('Please Login First')
        }
    }

    const addToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLogin) {
            if (isInCart) {
                toast.error('Item already in Cart');
            } else {
                const productData = {
                    ...product,
                    quantity,
                };
                dispatch(setCartData({ data: productData }));
                toast.success('Item Added To Cart');
            }
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
                    <div className="priceWrapper row">
                        <div className="col-9 d-flex flex-column gap-2 align-items-start">
                            <div className='d-flex align-items-center gap-2'>
                                {price &&
                                    <span className='cutPrice'>
                                        {`₹${price}`}
                                    </span>
                                }
                                <span className='discount'>20% Off</span>
                            </div>
                            <div>
                                <span className='offerPrice'>{offerPrice ? `₹${offerPrice}` : ''}
                                </span>
                            </div>
                        </div>
                        <div className="col-3 d-flex align-items-end justify-content-end">
                            <button className='cartBtn' onClick={addToCart}><FaCartPlus /></button>
                        </div>
                    </div>
                </div>

                <div className="iconsWrapper" onClick={addToWishlist}>
                    
                    <span className='likeIcpn'>{isInWishlist?<FaHeart color='red'/>:<FaHeart />}</span>
                </div>

            </div>
        </Link>

    )
}

export default CommonCard