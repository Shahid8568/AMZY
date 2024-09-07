import ProfileBreadcrumb from '@/Components/ProfileBreadcrumb'
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { orderDataSelector, removeWishListiItem, setCartData, wishlistSelector } from '@/store/slices/UserProducts'
import { isLoginSelector } from '@/store/slices/authSlice'
import toast from 'react-hot-toast'
import { MdDeleteForever } from "react-icons/md";
import NoDataFound from '@/Components/NoDataFound'

const Wishlist = ({ ordersTab }) => {

  const wishlistData = useSelector(wishlistSelector);
  const ordersData = useSelector(orderDataSelector);

  const [data, setData] = useState([])

  const dispatch = useDispatch()

  const handleRemoveItem = (id) => {
    dispatch(removeWishListiItem({ id: id }))
    toast.success('Product removed from wishlist');
  }

  useEffect(() => {
    if (ordersTab) {
      setData(ordersData)
    }
    else {
      setData(wishlistData)
    }
  }, [data, wishlistData, ordersData])


  return (
    <div>
      <div className="row wishlistRow">
        <ProfileBreadcrumb title={ordersTab ? 'My Orders' : 'Wishlist'} />
        {
          data?.length > 0 ?
            data?.map((item, index) => {
              return <div className={`col-12 cardWrapper ${data?.length - 1 === index ? 'lastCard' : ''}`} key={index}>
                  <div className={`card`}>
                    <div>
                      <img src={item?.img?.src} alt="productImg" />
                    </div>
                    <div className="productDetailsWrapper">
                      <div><span className='productName'>{item?.title}</span></div>
                      <div className='priceWrapper flex-wrap'>
                        <div>
                          <span className='offerPrice'>{item.offerPrice ? `₹${item.offerPrice}` : ''}
                          </span>
                          {item.price &&
                            <span className='cutPrice ms-3'>
                              {`₹${item.price}`}
                            </span>
                          }

                        </div>
                        <div><span className='ms-2 discount'>20% Off</span></div>
                        {
                          ordersTab &&
                          <div className='ms-3 d-flex gap-4 mt-2 mt-md-0'>
                            {
                              item?.size &&
                              <span className='fw-bold'>Size : <span className='text-danger'>{item.size}</span></span>
                            }
                            {
                              item?.color &&
                              <span className='fw-bold'>Color : <span className='text-danger'>{item.color?.toUpperCase()}</span></span>
                            }
                          </div>
                        }
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
                  {
                    !ordersTab &&
                    <div className="removeIcon">
                      <span onClick={(e) => handleRemoveItem(item?.id)}><MdDeleteForever /></span>
                    </div>
                  }
                </div>

              
            })
            :
            <NoDataFound />
        }

      </div>
    </div>
  )
}

export default Wishlist
