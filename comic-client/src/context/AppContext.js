import React, { useState, useEffect, createContext,useCallback } from "react";
import API_URL from "../config/config";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [genres, setGenres] = useState([]);
   

    const getGenres =useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/genres`);
            setGenres(response.data.data);
        } catch (error) {
            console.error(error);
        }
    },[]);

    useEffect(() => {
        getGenres();
        },[getGenres]);

    return (
        <AppContext.Provider value={genres}>
            {children}
        </AppContext.Provider>
    )
};
export default AppContext;