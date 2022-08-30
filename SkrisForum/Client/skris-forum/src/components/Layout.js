import { Outlet, Link } from "react-router-dom";

export default Layout;

function Layout() {
    return (
        <nav className="nav-bar">
            <ul style={{listStyleType: "none"}}>
                <li>
                    <Link to="/"><h1>Landing Page</h1></Link>
                </li>
                <li>
                    <Link to="/home">Home</Link>
                </li>
            </ul>
            <div className="page-content">
                <Outlet />
            </div>
        </nav>
    )
}
