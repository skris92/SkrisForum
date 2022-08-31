import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';

export default Login;

function Login() {
    return (
        <div className="login-register-container">
            <Card className="card-login" bg="light">
                <Card.Header><h2>Sign In</h2></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Form>
                            <Form.Group>
                                <Form.Control id="username" required type="text" placeholder="Username" />
                            </Form.Group>
                            <br />
                            <Form.Group>
                                <Form.Control id="password" required type="password" placeholder="Password" />
                            </Form.Group>
                            <br />
                            <Button variant="dark" type="submit">Login</Button>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <LinkContainer to="/register">
                <p className="para-link">Don't have an account?</p>
            </LinkContainer>
        </div>
    )
}