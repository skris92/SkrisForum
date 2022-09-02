import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default Home;

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const date = Date.now();
        const expMins = JSON.parse(localStorage.getItem("auth"))?.exp * 1000;
        if (!localStorage.getItem("auth") || date > expMins) {
            localStorage.removeItem("auth");
            navigate("/");
        }
    }, []);

    return (
        <h2>Home content</h2>
    )
}
