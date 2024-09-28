import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import $ from "jquery"
import "datatables.net"
import "datatables.net-dt/css/dataTables.dataTables.css"

import Sidebar from '../Sidebar'
import { getBrand, deleteBrand } from "../../../Redux/Actioncreators/BrandActionCreators "

export default function AdminBrand() {

    let [data, setData] = useState([])

    let dispatch = useDispatch()
    let BrandStateData = useSelector(state => state.BrandStateData)

    function deleteitem(id) {
        if (window.confirm("Did you really want to delete that item")) {
            dispatch(deleteBrand({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getBrand())
        if (BrandStateData.length) {
            setData(BrandStateData);
            setTimeout(() => {
                $('#dataTable').DataTable();
            }, 1000)
        }
        else
            setData([])
    }

    useEffect(() => {
        getAPIData()
    }, [BrandStateData.length]);

    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-xl-2">
                        <Sidebar />
                    </div>
                    <div className="col-xl-10">
                        <h5 className='bg-primary text-center p-2 text-light'>Brand <Link to="/admin/brand/create" className='fa fa-plus text-light float-end'></Link></h5>
                        <div className="table-responsive">
                            <table className='table table-bordered display' id='dataTable' style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Brand Image</th>
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
                                                    <img src={`${item.pic}`} height={60} width={100} alt="Brand logo Image" />
                                                </td>
                                                <td className={`${item.active ? "text-success" : "text-danger"}`}>{item.active ? "Yes" : "No"}</td>
                                                <td><Link to={`/admin/brand/update/${item.id}`} className='btn'><i className='fa fa-edit text-primary'></i></Link></td>
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




