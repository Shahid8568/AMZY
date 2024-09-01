import React from 'react'
import Image from 'next/image'
import heroImg from '../Assets/images/heroImg.png'

const HeroSect = () => {
    return (
        <section className='heroSect'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 textWrapper">
                        <div>

                        </div>
                        <h1>Find Clothes That Matches Your Style</h1>
                        <p>
                            Explore our exclusive collection of sneakers,
                            thoughtfully designed to highlight your unique
                            style and elevate your footwear game.
                        </p>
                        <button>
                            Shop Now
                        </button>

                        <div className='infoWrapper'>
                            <div>
                                <span>100+</span>
                                <span>Brands</span>
                            </div>
                            <div>
                                <span>200+</span>
                                <span>High Quality Products</span>
                            </div>
                            <div>
                                <span>500+</span>
                                <span>Happy Customers</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 d-flex align-items-end justify-content-end">
                        <Image src={heroImg} height={0} width={0} alt='heroImg' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSect
