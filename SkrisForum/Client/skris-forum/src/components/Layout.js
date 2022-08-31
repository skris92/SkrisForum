import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default Layout;

function Layout() {
    return (
        <div>
            <NavBar />
            <div className="page-content">
                <Outlet />
            </div>
            <div className="footer-container">
                <Footer />
            </div>
        </div>
    )
}
