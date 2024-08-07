import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./authContext";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";


const Protected = () => {
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();

    console.log(<Outlet />);
    console.log("whats good");
    if (currentUser) {
        return (
            <div>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        )
    } else {
        return (
            <Navigate to="/" state={{from: location}} replace />
        )
    }
};

export default Protected;