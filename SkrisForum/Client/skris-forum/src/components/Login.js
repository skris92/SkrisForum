import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';
import { useState, useRef, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const { auth, login } = useAuth();

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        if (auth) navigate("/home");
    });

    useEffect(() => {
        setErrMsg("");
    }, [username, password]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await login(username, password);
        } catch (error) {
            if (error.response.status === 401) {
                setErrMsg(error.response.data.errorMessages + "!");
            } else {
                setErrMsg(error.message + "!");
            }
        }

        usernameRef.current.value = "";
        passwordRef.current.value = "";
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
                                autoComplete="off"
                                ref={usernameRef}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Control
                                id="password"
                                type="password"
                                placeholder="Password"
                                ref={passwordRef}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br />
                        <Button variant="dark" type="submit" disabled={!username || !password}>Login</Button>
                        {errMsg && <span style={{ float: "right", color: "red" }}>{errMsg}</span>}
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

export default Login;