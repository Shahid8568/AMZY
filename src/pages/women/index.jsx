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
            <CommonSwiper womenPage={true} link1="womenWear" link2="womenWatches" link3="womenShoes" />
            <CommonCardSections title={`Trending Women's Wear`} products={womensCloth} id="womenWear" />
            <CommonCardSections title={`Trending Watches`} products={womensWatches} id="womenWatches"/>
            <CommonCardSections title={`Trending Footwear`} products={womensShoes} id="womenShoes" />
            <CommonCardSections title={`New Arrivals`} products={newArrivals} newArrivals={true}/>
        </>
    )
}

export default Index
