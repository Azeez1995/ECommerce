import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from '../Sidebar';
import FormValidator from '../../FormValidator/FormValidator';

import { getSubcategory, updateSubcategory } from '../../../Redux/Actioncreators/SubcategoryActionCreators ';

export default function AdminSubcategorycreate() {
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
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData);


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
                    name: "Subcategory Name Already Exists",
                }));
            } else {
                dispatch(updateSubcategory({ ...data }));
                navigate("/admin/subcategory");
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
            if (SubcategoryStateData.length){
                setAllData(SubcategoryStateData)
                setData(SubcategoryStateData.find((x)=>x.id===id))
            }
            else
                setAllData([])
        })()
    }, [SubcategoryStateData.length])



    return (
        <div className="container-fluid my-3">
            <div className="row">
                <div className="col-xl-2">
                    <Sidebar />
                </div>
                <div className="col-xl-10">
                    <h5 className="bg-primary text-center p-2 text-light">
                        SubCategory
                        <Link to="/admin/subcategory" className="fa fa-arrow-left text-light float-end"></Link>
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
                                    placeholder="SubCategory"
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
