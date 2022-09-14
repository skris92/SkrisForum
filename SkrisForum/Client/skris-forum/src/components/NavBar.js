import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import useAuth from "../hooks/useAuth";

function NavBar() {
    const { auth, logout } = useAuth();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>SkrisForum</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="me-auto">
                        {auth && (auth.role === "ADMIN" || auth.role === "USER") &&
                            <LinkContainer to="/browse">
                                <Nav.Link>Browse</Nav.Link>
                            </LinkContainer>}
                    </Nav>

                    <Nav>
                        {!auth &&
                            <LinkContainer to="/login">
                                <Nav.Link>Sign In</Nav.Link>
                            </LinkContainer>}
                        {auth &&
                            <LinkContainer to="/profile">
                                <Nav.Link>Profile</Nav.Link>
                            </LinkContainer>}
                        {auth &&
                            <LinkContainer to="/">
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </LinkContainer>}
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;