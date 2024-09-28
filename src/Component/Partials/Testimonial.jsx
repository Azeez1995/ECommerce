import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import { getTestimonial } from '../../Redux/Actioncreators/TestimonialActionCreators'
import { useDispatch, useSelector } from 'react-redux';

export default function Testimonial() {

    let [testimonial, setTestimonial] = useState([])
    let dispatch = useDispatch()
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let option = {
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        },
        dots: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        nav: true,
        navText: ['<button class="btn btn-primary" style="width:80px;border-radius:50px"><i class="fa fa-arrow-right"></i></button>', '<button class="btn btn-primary" style="width:80px;border-radius:50px"><i class="fa fa-arrow-left"></i></button>']
    }

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (TestimonialStateData.length)
                setTestimonial(TestimonialStateData)
        })()
    }, [TestimonialStateData.length])
    return (
        <>

            {/* <!-- Testimonial Start --> */}
            <div className="container-fluid testimonial pb-5">
                <div className="container pb-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
                        <h2 className="text-primary mt-5">Testimonial</h2>
                        <h1 className="display-4 mb-4">What Our Customers Are Saying</h1>
                        <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
                        </p>
                    </div>
                    <div className=" testimonial-carousel wow fadeInUp" data-wow-delay="0.2s">
                        <OwlCarousel className='owl-theme' {...option}>
                            {
                                testimonial.map((item, index) => {
                                    return <div className="testimonial-item bg-light rounded">
                                        <div className="row g-0">
                                            <div className="col-4  col-lg-4 col-xl-3">
                                                <div className="h-100">
                                                    <img src={item.pic} className="img-fluid h-100 rounded" style={{ objectFit: "cover" }} alt="" />
                                                </div>
                                            </div>
                                            <div className="col-8 col-lg-8 col-xl-9">
                                                <div className="d-flex flex-column my-auto text-start p-4">
                                                    <h4 className="text-dark mb-0">{item.name}</h4>
                                                    {/* <p className="mb-3">Profession</p> */}
                                                    <div className="d-flex text-primary mb-3">
                                                        <i className="fas fa-star mt-1"></i>
                                                        <i className="fas fa-star  mt-1"></i>
                                                        <i className="fas fa-star  mt-1"></i>
                                                        <i className="fas fa-star  mt-1"></i>
                                                        <i className="fas fa-star  mt-1"></i>
                                                    </div>
                                                    <p className="mb-0 testimonial-message">{item.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }

                        </OwlCarousel>
                    </div>
                </div>
            </div>
            {/* <!-- Testimonial End --> */}
        </>
    )
}
