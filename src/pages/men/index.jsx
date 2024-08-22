import CommonCardSections from '@/Components/CommonCardSections'
import React from 'react'
import mensCloth from '@/Components/mens/mensCloth'
import mensShoes from '@/Components/mens/mensShoes'
import mensWatches from '@/Components/mens/mensWatches'
import newArrivals from '@/Components/commonProducts/newArrivals'
import CommonSwiper from '@/Components/CommonSwiper'

const Index = () => {
    return (
        <>
            <CommonSwiper />
            <CommonCardSections title={`Trending Men's Wear`} products={mensCloth} />
            <CommonCardSections title={`Trending Watches`} products={mensWatches} />
            <CommonCardSections title={`Trending Footwear`} products={mensShoes} />
            <CommonCardSections title={`New Arrivals`} products={newArrivals} newArrivals={true} />
        </>
    )
}

export default Index
