import Image from 'next/image'
import React from 'react'
import heroImg from '../Assets/images/home.jpg'
import 'animate.css';
import Link from 'next/link';

const HeroSect = () => {
    return (
        <section className='heroSect'>
            <div className="heroImg container" style={{
                backgroundImage: `url(${heroImg.src})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>
                <div className="herotextWrapper">
                    <span className=''>Super  </span>
                    <span className=''>Value Deals</span>
                </div>
                <div className="offerText">
                    <span className='animate__animated animate__rubberBand '>
                        Save more with coupons
                        & upto 25% off...!
                    </span>
                </div>
                <div>
                    <Link href={''}>
                        <button className='crazydealbtn animate__animated animate__tada'>Shop Now</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HeroSect
