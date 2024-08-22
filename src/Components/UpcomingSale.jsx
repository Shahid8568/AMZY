import React from 'react'
import topBrandsImg from '../Assets/images/topBrands.webp'
import upcomingSaleImg from '../Assets/images/upcomingSale.jpg'
import Link from 'next/link'
import Image from 'next/image'

const UpcomingSale = () => {
    return (
        <section className='upcomingSale commonMT container'>
            <div className="row">
                <div className="col-md-12 col-lg-6">
                    <div className="topBrands">
                        <Image src={topBrandsImg} height={0} width={0} className='dealsImg' alt='topBrandsImg' />

                        <div className="dealsDetailsWrapper">
                            <span className='title'>Explore Top Brands</span>
                            <span className='desc'>Upto 30-45% Off!</span>
                            <Link href={""}>
                                <span className='shopBtn'>Explore Now</span>
                            </Link>

                        </div>

                    </div>
                </div>

                <div className="col-md-12 col-lg-6">
                    <div className="westernDealsWrapper">
                        <Image src={upcomingSaleImg} height={0} width={0} className='dealsImg' alt='upcomingSaleImg'/>

                        <div className="dealsDetailsWrapper">
                            <span className='title'>Western Collection</span>
                            <span className='desc'>The Best Western And Classic Dress at AMZY</span>

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

export default UpcomingSale
