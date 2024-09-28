import React from 'react'

import CartSection from './Partials/CartSection'
import Breadcrum from './Partials/Breadcrum'
export default function Cart() {
    return (
        <>
            <Breadcrum title="Cart Section" />
            <CartSection title="Cart" />
        </>
    )
}
