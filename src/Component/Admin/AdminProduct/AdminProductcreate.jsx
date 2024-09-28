import React, { useEffect, useState ,useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

// import Breadcrum from "../../Partials/Breadcrum"
import Sidebar from '../Sidebar'

import formValidator from "../../FormValidator/FormValidator"
import imageValidator from "../../FormValidator/imageValidator"

import { createProduct } from "../../../Redux/Actioncreators/ProductActionCreators"
import { getMaincategory } from "../../../Redux/Actioncreators/MaincategoryActionCreators"
import { getSubcategory } from "../../../Redux/Actioncreators/SubcategoryActionCreators "
import { getBrand } from "../../../Redux/Actioncreators/BrandActionCreators "

var rte
export default function AdminCreateProduct() {
    var refdiv = useRef(null)
    let [maincategory, setMaincategory] = useState([])
    let [subcategory, setSubcategory] = useState([])
    let [brand, setBrand] = useState([])

    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: "",
        size: "",
        basePrice: "",
        discount: "",
        finalPrice: "",
        stock: true,
        quantity: "",
        pic: [],
        active: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name is Mandatory",
        color: "product color is Mandatory",
        size: "product size is Mandatory",
        basePrice: "product Baseprice is Mandatory",
        discount: "product discount is Mandatory",
        quantity: "product quantity is Mandatory",
        pic: ["Pic is Mandatory"]
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let dispatch = useDispatch()
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)


    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files ? Array.from(e.target.files).map((item) => "/products/" + item?.name) : e.target.value
        if (name !== "active") {
            setErrorMessage((old) => {
                return {
                    ...old,
                    [name]: name === "pic" ? imageValidator(e) : formValidator(e)
                }
            })
        }
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" || name === "stock" ? (value === "1" ? true : false) : value
            }
        })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x !== "")
        if (error)
            setShow(true)
        else {
            let basePrice = parseInt(data.basePrice)
            let discount = parseInt(data.discount)
            let finalPrice = basePrice - (basePrice * discount / 100);
            dispatch(createProduct({
                ...data,
                maincategory: data.maincategory === "" ? maincategory[0].name : data.maincategory,
                subcategory: data.subcategory === "" ? subcategory[0].name : data.subcategory,
                brand: data.brand === "" ? brand[0].name : data.brand,
                basePrice: basePrice,
                discount: discount,
                finalPrice: finalPrice,
                quantity: parseInt(data.quantity),
                description: rte.getHTMLCode()


            }))
            navigate("/admin/products")
        }

    }

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
            if (MaincategoryStateData.length)
                setMaincategory(MaincategoryStateData.filter((x) => x.active === true))
        })()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
            if (SubcategoryStateData.length)
                setSubcategory(SubcategoryStateData.filter((x) => x.active === true))
        })()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getBrand())
            if (BrandStateData.length)
                setBrand(BrandStateData.filter((x) => x.active === true))
        })()
    }, [BrandStateData.length])

    useEffect(() => {
        rte = new window.RichTextEditor(refdiv.current);
        rte.setHTMLCode("");
    }, [])


    return (
        <>
            {/* <Breadcrum title="Admin"/> */}

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-xl-2 col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-xl-10 col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Product <Link to="/admin/products"><i className='fa fa-arrow-left text-light float-end'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name*</label>
                                <input type="text" name="name" onChange={getInputData} placeholder='Product Name' className={`form-control ${show && errorMessage.name ? "border-danger" : "border-primary"} border-2`} />
                                {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : ""}
                            </div>
                            <div className="row">
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <label>Maincategory*</label>
                                    <select name="maincategory" onChange={getInputData} className='form-control border-primary  border-2'>
                                        {
                                            maincategory.map((item, index) => {
                                                return <option key={index}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <label>Subcategory*</label>
                                    <select name="subcategory" onChange={getInputData} className='form-control border-primary  border-2'>
                                        {
                                            subcategory.map((item, index) => {
                                                return <option key={index}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div><div className="col-md-3 col-sm-6 mb-3">
                                    <label>Brand*</label>
                                    <select name="brand" onChange={getInputData} className='form-control border-primary  border-2'>
                                        {
                                            brand.map((item, index) => {
                                                return <option key={index}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-6 mb-3">
                                    <label>Stock*</label>
                                    <select name="stock" onChange={getInputData} className='form-control border-primary  border-2'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Color*</label>
                                    <input type="text" name="color" onChange={getInputData} placeholder='Product Color' className={`form-control ${show && errorMessage.color ? "border-danger" : "border-primary"} border-2`} />
                                    {show && errorMessage.color ? <p className='text-danger text-capitalize'>{errorMessage.color}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Size*</label>
                                    <input type="text" name="size" onChange={getInputData} placeholder='Product Size' className={`form-control ${show && errorMessage.size ? "border-danger" : "border-primary"} border-2`} />
                                    {show && errorMessage.size ? <p className='text-danger text-capitalize'>{errorMessage.size}</p> : ""}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Base Price*</label>
                                    <input type="number" name="basePrice" onChange={getInputData} placeholder='Product Base Price' className={`form-control ${show && errorMessage.basePrice ? "border-danger" : "border-primary"} border-2`} />
                                    {show && errorMessage.basePrice ? <p className='text-danger text-capitalize'>{errorMessage.basePrice}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Discount*</label>
                                    <input type="number" name="discount" onChange={getInputData} placeholder='Product Discount' className={`form-control ${show && errorMessage.discount ? "border-danger" : "border-primary"} border-2`} />
                                    {show && errorMessage.discount ? <p className='text-danger text-capitalize'>{errorMessage.discount}</p> : ""}
                                </div>
                                <div className="mb-3">
                                    <label>Description</label>
                                    <div ref={refdiv}></div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Product Stock Quantity*</label>
                                    <input type="number" name="quantity" onChange={getInputData} placeholder='Product Stock Quantity' className={`form-control ${show && errorMessage.quantity ? "border-danger" : "border-primary"} border-2`} />
                                    {show && errorMessage.quantity ? <p className='text-danger text-capitalize'>{errorMessage.quantity}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic*</label>
                                    <input type="file" name="pic" multiple onChange={getInputData} className={`form-control ${show && errorMessage.pic ? "border-danger" : "border-primary"} border-2`} />
                                    {show && errorMessage.pic ? errorMessage.pic.join("|").split("|").map((item, index) => {
                                        return <p className='text-danger text-capitalize' key={index}>{item}</p>
                                    }) : ""}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Active*</label>
                                    <select name="active" onChange={getInputData} className='form-control border-primary border-2'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
