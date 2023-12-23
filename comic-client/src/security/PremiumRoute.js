import React, { useEffect, useState } from "react";
import { Route, Navigate, Outlet, useParams } from "react-router-dom";
import { checkAuth } from "./Authentication";
import axios from "axios";
import API_URL from "../config/config";


const PremiumRoute = () => {
    const { comicId } = useParams()
    const getPremiumDetail = async () => {
        try {
            if (comicId) {
                const response = await axios.get(
                    `${API_URL}/comicbooks/${comicId}`
                );
                return response.data.data.premium;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return(
        (getPremiumDetail() ? <Outlet/> : <Navigate to="/"/>)
    )
}

export default PremiumRoute;