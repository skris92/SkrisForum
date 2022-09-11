import { createContext, useState } from "react";
import axios from "../api/axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const LOGIN_API_PATH = "/api/auth/login";
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
    const navigate = useNavigate();

    const login = async (username, password) => {
        const response = await axios.post(LOGIN_API_PATH,
            {
                username,
                password
            },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        );

        if (response.data && response.status === 200) {
            const decodedToken = jwtDecode(response.data.accessToken);
            const authData = {
                ...response.data,
                id: decodedToken["id"],
                username: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
            };
            setAuth(authData);
            localStorage.setItem("auth", JSON.stringify(authData));
            navigate("/home");
        }
    }

    const logout = () => {
        setAuth(null);
        localStorage.removeItem("auth");
        navigate("/login");
    }

    const isTokenExpired = () => {
        if (!auth) {
            return true
        }
        const { exp } = jwtDecode(auth?.accessToken)

        return (Date.now() < exp * 1000)
    }

    return (
        <AuthContext.Provider value={{ auth, login, logout, checkExpired: isTokenExpired }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;