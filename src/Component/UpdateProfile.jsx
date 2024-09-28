import React, { useEffect, useState } from 'react'
import Breadcrum from "./Partials/Breadcrum"

import FormValidator from "./FormValidator/FormValidator"
import { useNavigate } from 'react-router-dom'
export default function UpodateProfile() {
    let [data, setData] = useState({
        name: "",
        phone: "",
        address: "",
        pin: "",
        city: "",
        state: "",
        pic: ""
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        phone: ""
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    function getInputData(e) {
        let name = e.target.name
        let value = e.target.files ? `/products/${e.target.files[0].name}` : e.target.value
        if (name === "name" || name === "phone") {
            setErrorMessage((old) => {
                return {
                    ...old,
                    [name]: FormValidator(e)
                }
            })
        }
        setData((old) => {
            return ({
                ...old,
                [name]: value
            })
        })
    }
    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let response = await fetch("/users/" + data.id, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ...data })
            })
            response = await response.json()
            if (response) {
                if (data.role === "Buyer")
                    navigate("/profile")
                else
                    navigate("/admin")
            }
        }
    }
    useEffect(() => {
        (async () => {
            let response = await fetch("/users", {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            if (response) {
                let item = response.find((x) => x.id === localStorage.getItem("userid"))
                if (item)
                    setData((old) => {
                        return {
                            ...old,
                            ...item
                        }
                    })
                else
                    navigate("/login")
            }
        })()
    }, [])
    return (
        <>
            <Breadcrum title="Signup Section" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
                        <h5 className='bg-primary text-center p-2 text-light'>Update Your Profile</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="name" value={data.name} onChange={getInputData} className={`form-control border-2 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} placeholder='Full Name' />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="phone" value={data.phone} onChange={getInputData} className={`form-control border-2 ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} placeholder='Phone Number' />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : ""}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Address</label>
                                <textarea name="address" value={data.address} onChange={getInputData} className='form-control border-2 border-primary' placeholder='Address..'></textarea>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>City</label>
                                    <input type="text" name="city" value={data.city} onChange={getInputData} className='form-control border-2 border-primary' placeholder='City Name' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>State</label>
                                    <input type="text" name="state" value={data.state} onChange={getInputData} className='form-control border-2 border-primary' placeholder='State Name' />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Pin</label>
                                    <input type="text" name="pin" value={data.pin} onChange={getInputData} className='form-control border-2 border-primary' placeholder='Pin Code' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file" name="pic" onChange={getInputData} className='form-control border-2 border-primary' />
                                </div>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
