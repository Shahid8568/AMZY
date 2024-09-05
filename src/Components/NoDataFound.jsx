import React from 'react'
import noData from '../Assets/images/Data_Not_Found.svg'
import Image from 'next/image'

const NoDataFound = () => {
    return (
        <div className='d-flex gap-4 mb-3 flex-column align-items-center justify-content-center'>
            <Image src={noData} alt='noDataImg' height={0} width={0} className='noDataImg' />
            <h3>No Data Found</h3>
        </div>
    )
}

export default NoDataFound