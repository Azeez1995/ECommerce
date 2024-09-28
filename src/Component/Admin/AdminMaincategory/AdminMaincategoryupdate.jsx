import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from '../Sidebar';
import FormValidator from '../../FormValidator/FormValidator';

import { getMaincategory, updateMaincategory } from '../../../Redux/Actioncreators/MaincategoryActionCreators';

export default function AdminMaincategorycreate() {
    let [allData, setAllData] = useState([]);
    let [data, setData] = useState({
        name: "",
        active: true,
    });
    let [errorMessage, setErrorMessage] = useState({
        name: "",
    });
    let [show, setShow] = useState(false);
    let navigate = useNavigate();
    let { id } = useParams();

    let dispatch = useDispatch();
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData);


    function getInputData(e) {
        const { name, value } = e.target;
        if (name !== "active") {
            setErrorMessage((old) => ({
                ...old,
                [name]: FormValidator(e),
            }));
        }
        setData((old) => ({
            ...old,
            [name]: name === "active" ? (value === "1" ? true : false) : value,
        }));
    }

    function postData(e) {
        e.preventDefault();
        let error = Object.values(errorMessage).find((x) => x !== "");
        if (error) {
            setShow(true);
        } else {
            let item = allData.find(
                (x) => x.name?.toLocaleLowerCase() === data.name.toLocaleLowerCase() && x.id !== id
            );
            if (item) {
                setShow(true);
                setErrorMessage((old) => ({
                    ...old,
                    name: "Maincategory Name Already Exists",
                }));
            } else {
                dispatch(updateMaincategory({ ...data }));
                navigate("/admin/maincategory");
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
            if (MaincategoryStateData.length){
                setAllData(MaincategoryStateData)
                setData(MaincategoryStateData.find((x)=>x.id===id))
            }
            else
                setAllData([])
        })()
    }, [MaincategoryStateData.length])



    return (
        <div className="container-fluid my-3">
            <div className="row">
                <div className="col-xl-2">
                    <Sidebar />
                </div>
                <div className="col-xl-10">
                    <h5 className="bg-primary text-center p-2 text-light">
                        MainCategory
                        <Link to="/admin/maincategory" className="fa fa-arrow-left text-light float-end"></Link>
                    </h5>
                    <form onSubmit={postData}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Name*</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={getInputData}
                                    placeholder="MainCategory"
                                    className={`form-control ${show && errorMessage.name ? "border-danger" : "border-primary"} border-2`}
                                />
                                {show && errorMessage.name ? <p className="text-danger text-capitalize">{errorMessage.name}</p> : ""}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Active*</label>
                                <select
                                    name="active"
                                    onChange={getInputData}
                                    className="form-control border-primary border-2"
                                    value={data.active ? "1" : "0"}
                                >
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div className="md-3">
                                <button type="submit" className="btn btn-primary w-100">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
