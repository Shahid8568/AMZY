import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { IoIosMail } from "react-icons/io";
import {  FaLocationDot } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import Image from 'next/image';
import appStoreImg from '../../Assets/images/appStore.png'
import paymentsGatewaysImg from '../../Assets/images/payment_icons.webp'

const Footer = () => {
  return (
    <footer className='commonMT'>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-4 col-lg-4">
            <div className="leftDiv">
              <div className="title">
                <span>AMZY</span>
              </div>
              <div className="contactDetails">
                <div>
                  <span className='contactIcons'><FaPhoneAlt /></span>
                  <span> +012-345-6789</span>
                </div>
                <div>
                  <span className='contactIcons'><FaPhoneAlt /></span>
                  <span> +012-367-8945</span>
                </div>
                <div>
                  <span className='contactIcons1 contactIcons'><IoIosMail /></span>
                  <span>amzy@gmail.com</span>
                </div>
                <div>
                  <span className='contactIcons2 contactIcons'><FaLocationDot /></span>
                  <span>Bhuj,India - 3700001</span>
                </div>
              </div>
            </div>
            {/* <div className="socialsIcons">
              <span>Follow Us</span>
            </div> */}
          </div>

          <div className="col-sm-6 col-md-4 col-lg-4">
            <div className="centerDiv">
              <div className="title">
                <span>Quick Links</span>
              </div>

              <div className="contactDetails">
                <div>
                  <span className='contactIcons'><FaArrowRight /></span>
                  <span>View Cart</span>
                </div>
                <div>
                  <span className='contactIcons'><FaArrowRight /></span>
                  <span>Your Wishlist</span>
                </div>
                <div>
                  <span className='contactIcons'><FaArrowRight /></span>
                  <span>Your Orders</span>
                </div>
                <div>
                  <span className='contactIcons'><FaArrowRight /></span>
                  <span>Your Profile</span>
                </div>
              </div>

            </div>

          </div>

          <div className="col-sm-6 col-md-4 col-lg-4">
            <div className="rightDiv">
              <div className="title">
                Install App
              </div>

              <div className="wrapper">
                <span>From App Store or Google Play</span>
                <Image src={appStoreImg} height={0} width={0} alt='appStoreImg' className='appStoreImg' />
              </div>

              <div className="wrapper">
                <span>Payment Methods</span>
                <Image src={paymentsGatewaysImg} height={0} width={0} alt='appStoreImg' className='paymentGatewaysImg' />
              </div>

            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
