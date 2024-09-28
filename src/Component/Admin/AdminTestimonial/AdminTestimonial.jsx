import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import $ from "jquery"
import "datatables.net"
import "datatables.net-dt/css/dataTables.dataTables.css"

import Sidebar from '../Sidebar'
import { getTestimonial, deleteTestimonial } from "../../../Redux/Actioncreators/TestimonialActionCreators"

export default function AdminTestimonial() {

    let [data, setData] = useState([])

    let dispatch = useDispatch()
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)

    function deleteitem(id) {
        if (window.confirm("Did you really want to delete that item")) {
            dispatch(deleteTestimonial({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getTestimonial())
        if (TestimonialStateData.length) {
            setData(TestimonialStateData);
            setTimeout(() => {
                $('#dataTable').DataTable();
            }, 1000)
        }
        else
            setData([])
    }

    useEffect(() => {
        getAPIData()
    }, [TestimonialStateData.length]);

    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-xl-2">
                        <Sidebar />
                    </div>
                    <div className="col-xl-10">
                        <h5 className='bg-primary text-center p-2 text-light'>Testimonial <Link to="/admin/testimonials/create" className='fa fa-plus text-light float-end'></Link></h5>
                        <div className="table-responsive">
                            <table className='table table-bordered display' id='dataTable' style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Testimonial Image</th>
                                        <th>Testimonial Message</th>
                                        <th>Active</th>
                                        <th>Update</th>
                                        <th>Delete</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <Link to={`${item.pic}`} target='_blank' rel='noreferrer'></Link>
                                                    <img src={`${item.pic}`} height={100} width={100} alt="Testimonial logo Image" />
                                                </td>
                                                <td>{item.message}</td>
                                                <td className={`${item.active ? "text-success" : "text-danger"}`}>{item.active ? "Yes" : "No"}</td>
                                                <td><Link to={`/admin/testimonials/update/${item.id}`} className='btn'><i className='fa fa-edit text-primary'></i></Link></td>
                                                <td><button className='btn' onClick={() => deleteitem(item.id)}><i className='fa fa-trash text-danger'></i></button></td>
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




