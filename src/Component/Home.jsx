import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Testimonial from './Partials/Testimonial'
import Faqs from './Partials/Faqs'
import ProductsContainer from './Partials/ProductsContainer'
import AboutContent from './Partials/AboutContent'
import Features from './Partials/Features'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import { getProduct } from '../Redux/Actioncreators/ProductActionCreators'
import { getMaincategory } from '../Redux/Actioncreators/MaincategoryActionCreators'
import { useDispatch, useSelector } from 'react-redux'
import BrandSlider from './Partials/BrandSlider'


export default function Home() {

    let [products, setProducts] = useState([])
    let [maincategory, setMaincategory] = useState([])

    let option = {
        items: 1,
        dots: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000
    }

    let dispatch = useDispatch()
    let ProductStateData = useSelector(state => state.ProductStateData)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length)
                setProducts(ProductStateData)
        })()
    }, [ProductStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
            if (MaincategoryStateData.length)
                setMaincategory(MaincategoryStateData)
        })()
    }, [MaincategoryStateData.length])

    return (
        <>
            {/* <!-- Carousel Start --> */}

            <div className="header-carousel">
                <OwlCarousel className='owl-theme' {...option}>
                    <div className="header-carousel-item bg-primary">
                        <div className="carousel-caption">
                            <div className="container">
                                <div className="row g-4 align-items-center">
                                    <div className="col-lg-7 animated fadeInLeft">
                                        <div className="text-sm-center text-md-start">
                                            <h4 className="text-white text-uppercase fw-bold mb-4">Welcome To Ecom</h4>
                                            <h1 className="display-1 text-white mb-4 fs-1">Latest and Top Brands Product for Men</h1>
                                            <p className="mb-5 fs-5">Shop top men’s brands: trendy clothing, footwear, accessories, and grooming essentials. Quality, style, and comfort for every occasion!</p>
                                            <div className="d-flex justify-content-center justify-content-md-start flex-shrink-0 mb-4">
                                                <Link className="btn btn-dark rounded-pill py-3 px-4 px-md-5 ms-2" to="/shop?mc=Male">Shop Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 animated fadeInRight">
                                        <div className="calrousel-img" style={{ objectFit: "cover" }}>
                                            <img src="img/carousel-2.png" className="img-fluid w-100" alt="Carousel Image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-carousel-item bg-primary">
                        <div className="carousel-caption">
                            <div className="container">
                                <div className="row g-4 align-items-center">
                                    <div className="col-lg-7 animated fadeInLeft">
                                        <div className="text-sm-center text-md-start">
                                            <h4 className="text-white text-uppercase fw-bold mb-4">Welcome To Ecom</h4>
                                            <h1 className="display-1 text-white mb-4 fs-1">Latest and Top Brands Product for Female</h1>
                                            <p className="mb-5 fs-5">Explore top women’s brands: stylish clothing, accessories, and beauty essentials. Quality, comfort, and elegance for every occasion, guaranteed!</p>
                                            <div className="d-flex justify-content-center justify-content-md-start flex-shrink-0 mb-4">
                                                <Link className="btn btn-dark rounded-pill py-3 px-4 px-md-5 ms-2" to="/shop?mc=Kids">Shop Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 animated fadeInRight">
                                        <div className="calrousel-img" style={{ objectFit: "fill" }}>
                                            <img src="img/carousel-4.png" className="img-fluid w-100" alt="Carousel Image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-carousel-item bg-primary">
                        <div className="carousel-caption">
                            <div className="container">
                                <div className="row g-4 align-items-center">
                                    <div className="col-lg-7 animated fadeInLeft">
                                        <div className="text-sm-center text-md-start">
                                            <h4 className="text-white text-uppercase fw-bold mb-4">Welcome To Ecom</h4>
                                            <h1 className="display-1 text-white mb-4 fs-1">Latest and Top Brands Product for Kids</h1>
                                            <p className="mb-5 fs-5">Discover top kids' brands: trendy clothing, educational toys, and essentials. Quality, comfort, and style for your little ones, guaranteed!</p>
                                            <div className="d-flex justify-content-center justify-content-md-start flex-shrink-0 mb-4">
                                                <Link className="btn btn-dark rounded-pill py-3 px-4 px-md-5 ms-2" to="/shop?mc=Kids">Shop Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 animated fadeInRight">
                                        <div className="calrousel-img" style={{ objectFit: "fill" }}>
                                            <img src="img/carousel-3.png" className="img-fluid w-100" alt="Carousel Image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </OwlCarousel >
            </div>

            {/* <!-- Carousel End --> */}


            <ProductsContainer title="Latest Products" data={products.slice(0, 12)} />
            <BrandSlider />
            <Features />
            <AboutContent />

            {
                maincategory.map((item, index) => {
                    if (item.active)
                        return <ProductsContainer key={index} title={`${item.name} Products`} data={products.filter(x => x.maincategory === item.name).slice(0, 12)} />
                })
            }

            <Faqs />
            <Testimonial />
        </>
    )
}
