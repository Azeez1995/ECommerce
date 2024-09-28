import React from 'react'

import Breadcrum from './Partials/Breadcrum'
import BuyerProfile from './Partials/BuyerProfile'
import CartSection from './Partials/CartSection'
export default function Checkout() {
  return (
    <>
      <Breadcrum title="Checkout Section" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-6">
            <BuyerProfile title="Checkout" />
          </div>
          <div className="col-md-6">
            <CartSection title="Checkout" />
          </div>
        </div>
      </div>
    </>
  )
}
