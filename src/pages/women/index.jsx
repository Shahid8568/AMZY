import CommonCardSections from '@/Components/CommonCardSections'
import React from 'react'
import CommonSwiper from '@/Components/CommonSwiper'
import womensCloth from '@/Components/womens/WomensCloth'
import womensWatches from '@/Components/womens/womensWatches'
import womensShoes from '@/Components/womens/WomensShoes'
import newArrivals from '@/Components/commonProducts/newArrivals'

const Index = () => {
    return (
        <>
            <CommonSwiper />
            <CommonCardSections title={`Trending Women's Wear`} products={womensCloth} />
            <CommonCardSections title={`Trending Watches`} products={womensWatches} />
            <CommonCardSections title={`Trending Footwear`} products={womensShoes} />
            <CommonCardSections title={`New Arrivals`} products={newArrivals} newArrivals={true}/>
        </>
    )
}

export default Index
