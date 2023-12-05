import React, { useEffect, useState } from "react";
import Loader from "../../compponate/Loader/Loader";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getTeamsByUserId } from "../../actions/action";
import Table from '../../compponate/Table/table'
import { toast } from 'react-toastify';
import './user.css';
const columns = [
    {
        dataField: 'id',
        text: '#',
    },
    {
        dataField: 'name',
        text: 'Team_Name',
    },
    {
        dataField: 'Teams',
        text: 'Teams_members',
    },
];


const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const { error, teams, } = useSelector((state) => state.team);
    const [toggleClass, settoggleClass] = useState(false)

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getTeamsByUserId());
    }, [dispatch, error]);
    console.log(teams)
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div id="page-content-wrapper">
                        <div className=" xyz">
                            <div className="row  justify-content-center align-items-center h-100">
                                <div className=" col-lg-6 col-md-12 mb-4 mb-lg-0">
                                    <h6>My Profile</h6>
                                    <div className="card mb-3" >
                                        <div className="row g-0">
                                            <div className="col-md-4  gradient-custom text-center text-white"
                                            >
                                                <img src={user?.avatar?.url} alt={user.name} className="img-fluid m-2" />
                                                <h3 className="text-primary mt-3 text-capitalize">{user.name}</h3>

                                            </div>
                                            <div className="col-md-8">

                                                <div className="card-body p-4">

                                                    <h6><i className="fa fa-edit mb-5"></i> <Link to="/me/update">Edit Profile</Link></h6>
                                                    <hr className="mt-0 mb-4" />
                                                    <div className="row pt-1">
                                                        <div className="col-sm-7 mb-3">
                                                            <h6>Email</h6>
                                                            <p className="text-muted">{user.email}</p>
                                                        </div>
                                                        <div className="col-sm-5 mb-3">
                                                            <h6>Phone</h6>
                                                            <p className="text-muted">{user.phone}</p>
                                                        </div>
                                                        <div className="col-md-12 mb-3">

                                                            <h6>Projects</h6>
                                                            <hr className="mt-0 mb-4" />
                                                            <div className="row pt-1">
                                                                <div className="col-6 mb-3">
                                                                    <h6>Viewed task</h6>
                                                                    <p className="text-muted"><Link to={"/me/order"}>My Orders</Link></p>

                                                                </div>
                                                                <div className="col-6 mb-3">
                                                                    <h6>Password</h6>
                                                                    <p className="text-muted"> <Link to="/password/update">Change Password</Link></p>

                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-start">
                                                                <p className="text-muted mr-3">Joind On</p>
                                                                <p className="text-muted">{String(user.createdAt).substr(0, 10)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" col-lg-6 col-md-12 mb-4 mb-lg-0">
                                    <h6>My Team Member</h6>
                                    <div className="card mb-3">
                                        <ul className="card w-100">
                                            {/* Render unique users as draggable list items */}
                                            {teams &&
                                                teams[0]?.members?.map(member => (
                                                    <li
                                                        className="d-flex border justfy-content-between m-2 p-2"
                                                        key={member._id}
                                                    >
                                                        <div className='avatar-group mr-3 m-0'>
                                                            <img className="avatar" src={member.avatar?.url} alt="Avatar Preview" />
                                                        </div>
                                                        <span>{member.name}</span>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </>
            )
            }
        </>
    );
};

export default Profile;
