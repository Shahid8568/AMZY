import ProfileBreadcrumb from '@/Components/ProfileBreadcrumb'
import React, { useEffect, useState } from 'react'
import productImg from '../../../Assets/images/product_img7.jpg'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { cartDataSelector, removeWishListiItem, setCartData, setWishlistData, wishlistSelector } from '@/store/slices/UserProducts'
import { isLoginSelector } from '@/store/slices/authSlice'
import toast from 'react-hot-toast'

const Wishlist = () => {

  const wishlistData = useSelector(wishlistSelector);

  const isLogin = useSelector(isLoginSelector)
  const dispatch = useDispatch()

  const quantity = 1;


  // console.log('wishlistData =>',wishlistData)

  const addToCart = (product) => {
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

  const handleRemoveItem = (id) => {
    dispatch(removeWishListiItem({ id: id }))
    toast.success('Product removed from wishlist');
  }

  useEffect(() => {

  }, [wishlistData])


  return (
    <div>
      <div className="row wishlistRow">
        <ProfileBreadcrumb title={'Wishlist'} />
        {
          wishlistData?.map((data) => {
            return <>
              <div className="col-12 col-lg-6">
                <div className="leftDivWrapper card">
                  <div>
                    <img src={data?.img?.src} alt="productImg" />
                  </div>
                  <div className="productDetailsWrapper">
                    <div><span className='productName'>{data?.title}</span></div>
                    <div className='priceWrapper'>
                      <div>
                        <span className='offerPrice'>{data.offerPrice ? `₹${data?.offerPrice}` : ''}<span className='price'>{data.price ? `₹${data?.price}` : ''}</span></span>
                      </div>
                      <div><span className='discount'>20% Off</span></div>
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
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 rightDivWrapper">
                <div className="btns d-flex gap-3">
                  <button className='btn btn-primary' onClick={(e) => addToCart(data)}>Add To Cart</button>
                  <button className='btn btn-danger' onClick={(e) => handleRemoveItem(data?.id)}>Remove</button>
                </div>
              </div>
            </>
          })
        }

      </div>
    </div>
  )
}

export default Wishlist