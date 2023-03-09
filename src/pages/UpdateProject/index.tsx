import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Button } from "react-bootstrap";

import { api } from "../../services/api";

import { Project } from "../../@types/project";

export function UpdateProject() {
    const { id } = useParams();
    const [project, setProject] = useState({} as Project);
    
    async function handleFethcDataProject() {
        const { data } = await api.get(`/projects/${id}`);

        setProject(data);
    }

    useEffect(() => {
        handleFethcDataProject();
    }, []);

    return (
        <>
            <div className="border-bottom border-dark">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>{project.name}</h1>
                    <Button
                        variant="dark"
                    >
                        Editar Projeto
                    </Button>
                </div>
                <div className="mb-4">
                    <p className="m-0">Categoria: {project.category}</p>
                    <p className="m-0">Total de Orçamento: R$ {project.budget}</p>
                    <p className="m-0">Total Gasto: R$ 0</p>
                </div>
            </div>
        </>
    );
}