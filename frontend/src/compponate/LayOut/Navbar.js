import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserOptions from './UserOption';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllNotifications, updateNotificationReadStatus } from "../../actions/action";
function Navbar({ click }) {
    const [notificationsActive, setNotificationsActive] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { user, } = useSelector(
        (state) => state.user
    );
    const { isReadStatusUpdated, notifications } = useSelector(
        (state) => state.notification
    );;

    const notificationRef = useRef(null); // Initialize useRef with null
    useEffect(() => {
        const handler = (e) => {
            if (notificationRef.current && !notificationRef.current.contains(e.target)) {
                setNotificationsActive(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    const toggleNotificationsActive = () => {
        setNotificationsActive(!notificationsActive);
    };

    useEffect(() => {

        dispatch(getAllNotifications());
        
    }, [dispatch]);
   
    const unreadNotifications = notifications.filter(notification => !notification.readBy.includes(user?.id));

    return (
        <div class="wrapper">
            <div class="navbar">

                <div class="navbar_left">
                    <div className='menu-bar-icon '>
                        <i onClick={() => click()} class="fa-solid fa-bars"></i>
                    </div>
                    <div class="logo">
                        <Link to={'/me/dash-bord'}>Navbar</Link>
                    </div>
                </div>

                <div class="navbar_right">
                    <div className={notificationsActive ? 'notifications active' : 'notifications'}>
                        <div onClick={toggleNotificationsActive} class="icon_wrap">
                            <i class="far fa-bell"></i>
                            
                            <small className='notification-count'>{unreadNotifications.length > 0 ? unreadNotifications.length : 0}</small>
                        </div>

                        <div class="notification_dd" ref={notificationRef}>
                            <ul class="notification_ul">
                                {notifications && notifications.map((deta) => (
                                    <li class="starbucks success">
                                        <div class="notify_icon">
                                            <span class="icon"></span>
                                        </div>
                                        <div onClick={() => navigate('/me/task')} class="notify_data">
                                            <div class="sub_title">
                                                {deta.message}
                                            </div>
                                        </div>

                                    </li>
                                )

                                )}
                                <li class="show_all">
                                    <p class="link">Show All Activities</p>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <UserOptions user={user} />
                </div>
            </div>
        </div>
    )
}

export default Navbar