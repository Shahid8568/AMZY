import React from 'react'
import CommonCardSections from './CommonCardSections'
import HeroSect from './HeroSect'
import SeasonalSale from './SeasonalSale'
import BigDaysSales from './BigDaysSales'
import UpcomingSale from './UpcomingSale'
import featuredProducts from './commonProducts/featureproducts'
import newArrivals from './commonProducts/newArrivals'

const Home = () => {

  return (
    <div className='homePage'>

      <HeroSect />
      <CommonCardSections title="Feature Products" products={featuredProducts} />
      <SeasonalSale />
      <BigDaysSales />
      <UpcomingSale />
      <CommonCardSections title="New Arrivals" products={newArrivals} />


    </div>
  )
}

export default Home
