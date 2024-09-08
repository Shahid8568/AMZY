import ProfileBreadcrumb from '@/Components/ProfileBreadcrumb'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { cartDataSelector, couponsSelector, removeCartItem, setOrderData, updateQuantity } from '@/store/slices/UserProducts'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router';
import logo from '../../../Assets/images/G-logo.png'
import NoDataFound from '@/Components/NoDataFound';
import { userProfile, userSelector } from '@/store/slices/authSlice';
import { Modal } from 'react-bootstrap';

const Cart = () => {

  const user = useSelector(userSelector)

  const router = useRouter();
  const cartData = useSelector(cartDataSelector)
  const coupons = useSelector(couponsSelector)
  const dispatch = useDispatch()

  const [couponCode, setCouponCode] = useState(null)
  const [appliedCoupon, setAppliedCoupon] = useState(null)

  const [payAmount, setPayAmount] = useState(null)

  const [userData, setUserData] = useState({
    pincode: user && user.userPincode,
    number: user && user.userNumber,
    state: user && user.userState,
    city: user && user.userCity,
    address: user && user.userAddress,
  })


  const data = user && userData.address && userData.city && userData.number && userData.pincode && userData.state;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemoveItem = (id) => {
    dispatch(removeCartItem({ id: id }))
    toast.success('Product removed from cartlist');
  }

  const clearCartData = (paid = false) => {
    dispatch(removeCartItem({ clearCart: true }))
    !paid ? toast.success('Cart cleared successfully') : ''
  }

  const handleQuantityChange = (id, change) => {
    dispatch(updateQuantity({ id: id, change: change }))
  }

  const parsePrice = (price) => {
    return parseFloat(price?.replace(/,/g, ''));
  }

  const formatWithCommas = (number) => {
    if (number) {
      return number.toLocaleString('en-IN');
    }
  }

  const calculateCartTotal = () => {
    if (appliedCoupon?.length > 0) {
      const total = cartData.reduce((total, item) => total + item.quantity * parsePrice(item.offerPrice), 0);
      const afterDiscount = appliedCoupon * total / 100;
      setPayAmount(afterDiscount)
      return formatWithCommas(afterDiscount);
    }
    else {
      const total = cartData.reduce((total, item) => total + item.quantity * parsePrice(item.offerPrice), 0);
      setPayAmount(total)
      return formatWithCommas(total);

    }
  }

  const handleCouponCode = (value) => {
    const appliedCouponCode = coupons.filter((data) => {
      return data.couponCode === value; // Add this comparison
    });

    if (appliedCouponCode.length > 0) {
      setAppliedCoupon(appliedCouponCode[0].discountOf)
      toast.success('Coupon applied successfully!');
    } else {
      toast.error('Invalid coupon code. Please try again.');
    }
  }


  useEffect(() => {
    // console.log('couponCode =>', couponCode)
  }, [couponCode])

  useEffect(() => {
    // console.log('payAmount =>', payAmount)
  }, [payAmount])

  useEffect(() => {
  }, [data])

  const fullAddress = `${userData.address}, ${userData.city}, ${userData.state}, ${userData.pincode}`;




  const handlePayment = () => {
    if (!data) {
      handleShow()
    }
    else {
      const options = {
        key: process.env.NEXT_PUBLIC_KEY,
        amount: payAmount * 100,
        currency: 'INR',
        name: 'AMZY',
        description: 'Test Transaction',
        image: logo.src,
        handler: function (response) {
          toast.success('Order Placed Successfully!');
          dispatch(setOrderData({ data: cartData }));
          router.push('/')
          clearCartData(true);
          // console.log(response.razorpay_payment_id);
          // console.log(response.razorpay_order_id);
          // console.log(response.razorpay_signature);
        },
        prefill: {
          name: user && user?.userName,
          email: user && user?.userEmail,
          contact: user && user?.userNumber,
        },
        notes: {
          address: fullAddress,
        },
        theme: {
          color: '#3399cc',
        },
        method: {
          upi: true,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    }
  };

  useEffect(() => {
    calculateCartTotal();
  }, [cartData, appliedCoupon]);


  const handleAddress = () => {

    if (data) {
      dispatch(userProfile({ address: userData.address, number: userData.number, userState: userData.state, pincode: userData.pincode, city: userData.city }))
      toast.success('Address Added!')
      handleClose()
      setTimeout(() => {
        handlePayment()
      }, 1000);
    }
    else {
      toast.error('Please Add Address First!')
    }

  }

  const handlePincodeChange = (e) => {
    const pincode = e.target.value;
    if (pincode.length <= 6) {
      setUserData({ ...userData, pincode });
    }
  };

  const handleNumberChange = (e) => {
    const number = e.target.value;
    if (number.length <= 10) {
      setUserData({ ...userData, number });
    }
  };

  return (
    <>
      <div className="row">
        <ProfileBreadcrumb title={'Cart'} />
        {
          cartData?.length > 0 ?
            <div>
              <div className="col-12" id='cart'>
                <table width="100%">
                  <thead>
                    <tr>
                      <td>Image</td>
                      <td>Product</td>
                      <td>Price</td>
                      <td>Quantity</td>
                      <td>SubTotal</td>
                      <td>Remove</td>
                    </tr>
                  </thead>
                  {
                    cartData?.map((data, index) => (
                      <tbody key={data?.id}>
                        <tr>
                          <td><Image src={data?.img} height={0} width={0} alt="productImg" /></td>
                          <td>{data?.title}</td>
                          <td id='price'>₹{data?.offerPrice}</td>
                          <td>
                            <button
                              className="btn btn-qty"
                              onClick={() => handleQuantityChange(index, -1)}
                            >-</button>
                            <input
                              type="number"
                              id='qty'
                              value={data?.quantity ? data?.quantity : 1}
                            />
                            <button
                              className="btn btn-qty"
                              onClick={() => handleQuantityChange(index, 1)}
                            >+</button>
                          </td>
                          {/* <td>₹{data?.quantity * data?.offerPrice}</td> */}
                          <td>₹{formatWithCommas(data?.quantity * parsePrice(data?.offerPrice))}</td>
                          <td onClick={() => handleRemoveItem(data?.id)}>
                            <MdDeleteForever />
                          </td>
                        </tr>
                      </tbody>
                    ))
                  }
                </table>
              </div>
              <div className="col-12">
                <button className="btn btn-danger d-block mt-4 mb-5 mx-auto"
                  onClick={clearCartData}
                >Clear Cart</button>
              </div>
              <div className="col-12">
                <div className="row" id="cart-tot">
                  <div className="col-12 col-lg-6">
                    <div id="coupon">
                      <h3>Apply Coupon</h3>
                      <div className='d-flex flex-wrap'>
                        <input type="text" value={couponCode} placeholder="Enter your Coupon" onChange={(e) => setCouponCode(e.target.value)} />
                        <button className='btn btn-warning couponbtn' onClick={() => handleCouponCode(couponCode)}>{appliedCoupon?.length > 0 ? 'Applied' : 'Apply'}</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div id="subtot">
                      <h3>Cart Totals</h3>
                      <table>
                        <tbody>
                          <tr>
                            <td>Cart-Total</td>
                            <td>₹{formatWithCommas(payAmount)}</td>
                          </tr>
                          <tr>
                            <td>Shipping</td>
                            <td>Free</td>
                          </tr>
                          <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>₹{formatWithCommas(payAmount)}</strong></td>
                          </tr>
                        </tbody>
                      </table>
                      <button className='btn btn-primary' onClick={handlePayment}>Proceed to Buy</button>

                      <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Please Enter Your Address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="row addressForm">

                            <div className="col-6">
                              <input type="number" className='addressInput' value={userData.pincode} max={6} placeholder='Pincode' maxLength={6} onChange={handlePincodeChange} />
                            </div>

                            <div className="col-6">
                              <input type="number" className='addressInput' value={userData.number} placeholder='Number' maxLength={10} onChange={handleNumberChange} />
                            </div>

                            <div className="col-6">
                              <input type="text" className='addressInput' value={userData.city} placeholder='City' onChange={(e) => setUserData({ ...userData, city: e.target.value })} />
                            </div>

                            <div className="col-6">
                              <input type="text" className='addressInput' value={userData.state} placeholder='State' onChange={(e) => setUserData({ ...userData, state: e.target.value })} />
                            </div>

                            <div className="col-12">
                              <textarea type="text" className='addressInput' value={userData.address} placeholder='Address' onChange={(e) => setUserData({ ...userData, address: e.target.value })} />
                            </div>

                          </div>
                          <div className='d-flex justify-content-end mt-3'>
                            <button className='btn btn-danger fw-bold' onClick={handleAddress}>Submit</button>
                          </div>
                        </Modal.Body>
                      </Modal>

                    </div>
                  </div>
                </div>
              </div>

            </div> :
            <NoDataFound />
        }

      </div>
    </>
  )
}

export default Cart
