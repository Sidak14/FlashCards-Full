import { createContext, useEffect, useState } from "react";
import { sendGet, sendPost } from "./backendCommunication.js";

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

    useEffect(() => {
        const verifyUser = async () => {
            if (!currentUser) return;

            const res = await sendGet("/auth/isauthorised");
            const resJson = await res.json();
            if (!res.ok) {
                setCurrentUser(null);
            } else if (resJson !== currentUser.id) {
                setCurrentUser(null);
            }
        }
        try{
            verifyUser();
        } catch (err) {
            console.log(err);
            setCurrentUser(null);
        }
        
    }, []);

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}