import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <>
            <div class="list-group">
                <Link to="/admin" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fa fa-home'></i><span className='float-end'>Home</span></Link>
                <Link to="/admin/maincategory" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fa fa-list'></i><span className='float-end'>Main Category</span></Link>
                <Link to="/admin/subcategory" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fa fa-list'></i><span className='float-end'>Sub Category</span></Link>
                <Link to="/admin/brand" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fa fa-list'></i><span className='float-end'>Brand</span></Link>
                <Link to="/admin/products" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fa fa-list'></i><span className='float-end'>Products</span></Link>
                <Link to="/admin/testimonials" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fa fa-star'></i><span className='float-end'>Testimonial</span></Link>
                <Link to="/admin/newsletter" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fa fa-envelope'></i><span className='float-end'>Newsletter</span></Link>
                <Link to="/admin/users" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fa fa-users'></i><span className='float-end'>Users</span></Link>
                <Link to="/admin/contactus" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fa fa-phone'></i><span className='float-end'>Contact Us</span></Link>
                <Link to="/admin/checkout" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='fa fa-shopping-bag'></i><span className='float-end'>Checkout</span></Link>
            </div>
        </>
    )
}
