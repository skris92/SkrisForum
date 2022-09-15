import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';
import { useState, useRef, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Register() {
    const REGISTER_API_PATH = "/api/users";

    const { auth } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (auth) navigate("/browse");
    }, [auth, navigate]);

    const email = useRef();
    const username = useRef();
    const password = useRef();
    const cPassword = useRef();
    const [emailState, setEmailState] = useState();
    const [usernameState, setUsernameState] = useState();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [passwordClass, setPasswordClass] = useState('form-control');
    const [cPasswordClass, setCPasswordClass] = useState('form-control');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isCPasswordValid, setIsCPasswordValid] = useState(false);

    const checkPassword = (e) => {
        if (password.current.value.length >= 4 && password.current.value.length <= 20) {
            setIsPasswordValid(true);
            setPasswordClass("form-control is-valid");
            setShowErrorMessage(false);
        } else if (password.current.value === "") {
            setIsPasswordValid(false);
            setPasswordClass("form-control");
            setShowErrorMessage(false);
        } else {
            setIsPasswordValid(false);
            setPasswordClass("form-control is-invalid");
            setErrorMessage("At least 4 characters!");
            setShowErrorMessage(true);
        }
        if (cPassword.current.value !== "") {
            checkPasswords();
        }
    }

    const checkPasswords = (e) => {
        if (password.current.value === cPassword.current.value && password.current.value.length >= 4 && password.current.value.length <= 20) {
            setIsCPasswordValid(true);
            setCPasswordClass('form-control is-valid');
            setShowErrorMessage(false);
        } else if (cPassword.current.value === "") {
            setIsCPasswordValid(false);
            setCPasswordClass('form-control');
            setShowErrorMessage(false);
        } else {
            setIsCPasswordValid(false);
            setCPasswordClass('form-control is-invalid');
            if (password.current.value.length < 4) {
                setErrorMessage("At least 4 characters!");
            } else {
                setErrorMessage("Passwords doesn't match!");
            }
            setShowErrorMessage(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(REGISTER_API_PATH, {
                "emailAddress": email.current.value,
                "username": username.current.value,
                "password": password.current.value
            });
            navigate("/login");
        } catch (error) {
            if (error.response.status === 409) {
                setErrorMessage(error.response.data.errorMessages + "!")
                if (error.response.data.errorMessages[0] === "Email not available") {
                    email.current.focus();
                } else {
                    username.current.focus();
                }
            } else {
                setErrorMessage(error.message + "!");
            }
            setShowErrorMessage(true);
        }
    }

    return (
        <div className="login-register-container">
            <Card className="card-login" bg="light">
                <Card.Header><h2>Registration</h2></Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control
                                id="email"
                                type="email"
                                maxLength="50"
                                placeholder="Email Address"
                                autoComplete="off"
                                required
                                ref={email}
                                onChange={(e) => setEmailState(e.target.value)}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Control
                                id="username"
                                type="text"
                                minLength="2"
                                maxLength="20"
                                placeholder="Username"
                                autoComplete="off"
                                required
                                ref={username}
                                onChange={(e) => setUsernameState(e.target.value)}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Control
                                className={passwordClass}
                                id="password"
                                type="password"
                                minLength="4"
                                maxLength="20"
                                placeholder="Password"
                                required
                                ref={password}
                                onChange={checkPassword}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Control
                                className={cPasswordClass}
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                required
                                ref={cPassword}
                                onChange={checkPasswords}
                            />
                        </Form.Group>
                        <br />
                        <Button disabled={!emailState || !usernameState || !isPasswordValid || (isPasswordValid && !isCPasswordValid)} variant="dark" type="submit">Register</Button>
                        {showErrorMessage && <span style={{ float: "right", color: "red" }}>{errorMessage}</span>}
                    </Form>
                </Card.Body>
            </Card>
            <br />
            <LinkContainer to="/login">
                <p className="para-link">Already have an account?</p>
            </LinkContainer>
        </div>
    )
}

export default Register;