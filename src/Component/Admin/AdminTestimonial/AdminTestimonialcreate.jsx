import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

// import Breadcrum from "../../Partials/Breadcrum"
import Sidebar from '../Sidebar'

import formValidator from "../../FormValidator/FormValidator"
import imageValidator from "../../FormValidator/imageValidator"

import { getTestimonial, createTestimonial } from "../../../Redux/Actioncreators/TestimonialActionCreators"
export default function AdminCreateTestimonial() {
    let [allData, setAllData] = useState([])
    let [data, setData] = useState({
        name: "",
        pic: "",
        message: "",
        active: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name is Mandatory",
        pic: "Pic is Mandatory",
        message: "Message Field is Mandatory"
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let dispatch = useDispatch()
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)

    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files ? "/Testimonials/" + e.target.files[0].name : e.target.value
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
                [name]: name === "active" ? (value === "1" ? true : false) : value
            }
        })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x !== "")
        if (error)
            setShow(true)
        else {
            let item = allData.find((x) => x.name?.toLocaleLowerCase() === data.name.toLocaleLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'name': "Testimonial Name is Already Exist"
                    }
                })
            }
            else {
                dispatch(createTestimonial({ ...data }))
                navigate("/admin/testimonials")
            }
        }
    }
    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (TestimonialStateData.length)
                setAllData(TestimonialStateData)
            else
                setAllData([])
        })()
    }, [TestimonialStateData.length])
    return (
        <>
            {/* <Breadcrum title="Admin"/> */}

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-xl-2 col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-xl-10 col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Testimonial <Link to="/admin/testimonials"><i className='fa fa-arrow-left text-light float-end'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} placeholder='Testimonial Name' className={`form-control ${show && errorMessage.name ? "border-danger" : "border-primary"} border-2`} />
                                    {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic*</label>
                                    <input type="file" name="pic" onChange={getInputData} className={`form-control ${show && errorMessage.pic ? "border-danger" : "border-primary"} border-2`} />
                                    {show && errorMessage.pic ? <p className='text-danger text-capitalize'>{errorMessage.pic}</p> : ""}
                                </div>
                                <div className="md-3">
                                    <label>Message*</label>
                                    <textarea name="message" onChange={getInputData} className={`form-control ${show && errorMessage.message ? "border-danger" : "border-primary"} border-2`} placeholder='Message...' rows={5}></textarea>
                                    {show && errorMessage.pic ? <p className='text-danger text-capitalize'>{errorMessage.message}</p> : ""}
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
