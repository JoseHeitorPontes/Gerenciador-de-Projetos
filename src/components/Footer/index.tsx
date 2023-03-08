import { Container } from "react-bootstrap";

import "./styles.css";

export function Footer() {
    return (
        <footer className="bg-dark d-flex">
            <Container className="d-flex align-items-center justify-content-center">
                <span className="text-light fw-600 fs-6">© 2023 Copyright</span>
            </Container>
        </footer>
    );
}