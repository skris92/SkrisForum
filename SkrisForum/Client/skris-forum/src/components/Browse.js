import { Card } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

function Browse() {
    const { auth } = useAuth();

    return (
        <div className="browse-content">
            <Card>
                <Card.Header>
                    <h2>Welcome, {auth.username}!</h2>
                </Card.Header>
            </Card>
        </div>
    )
}

export default Browse;