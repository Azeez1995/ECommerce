import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Partials/Navbar'
import Footer from './Partials/Footer'
import Home from './Home'
import About from './About'
import Shop from './Shop'
import Product from './Product'
import ContactUS from './ContactUs'
import Signup from './Signup'
import Login from './Login'
import Profile from './Profile'
import UpdateProfile from './UpdateProfile'
import Cart from './Cart'
import Checkout from './Checkout'
import Confirmation from './Confirmation'
import Error404 from './Error404'


import AdminHome from './Admin/AdminHome/AdminHome'

import AdminMaincategory from './Admin/AdminMaincategory/AdminMaincategory'
import AdminMaincategorycreate from './Admin/AdminMaincategory/AdminMaincategorycreate'
import AdminMaincategoryupdate from './Admin/AdminMaincategory/AdminMaincategoryupdate'

import AdminSubcategory from './Admin/AdminSubcategory/AdminSubcategory'
import AdminSubcategorycreate from './Admin/AdminSubcategory/AdminSubcategorycreate'
import AdminSubcategoryupdate from './Admin/AdminSubcategory/AdminSubcategoryupdate'

import AdminBrand from './Admin/AdminBrand/AdminBrand'
import AdminBrandcreate from './Admin/AdminBrand/AdminBrandcreate'
import AdminBrandupdate from './Admin/AdminBrand/AdminBrandupdate'

import AdminTestimonial from './Admin/AdminTestimonial/AdminTestimonial'
import AdminTestimonialcreate from './Admin/AdminTestimonial/AdminTestimonialcreate'
import AdminTestimonialupdate from './Admin/AdminTestimonial/AdminTestimonialupdate'

import AdminProduct from './Admin/AdminProduct/AdminProduct'
import AdminProductcreate from './Admin/AdminProduct/AdminProductcreate'
import AdminProductupdate from './Admin/AdminProduct/AdminProductupdate'

import AdminNewsletter from './Admin/AdminNewsletter/AdminNewsletter'
import AdminUsers from './Admin/AdminUsers/AdminUsers'

import AdminContactUs from './Admin/AdminContactUs/AdminContactUs'
import AdminContactUsShow from './Admin/AdminContactUs/AdminContactUsShow'

import AdminCheckout from './Admin/AdminCheckout/AdminCheckout'
import AdminCheckoutShow from './Admin/AdminCheckout/AdminCheckoutShow'


export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>

                {/* Public Routes */}
                <Route path='' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/product/:id' element={<Product />} />
                <Route path='/contactus' element={<ContactUS />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />

                {/* User Routes  */}
                {
                    localStorage.getItem("login") ?
                        <>
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/update-profile' element={<UpdateProfile />} />
                            <Route path='/cart' element={<Cart />} />
                            <Route path='/checkout' element={<Checkout />} />
                            <Route path='/confirmation' element={<Confirmation />} />
                        </> : ""
                }




                {/* Admin Routes */}
                {
                    localStorage.getItem("login") && localStorage.getItem("role") === "Admin" ?
                        <> <Route path='/admin' element={<AdminHome />} />

                            <Route path='/admin/maincategory' element={<AdminMaincategory />} />
                            <Route path='/admin/maincategory/create' element={<AdminMaincategorycreate />} />
                            <Route path='/admin/maincategory/update/:id' element={<AdminMaincategoryupdate />} />

                            <Route path='/admin/subcategory' element={<AdminSubcategory />} />
                            <Route path='/admin/subcategory/create' element={<AdminSubcategorycreate />} />
                            <Route path='/admin/subcategory/update/:id' element={<AdminSubcategoryupdate />} />

                            <Route path='/admin/brand' element={<AdminBrand />} />
                            <Route path='/admin/brand/create' element={<AdminBrandcreate />} />
                            <Route path='/admin/brand/update/:id' element={<AdminBrandupdate />} />

                            <Route path='/admin/testimonials' element={<AdminTestimonial />} />
                            <Route path='/admin/testimonials/create' element={<AdminTestimonialcreate />} />
                            <Route path='/admin/testimonials/update/:id' element={<AdminTestimonialupdate />} />

                            <Route path='/admin/products' element={<AdminProduct />} />
                            <Route path='/admin/products/create' element={<AdminProductcreate />} />
                            <Route path='/admin/products/update/:id' element={<AdminProductupdate />} />

                            <Route path='/admin/newsletter' element={<AdminNewsletter />} />
                            <Route path='/admin/users' element={<AdminUsers />} />

                            <Route path='/admin/contactus' element={<AdminContactUs />} />
                            <Route path='/admin/contactus/show/:id' element={<AdminContactUsShow />} />

                            <Route path='/admin/checkout' element={<AdminCheckout />} />
                            <Route path='/admin/checkout/show/:id' element={<AdminCheckoutShow />} />
                        </> : ""
                }


                <Route path='/*' element={<Error404 />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
