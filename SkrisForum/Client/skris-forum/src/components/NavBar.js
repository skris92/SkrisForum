import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default NavBar;

function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>SkrisForum</Navbar.Brand>
                </LinkContainer>

                <Nav className="me-auto">
                    <LinkContainer to="/home">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                </Nav>

                <Nav>
                    <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Container>
        </Navbar>
    )
}
