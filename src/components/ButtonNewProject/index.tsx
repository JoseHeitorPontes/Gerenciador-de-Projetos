import { Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

export function ButtonNewProject() {
    const navigate = useNavigate();

    return (
        <Button
            variant="dark"
            onClick={() => navigate("/novo-projeto")}
        >
            Criar Projeto
        </Button>
    );
}