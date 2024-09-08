import Image from 'next/image'
import React from 'react'
import heroImg from '../Assets/images/superDeal.jpg'
import 'animate.css';
import Link from 'next/link';

const SuperDealSect = () => {
    return (
        <section className='superDealSect container commonMT'>
            <div className="superDealImg" style={{
                backgroundImage: `url(${heroImg.src})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>
                <div>
                    <Link href={'#newArrivalsSect'}>
                        <button className='crazydealbtn animate__animated animate__tada'>Shop Now</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default SuperDealSect
