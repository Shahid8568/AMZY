import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { IoIosMail } from "react-icons/io";
import {  FaLocationDot } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import Image from 'next/image';
import appStoreImg from '../../Assets/images/appStore.png'
import paymentsGatewaysImg from '../../Assets/images/payment_icons.webp'
import Link from 'next/link';

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
                  <Link href={'tel:+0123456789'}> +012-345-6789</Link>
                </div>
                <div>
                  <span className='contactIcons'><FaPhoneAlt /></span>
                  <Link href={'tel:+0123456789'}> +012-367-8945</Link>
                </div>
                <div>
                  <span className='contactIcons1 contactIcons'><IoIosMail /></span>
                  <Link href={'mailto:amzy@gmail.com'}>amzy@gmail.com</Link>
                </div>
                <div>
                  <span className='contactIcons2 contactIcons'><FaLocationDot /></span>
                  <span>Bhuj,India ~ 370-001</span>
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
                <div className='d-flex gap-3'>
                  <span className='contactIcons'><FaArrowRight /></span>
                  <Link href={'/men'}>Men</Link>
                </div>
                <div className='d-flex gap-3'>
                  <span className='contactIcons'><FaArrowRight /></span>
                  <Link href={'women'}>Women</Link>
                </div>
                <div className='d-flex gap-3'>
                  <span className='contactIcons'><FaArrowRight /></span>
                  <Link href={''}>Cart</Link>
                </div>
                <div className='d-flex gap-3'>
                  <span className='contactIcons'><FaArrowRight /></span>
                  <Link href={'/profile'}>Profile</Link>
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