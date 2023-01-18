import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoot = () => {
    const user = localStorage.getItem("token");

    return <div>{user !== null ? <Outlet /> : <Navigate to="/auth" />}</div>;
};

export default PrivateRoot;
