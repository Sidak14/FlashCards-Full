import { createContext, useEffect, useState } from "react";
import { sendPost } from "./backendCommunication.js";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs) => {
        const res = await sendPost("/auth/login", inputs);
        if (res.ok){
            setCurrentUser(await res.json());
        } else {
            return await(res.json());
        }
        
    }

    const logout = async (inputs) => {
        const res = await sendPost("/auth/logout");
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}