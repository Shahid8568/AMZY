import React from 'react'
import CommonCardSections from './CommonCardSections'
import SuperDealSect from './SuperDealSect'
import SeasonalSale from './SeasonalSale'
import UpcomingSale from './UpcomingSale'
import featuredProducts from './commonProducts/featureproducts'
import newArrivals from './commonProducts/newArrivals'
import HeroSect from './HeroSect'
import BrandsSect from './BrandsSect'
import GoTopBtn from './GoTopBtn'

const Home = () => {

  return (
    <div className='homePage'>

      <HeroSect />
      <BrandsSect/>
      <CommonCardSections title="Feature Products" products={featuredProducts} />
      <SeasonalSale />
      <SuperDealSect />
      {/* <BigDaysSales /> */}
      <UpcomingSale />
      <CommonCardSections title="New Arrivals" products={newArrivals} />
      {/* <GoTopBtn/> */}


    </div>
  )
}

export default Home
