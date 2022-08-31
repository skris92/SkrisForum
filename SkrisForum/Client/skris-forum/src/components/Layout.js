import { Outlet, Link } from "react-router-dom";
import NavBar from "./NavBar";

export default Layout;

function Layout() {
    return (
        <div>
            <NavBar />
            <div className="page-content">
                <Outlet />
            </div>
        </div>
    )
}
