import Image from 'next/image'
import React from 'react'
import crazyDealsImg from '../Assets/images/crazy-deals-bg.webp'
import winterDealsImg from '../Assets/images/winter-deals-bg.webp'
import Link from 'next/link'
const SeasonalSale = () => {
    return (
        <section className='seasonalSale container commonMT'>
            <div className="row">
                <div className="col-md-12 col-lg-6">
                    <div className="crazyDealsWrapper">
                        <Image src={crazyDealsImg} height={0} width={0} className='dealsImg' alt='crazyDealsImg'/>

                        <div className="dealsDetailsWrapper">
                            <span className='title'>Crazy Deals</span>
                            <span className='buyText'>Buy 1 Get 1 Free!</span>
                            <span className='desc'>Best Western collection sale at AMZY</span>

                            <Link href={""}>
                                <span className='shopBtn'>Shop Now</span>
                            </Link>

                        </div>

                    </div>
                </div>

                <div className="col-md-12 col-lg-6">
                    <div className="winterDealsWrapper">
                        <Image src={winterDealsImg} height={0} width={0} className='dealsImg' alt='winterDealsImg'/>

                        <div className="dealsDetailsWrapper">
                            <span className='title'>SEASONAL SALE</span>
                            <span className='buyText'>Buy 1 Get 2 Free!</span>
                            <span className='desc'>Winter Collection - 35% OFF</span>

                            <Link href={""}>
                                <span className='shopBtn'>View Collection</span>
                            </Link>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default SeasonalSale
