import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import { getBrand } from "../../Redux/Actioncreators/BrandActionCreators "
import { Link } from 'react-router-dom';

export default function BrandSlider() {
    let [brand, setBrand] = useState([])

    let dispatch = useDispatch()
    let BrandStateData = useSelector((state) => state.BrandStateData)

    let options = {
        responsive: {
            0: {
                items: 2.5
            },
            576: {
                items: 3.5
            },
            768: {
                items: 4.5
            },
            992: {
                items: 5.5
            },
            1200: {
                items: 6.5
            },
            1400: {
                items: 7.5
            }
        },
        dots: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        nav: true,
        navText: ['<button class="btn btn-primary" style="width:80px;border-radius:80px"><i class="fa fa-arrow-right"></i></button>', '<button class="btn btn-primary" style="width:80px;border-radius:80px"><i class="fa fa-arrow-left"></i></button>']
    }
    useEffect(() => {
        (() => {
            dispatch(getBrand())
            if (BrandStateData.length)
                setBrand(BrandStateData)
        })()
    }, [BrandStateData.length])
    return (
        <>
            <div className="container my-3">
                <h3 className='text-center p-2 text-primary'>Top Brands</h3>
                <OwlCarousel className='owl-theme' {...options}>
                    {
                        brand.map((item, index) => {
                            return <div className='card p-3 mx-3' key={index}>
                                <Link to={`/shop?br=${item.name}`}>
                                    <img src={item.pic} height={100} width={100} alt='Brand Logo' />
                                </Link>
                            </div>
                        })
                    }
                </OwlCarousel>
            </div>
        </>
    )
}
