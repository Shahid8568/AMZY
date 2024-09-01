import ProfileBreadcrumb from '@/Components/ProfileBreadcrumb'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { cartDataSelector, couponsSelector, removeCartItem, setOrderData, updateQuantity } from '@/store/slices/UserProducts'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router';

const Cart = () => {

  const router = useRouter();
  const cartData = useSelector(cartDataSelector)
  const coupons = useSelector(couponsSelector)
  const dispatch = useDispatch()

  const [couponCode, setCouponCode] = useState(null)
  const [appliedCoupon, setAppliedCoupon] = useState(null)

  const [payAmount, setPayAmount] = useState(null)

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
    return parseFloat(price.replace(/,/g, ''));
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

    console.log('appliedCoupon =>', appliedCoupon);
  }


  useEffect(() => {
    // console.log('couponCode =>', couponCode)
  }, [couponCode])

  useEffect(() => {
    // console.log('payAmount =>', payAmount)
  }, [payAmount])


  const handlePayment = (e) => {
    e.preventDefault()
    console.log('amount =>', payAmount)

    const options = {
      key: process.env.NEXT_PUBLIC_KEY, // Replace with your Razorpay key ID
      amount: payAmount * 100, // Amount is in the smallest currency unit (e.g., 50000 paise = INR 500)
      currency: 'INR',
      name: 'AMZY',
      description: 'Test Transaction',
      image: '../../../Assets/images/amzyLogo.png', // Replace with your logo URL
      handler: function (response) {
        toast.success('Order Placed Successfully!');
        dispatch(setOrderData({ data: cartData }));
        router.push('/')
        clearCartData(true);
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
      },
      prefill: {
        name: 'Your Name',
        email: 'email@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Your Address',
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
  };

  useEffect(() => {
    calculateCartTotal();
  }, [cartData, appliedCoupon]);


  return (
    <>
      <div className="row">
        <ProfileBreadcrumb title={'Cart'} />
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
          <button className="btn btn-danger" style={{ display: "block", margin: "auto", marginTop: "2%", marginBottom: '6%' }}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
