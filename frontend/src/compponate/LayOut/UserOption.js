
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from "../../actions/userAction";

const UserOptions = ({ user }) => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const userMenuRef = useRef(null); // Initialize useRef with null

    useEffect(() => {
        const handler = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setIsOpenDropdown(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const options = [
        { name: "Profile", func: account },
        { name: "Chnage Password", func: passWord},
        { name: "Logout", func: logoutUser },
    ];



    function account() {
        navigate("/me/acount")


    }
    function passWord() {
        navigate("/password/update")

    }
    function logoutUser() {
        dispatch(logout());
        toast.success("Logout Successfully..");
    }
    return (
        <>
            <div className={isOpenDropdown ? 'profile active' : 'profile'}>
                <div onClick={() => { setIsOpenDropdown(!isOpenDropdown); }} className="icon_wrap">
                    <img src={user?.avatar.url ? user?.avatar.url : "https://i.imgur.com/x3omKbe.png"} alt="profile_pic" />
                    <span className="name">{user?.name}</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
                <div className="profile_dd" ref={userMenuRef}> 
                    <ul className="profile_ul">
                        {options.map((item) => (
                            <li key={item.name} className="nav-link cursor-pointer"><span onClick={item.func}>{item.name}</span></li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default UserOptions;
