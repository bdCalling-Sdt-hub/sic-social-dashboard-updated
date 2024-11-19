import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserRole, isLoggedIn } from "../utils/utils";
import { toast } from "sonner";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const role = getUserRole();
  console.log(!!isLoggedIn());
  if (role == "USER") {
    toast.error("You are not authorized to access here!!!");
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (!!isLoggedIn() && (role == "ADMIN" || "SUPER-ADMIN")) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
