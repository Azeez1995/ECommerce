import React from 'react'
import { Link } from 'react-router-dom'


export default function ProductsContainer({ title, data }) {
    return (
        <>
            {/* <!-- Service Start --> */}
            <div className="container-fluid service">
                <div className="container py-5">
                    {
                        title ?
                            <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
                                <h1 className="text-primary">{title}</h1>
                                <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
                                </p>
                            </div> : ""
                    }

                    <div className="row g-4 justify-content-centers">
                        {data?.map((item, index) => (
                            <div key={index} className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
                                <div className="service-item">
                                    <div className="service-img">
                                        <img src={item.pic[0]} style={{ height: 250 }} className="img-fluid rounded-top w-100" alt="Product Image" />
                                        <div className="service-icon p-3">
                                            {/* <i className="fa fa-users fa-2x"></i> */}
                                            {item.brand}
                                        </div>
                                    </div>
                                    <div className="service-content p-4">
                                        <div className="service-content-inner">
                                            <Link to={`/product/${item.id}`} className="d-inline-block h4 mb-4" style={{ height: 50 }}>{item.name}</Link>
                                            <p className="mb-4">{item.stock ? "In Stock" : "Out of Stock"}{item.stock ? `-(${item.quantity} Left in Stock)` : ""}</p>
                                            <p className="mb-4"><del>&#8377;{item.basePrice}</del>  &#8377;{item.finalPrice} <sup className='text-success'>{item.discount}% Off</sup></p>
                                            <Link className="btn btn-primary rounded-pill py-2 px-4 w-100" to={`/product/${item.id}`} >Add To Cart</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {
                            title ?
                                <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.2s">
                                    <Link className="btn btn-primary rounded-pill py-3 px-5" to="/shop">More Products</Link>
                                </div> : ""
                        }
                    </div>
                </div>
            </div>
            {/* <!-- Service End --> */}
        </>
    )
}
