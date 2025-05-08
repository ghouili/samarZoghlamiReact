import React, { useContext } from "react";
import { AuthContext } from "../contextHook/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  // console.log(localStorage.getItem("token"));
  console.log(user?.picture);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (role) {
    if (user.role === role) {
      return children;
    } else {
      return <Navigate to="/projects" replace />;
    }
  } else {
    return children;
  }
};

export default PrivateRoute;
