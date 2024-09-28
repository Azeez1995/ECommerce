import React, { useEffect, useState } from 'react'

import $ from "jquery"
import "datatables.net"
import 'datatables.net-dt/css/dataTables.dataTables.css';

// import Breadcrum from "../../Partials/Breadcrum"

import Sidebar from '../Sidebar'
export default function AdminUsers() {
    let [data, setData] = useState([])

    async function deleteItem(id) {
        if (window.confirm("Did you really want to delete that item ")) {
            let response = await fetch("/users/" + id, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            getAPIData()
        }
    }

    async function getAPIData() {
        let response = await fetch("/users", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        if (response) {
            setData(response)
            setTimeout(() => {
                $('#dataTable').DataTable();
            }, 1000)
        }
        else
            setData([])
    }
    useEffect(() => {
        getAPIData()
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
                        <h5 className='bg-primary text-center p-2 text-light'>Users</h5>

                        <div className="table-responsive">
                            <table className='table table-bordered display' id='dataTable' style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Eamil</th>
                                        <th>Phone</th>
                                        <th>Username</th>
                                        <th>Role</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.username}</td>
                                                <td>{item.role}</td>
                                                <td><button className='btn' onClick={() => deleteItem(item.id)}><i className='fa fa-trash text-danger'></i></button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
