import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Loader from "../compponate/Loader/Loader";

const PrivateRoute = ({ isAdmin, children }) => {
  // const navigate = useNavigate();

  const { loading, user, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={`/?redirect=${encodeURIComponent(location.pathname)}`} />;
  }
 
  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to={`/?redirect=${encodeURIComponent(location.pathname)}`} />;
  };
  return children ? children : <Outlet />;
};



export default PrivateRoute;

