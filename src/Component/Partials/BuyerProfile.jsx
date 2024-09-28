import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function tableDisplay(user) {
    return <table className='table table-bordered'>
        <tbody>
            <tr>
                <th>Name</th>
                <td>{user.name}</td>
            </tr><tr>
                <th>User Name</th>
                <td>{user.username}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>{user.email}</td>
            </tr>
            <tr>
                <th>Phone</th>
                <td>{user.phone}</td>
            </tr>
            <tr>
                <th>Address</th>
                <td>{user.address}</td>
            </tr>
            <tr>
                <th>Pin</th>
                <td>{user.pin}</td>
            </tr>
            <tr>
                <th>City</th>
                <td>{user.city}</td>
            </tr>
            <tr>
                <th>State</th>
                <td>{user.state}</td>
            </tr>
            <tr>
                <td colSpan={2}><Link to="/update-profile" className='btn btn-primary w-100'>Update Profile</Link></td>
            </tr>
        </tbody>
    </table>
}
export default function BuyerProfile(props) {
    let [user, setUser] = useState({})

    let navigate = useNavigate()

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
                    setUser(item)
                else
                    navigate("/login")
            }
        })()
    }, [])
    return (
        props.title ?
            <>
                <h5 className='bg-primary text-center p-2 text-light'>Billing Details</h5>
                {tableDisplay(user)}
            </> :
            <div className="row">
                <div className="col-md-6">
                    {
                        user?.pic ?
                            <img src={user.pic} height={400} width="100%" alt='Buyer Pic' /> :
                            <img src="/img/user.png" height={400} width="100%" alt='Buyer Pic' />
                    }
                </div>
                <div className="col-md-6">
                    {tableDisplay(user)}
                </div>
            </div>
    )
}
