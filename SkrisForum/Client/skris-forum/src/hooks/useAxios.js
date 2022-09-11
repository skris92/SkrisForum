import { useEffect } from "react";
import useAuth from "./useAuth";
// import useFlashMessages from "./useFlashMessages";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function useAxios() {
    const { auth, logout } = useAuth();
    // const { flash } = useFlashMessages();
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
                    // flash("Your session has expired")
                    logout();
                }
                else if (error.response.status === 403) {
                    // flash("You are not allowed to use this feature");
                    navigate("/");
                }
                else {
                    // flash("Something went horribly wrong.");
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