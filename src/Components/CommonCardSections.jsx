import React from 'react'
import CommonCard from './CommonCard';

const CommonCardSections = ({ title, products, newArrivals }) => {

  return (
    <section className='featureProducts container commonMT'>

      <h1 className='commonHeadTag'>{title}</h1>
      <div className="row">
        {
          newArrivals ? products.slice(0, 4).map((e) => {
            return <div className="col-sm-6 col-md-6 col-lg-3" key={e.id}>
              <CommonCard product={e} title={e.title} id={e.id} brand={e.cName} img={e.img} price={e.price} offerPrice={e.offerPrice} about={e.about} />
            </div>
          }) :
            products.map((e) => {
              return <div className="col-sm-6 col-md-6 col-lg-3" key={e.id}>
                <CommonCard product={e} title={e.title} id={e.id} brand={e.cName} img={e.img} price={e.price} offerPrice={e.offerPrice} about={e.about} sectionTitle={title} />
              </div>
            })
        }

      </div>
    </section>
  )
}

export default CommonCardSections
