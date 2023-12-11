import React, { useEffect, useState } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "./Authentication";

const PrivateRoute = () => {
    return(
        (checkAuth() ? <Outlet/> : <Navigate to="/login"/>)
    )
}

export default PrivateRoute;