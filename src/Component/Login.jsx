import React, { useState } from 'react'
import Breadcrum from "./Partials/Breadcrum"


import { Link, useNavigate } from 'react-router-dom'
import FormValidator from './FormValidator/FormValidator'

export default function Login() {
    let [data, setData] = useState({
        username: "",
        password: ""
    })
    let [errorMessage, setErrorMessage] = useState({
        username: "Username Field is Mendatory"
    })
    let [show, setShow] = useState(false)
    let [message, setMessage] = useState("")
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setMessage("")
        if (name !== "password") {
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
            let response = await fetch("/users", {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            if (response) {
                let item = response.find((x) => (x.username === data.username || x.email === data.username) && x.password === data.password)
                if (item) {
                    localStorage.setItem("login", true)
                    localStorage.setItem("name", item.name)
                    localStorage.setItem("userid", item.id)
                    localStorage.setItem("role", item.role)
                    if (item.role === "Buyer")
                        navigate("/profile")
                    else
                        navigate("/admin")
                }
                else {
                    setShow(true)
                    setMessage("Invalid Username or Password")
                }
            }
        }
    }
    return (
        <>
            <Breadcrum title="Login Section" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
                        <h5 className='bg-primary text-center p-2 text-light'>Login to Your Account</h5>
                        <form onSubmit={postData}>
                            <div className=" mb-3">
                                <input type="text" name="username" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} placeholder='User Name or Email Address' />
                                {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : ""}
                                {show && message ? <p className='text-danger'>{message}</p> : ""}
                            </div>

                            <div className="mb-3">
                                <input type="password" name="password" onChange={getInputData} className={`form-control border-2 ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} placeholder='Password' />
                                {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : ""}
                            </div>

                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Login</button>
                            </div>
                        </form>
                        <div className='d-flex justify-content-between'>
                            <Link to="#">Forget Password</Link>
                            <Link to="/signup">Doesn't Have Account?Create</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
