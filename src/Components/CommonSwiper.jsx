import React, { useCallback, useRef } from 'react'
import { BiRightArrowAlt, BiLeftArrowAlt } from 'react-icons/bi';
import { LiaStarSolid } from 'react-icons/lia';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


// import required modules
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import menBanner1 from '../Assets/images/mensBanner1.jpg'
import menBanner2 from '../Assets/images/mensBanner2.jpg'
import menBanner3 from '../Assets/images/mensBanner3.jpg'

import womenBanner1 from '../Assets/images/womenBanner1.jpg'
import womenBanner2 from '../Assets/images/womenBanner2.jpg'
import womenBanner3 from '../Assets/images/womenBanner3.jpg'
import Link from 'next/link';

const CommonSwiper = ({ womenPage, link1, link2, link3 }) => {

    const swiperData = [
        {
            id: 0,
            img: womenPage ? womenBanner1 : menBanner1,
            title: womenPage ? "Women's Fashion" : "Men's Fashion",
            desc: "Discover top-notch fashion at Amzy",
            sideText: 'FASHION LIFE',
            link: link1,
        },
        {
            id: 1,
            img: womenPage ? womenBanner2 : menBanner2,
            title: "Enhance Your Wardrobe",
            desc: "Elevate every step with our stylish shoes.",
            sideText: 'Step Into Style',
            link: link2,
        },
        {
            id: 2,
            img: womenPage ? womenBanner3 : menBanner3,
            title: "Timepiece Excellence",
            desc: "Upgrade your style with our classy watch collection",
            sideText: 'Define Your Moments',
            link: link3,
        },

    ]


    const renderBullet = (index, className) => {
        return `<span class="${className}" style="
            outline: 1px solid #000;
            font-size: 20px;
            padding: 8px;
            border: 2px solid #fff;" id="renderBullets">
    </span>`;
    };

    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;

        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    return (
        <>
            <section className='commonSwiper'>
                <div>
                    <Swiper
                        ref={sliderRef}
                        slidesPerView={1}
                        loop={true}
                        spaceBetween={30}
                        freeMode={true}
                        autoplay={{ delay: 3000 }}
                        modules={[FreeMode, Pagination]}
                        pagination={{
                            clickable: true,
                            renderBullet: renderBullet
                        }}
                    >
                        {
                            swiperData.map((data, index) => {
                                return (
                                    <SwiperSlide key={data.id} >
                                        <div className={`swiperWrapper ${data.id === 0 ? 'clothCard' : data.id === 1 ? 'shoesCard' : 'watchCard'}`}>
                                            <div className="swiperImg">
                                                <Image src={data.img} height={0} width={0} alt='banner1' />
                                            </div>
                                            <div className="swiperData">
                                                <span className='title'>{data.title}</span>
                                                <span className='desc'>{data.desc}</span>
                                                <Link href={`#${data.link}`}>
                                                    <button className='swiperBtn'> Shop Now</button>
                                                </Link>
                                            </div>
                                            <span className='sideText'>{data.sideText}</span>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>

            </section>
        </>
    )
}

export default CommonSwiper
