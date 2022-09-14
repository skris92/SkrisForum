import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";

function RequireAuth({ children, allowedRoles }) {
    const { auth } = useAuth();

    if (!auth?.accessToken) {
        return (<Navigate to="/login" />)
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(auth?.role)) {
        return <Navigate to="/" />
    }

    return children;
}

RequireAuth.propTypes = {
    allowedRoles: PropTypes.array.isRequired
}

export default RequireAuth;