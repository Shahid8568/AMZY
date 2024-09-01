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
            <CommonSwiper womenPage={false} link1="menWear" link2="menWatches" link3="menShoes"/>
            <CommonCardSections title={`Trending Men's Wear`} products={mensCloth} id="menWear"/>
            <CommonCardSections title={`Trending Watches`} products={mensWatches} id="menWatches"/>
            <CommonCardSections title={`Trending Footwear`} products={mensShoes} id="menShoes"/>
            <CommonCardSections title={`New Arrivals`} products={newArrivals} newArrivals={true} />
        </>
    )
}

export default Index
