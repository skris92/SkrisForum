import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';

export default Login;

function Login() {
    return (
        <div className="login-container">
            <Card className="card-login" bg="light">
                <Card.Header><h2>Sign In</h2></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Form>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Username" />
                            </Form.Group>
                            <br />
                            <Form.Group>
                                <Form.Control type="text" placeholder="Password" />
                            </Form.Group>
                            <br />
                            <Button variant="dark">Login</Button>
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