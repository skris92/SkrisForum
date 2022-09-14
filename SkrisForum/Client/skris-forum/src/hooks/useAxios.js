import { useEffect } from "react";
import useAuth from "./useAuth";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function useAxios() {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const requestIntercept = axios.interceptors.request.use(
            config => {
                if (!config.headers["Authorization"] && auth?.accessToken) {
                    config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, error => Promise.reject(error)
        );

        const responseIntercept = axios.interceptors.response.use(
            response => {
                return response;
            }, error => {
                if (error.response.status === 401) {
                    logout();
                }
                else if (error.response.status === 403) {
                    navigate("/");
                }
                else {
                    navigate("/");
                }
                return Promise.reject(error);
            }
        )

        return () => {
            axios.interceptors.request.eject(requestIntercept);
            axios.interceptors.response.eject(responseIntercept);
        }
    })
    return axios;
}

export default useAxios;