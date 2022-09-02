import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default Login;

function Login() {
    const LOGIN_API_URL = "https://localhost:7171/api/auth/login";
    const navigate = useNavigate();

    const username = useRef();
    const password = useRef();

    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_API_URL,
                {
                    username: username.current.value,
                    password: password.current.value
                });
            if (response.data && response.status === 200) {
                const decodedToken = jwtDecode(response.data.accessToken);
                const authData = {
                    id: decodedToken["id"],
                    name: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                    role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
                    exp: decodedToken["exp"],
                    accessToken: response.data.accessToken
                };
                localStorage.setItem("auth", JSON.stringify(authData));
                console.log(JSON.parse(localStorage.getItem("auth")));
                navigate("/home");
            }
        } catch (error) {
            setErrorMessage(error.message);
            setShowErrorMessage(true);
        } finally {
            username.current.value = "";
            password.current.value = "";
        }
    }

    return (
        <div className="login-register-container">
            <Card className="card-login" bg="light">
                <Card.Header><h2>Sign In</h2></Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control
                                id="username"
                                type="text"
                                placeholder="Username"
                                required
                                ref={username}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Control
                                id="password"
                                type="password"
                                placeholder="Password"
                                required
                                ref={password}
                            />
                        </Form.Group>
                        <br />
                        <Button variant="dark" type="submit">Login</Button>
                        {showErrorMessage && <span style={{ float: "right", color: "red" }}>{errorMessage}</span>}
                    </Form>
                </Card.Body>
            </Card>
            <br />
            <LinkContainer to="/register">
                <p className="para-link">Don't have an account?</p>
            </LinkContainer>
        </div>
    )
}