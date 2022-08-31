import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';
import { useState, useEffect, useRef } from 'react';

export default Register;


function Register() {

    const password = useRef();
    const cPassword = useRef();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [passwordClass, setPasswordClass] = useState('form-control');
    const [cPasswordClass, setCPasswordClass] = useState('form-control');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isCPasswordValid, setIsCPasswordValid] = useState(false);

    const checkPassword = (e) => {
        if (password.current.value.length >= 4 && password.current.value.length <= 20) {
            setIsPasswordValid(true);
            setPasswordClass("form-control is-valid");
        } else if (password.current.value === "") {
            setIsPasswordValid(false);
            setPasswordClass("form-control");
        } else {
            setIsPasswordValid(false);
            setPasswordClass("form-control is-invalid");
        }
        if (cPassword.current.value !== "") {
            checkPasswords();
        }
    }

    const checkPasswords = (e) => {
        if (password.current.value === cPassword.current.value && password.current.value.length >= 4 && password.current.value.length <= 20) {
            setIsCPasswordValid(true);
            setShowErrorMessage(false);
            setCPasswordClass('form-control is-valid');
        } else if (cPassword.current.value === "") {
            setIsCPasswordValid(false);
            setShowErrorMessage(false);
            setCPasswordClass('form-control');
        } else {
            setIsCPasswordValid(false);
            setShowErrorMessage(true);
            setCPasswordClass('form-control is-invalid');
        }
    }

    return (
        <div className="login-register-container">
            <Card className="card-login" bg="light">
                <Card.Header><h2>Registration</h2></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Form>
                            <Form.Group>
                                <Form.Control
                                    id="email"
                                    type="email"
                                    maxLength="50"
                                    placeholder="Email Address"
                                    required
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
                                    required
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
                            <Button disabled={!isPasswordValid || (isPasswordValid && !isCPasswordValid)} variant="dark" type="submit">Register</Button>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <LinkContainer to="/login">
                <p className="para-link">Already have an account?</p>
            </LinkContainer>
        </div>
    )
}