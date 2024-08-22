import ProfileBreadcrumb from '@/Components/ProfileBreadcrumb'
import { couponsSelector } from '@/store/slices/UserProducts';
import { useState } from 'react'
import { useSelector } from 'react-redux';

const Coupons = () => {

  const [copiedCoupon, setCopiedCoupon] = useState(null);

  const coupons = useSelector(couponsSelector)

  const handleCopyCode = (couponCode) => {
    navigator.clipboard.writeText(couponCode).then(() => {
      setCopiedCoupon(couponCode);
      setTimeout(() => {
        setCopiedCoupon(null);
      }, 5000);
    });
  }

  return (
    <div>
      <div className="row wishlistRow">
        <ProfileBreadcrumb title={'My Coupons'} />
        <div className="row couponsContainer">
          {
            coupons?.map((data, index) => {
              return (
                <div className="col-12" key={data.id}>
                  <div className={`couponCard ${coupons?.length - 1 === index ? 'lastCard' : ''}`}>
                    <div className="leftDiv d-flex flex-column gap-3 justify-content-start align-items-start">
                      <span>Grab {data.discountOf}% off by using this coupon.</span>
                      <span>Copy the coupon code and save more on your purchase.</span>
                    </div>
                    <div className="rightDiv d-flex flex-column gap-3 justify-content-end align-items-end">
                      <span>Valid till 20 Sept, 2024</span>
                      <button
                        className='btn btn-primary'
                        onClick={() => handleCopyCode(data.couponCode)}
                      >
                        {copiedCoupon === data.couponCode ? "Code Copied. Enjoy Your Savings!" : 'Copy Coupon Code'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Coupons
