import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Header () {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container className="px-3">
                    <Navbar.Brand>
                        <img
                            src="images/logo.png"
                            width="30"
                            height="30"
                            className="me-2"
                            alt="logo"
                        />
                        Gerenciador de Projetos
                    </Navbar.Brand>
                    <Navbar.Collapse>
                        <Nav>
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/projetos" className="nav-link">Projetos</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}