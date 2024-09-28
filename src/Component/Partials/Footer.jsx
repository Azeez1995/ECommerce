import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getNewsletter, createNewsletter } from "../../Redux/Actioncreators/NewsletterActionCreators"
import { useDispatch, useSelector } from 'react-redux'
export default function Footer() {
    let [email, setEmail] = useState("")
    let [message, setMessage] = useState("")

    let dispatch = useDispatch()
    let NewsletterStateData = useSelector((state) => state.NewsletterStateData)


    function postData(e) {
        e.preventDefault()
        let item = NewsletterStateData.find((x) => x.email === email)
        if (item)
            setMessage("Email Address is Already Registered With Us")
        else {
            dispatch(createNewsletter({ email: email, active: true }))
            setEmail("")
            setMessage("Thanks to subscribe our Newsletter Service")
        }

    }
    useEffect(() => {
        (() => {
            dispatch(getNewsletter())
        })()
    }, [NewsletterStateData])

    return (
        // <>     <!-- Footer Start -->
        <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-8">
                        <div className="mb-5">
                            <div className="row g-4">
                                <div className="col-md-6 col-lg-6 col-xl-5">
                                    <div className="footer-item">
                                        <Link to="/" className="p-0">
                                            <h3 className="text-white"><i className="fa fa-shopping-bag me-3"></i>Ecom</h3>
                                            {/* <!-- <img src="img/logo.png" alt="Logo"/> --> */}
                                        </Link>
                                        <p className="text-white mb-4">Dolor amet sit justo amet elitr clita ipsum elitr est.Lorem ipsum dolor sit amet, consectetur adipiscing...</p>
                                        <div className="footer-btn d-flex">
                                            <Link className="btn btn-md-square rounded-circle me-3" to="#" target='_blank' rel='noreferrer'><i className="fab fa-facebook-f"></i></Link>
                                            <Link className="btn btn-md-square rounded-circle me-3" to="#" target='_blank' rel='noreferrer'><i className="fab fa-twitter"></i></Link>
                                            <Link className="btn btn-md-square rounded-circle me-3" to="#" target='_blank' rel='noreferrer'><i className="fab fa-instagram"></i></Link>
                                            <Link className="btn btn-md-square rounded-circle me-0" to="#" target='_blank' rel='noreferrer'><i className="fab fa-linkedin-in"></i></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-6 col-xl-3">
                                    <div className="footer-item">
                                        <h4 className="text-white mb-4">Useful Links</h4>
                                        <Link className='text-light' to="/"><i className="fas fa-angle-right me-2"></i> Home</Link>
                                        <Link className='text-light' to="/about"><i className="fas fa-angle-right me-2"></i> About</Link>
                                        <Link className='text-light' to="/shop"><i className="fas fa-angle-right me-2"></i> Shop</Link>
                                        <Link className='text-light' to="/contact-us"><i className="fas fa-angle-right me-2"></i> Contact</Link>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-6 col-xl-3">
                                    <div className="footer-item">
                                        <h4 className="text-white mb-4">Quicks Links</h4>
                                        <Link className='text-light' to="#"><i className="fas fa-angle-right me-2"></i> Privacy Policy</Link>
                                        <Link className='text-light' to="#"><i className="fas fa-angle-right me-2"></i> Term & Conditions</Link>
                                        <Link className='text-light' to="#"><i className="fas fa-angle-right me-2"></i> Refund Policy</Link>
                                        <Link className='text-light' to="#"><i className="fas fa-angle-right me-2"></i> Return Policy</Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="pt-5" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                            <div className="row g-0">
                                <div className="col-12">
                                    <div className="row g-4">
                                        <div className="col-lg-6 col-xl-4">
                                            <div className="d-flex">
                                                <div className="btn-xl-square bg-primary text-white rounded p-3 me-2">
                                                    <i className="fas fa-map-marker-alt fa-2x"></i>
                                                </div>
                                                <div>
                                                    <h4 className="text-white">Address</h4>
                                                    <p className="mb-0 text-light" >C-280/14, Shaheen bagh, Thokr no 8</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-xl-4">
                                            <div className="d-flex">
                                                <div className="btn-xl-square bg-primary text-white rounded p-3 me-2">
                                                    <i className="fas fa-envelope fa-2x"></i>
                                                </div>
                                                <div>
                                                    <h4 className="text-white">Mail Us</h4>
                                                    <Link to="mailto: hamidazeez123@gmail.com" target='_blank' rel='noreferrer' className="mb-0 text-light">hamidazeez123@gmail.com</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-xl-4">
                                            <div className="d-flex">
                                                <div className="btn-xl-square bg-primary text-white rounded p-3 me-2">
                                                    <i className="fa fa-phone-alt fa-2x"></i>
                                                </div>
                                                <div>
                                                    <h4 className="text-white">Telephone</h4>
                                                    <Link to="tel:(+91) 8423878905" target='_blank' rel='noreferrer' className="mb-0 text-light">(+91) 8423878905 </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="footer-item">
                            <h4 className="text-white mb-4">Newsletter</h4>
                            <p className="text-white mb-3">Dolor amet sit justo amet elitr clita ipsum elitr est.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <p className="text-white mb-3">{message}</p>
                            <div className="position-relative rounded-pill mb-4">
                                <input className="form-control rounded-pill w-100 py-3 ps-4 pe-5" onChange={(e) => setEmail(e.target.value)} type="email" name='email' value={email} placeholder="Enter your email" />
                                <button type="button" onClick={postData} className="btn btn-primary rounded-pill position-absolute top-0 end-0 py-2 mt-2 me-2">Subscribe</button>
                            </div>

                            <div className="d-flex flex-shrink-0 mt-2" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                                <div className="footer-btn">
                                    <Link to="tel: 91 8423878905" target='_blank' rel='noreferrer' className=" mt-5 btn btn-lg-square rounded-circle position-relative wow tada" data-wow-delay=".9s">
                                        <i className="fa fa-phone-alt fa-2x"></i>
                                        <div className="position-absolute" style={{ top: "2px", right: "12px" }}>
                                            <span><i className="fa fa-comment-dots text-secondary"></i></span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="d-flex flex-column ms-3 flex-shrink-0 text-light mt-5">
                                    <span>Call to Our Experts</span>
                                    <Link to="tel:+91 8423878905"><span className="text-white">Free: +91 8423878905</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // /* <!-- Footer End --></> */ 
    )
}
