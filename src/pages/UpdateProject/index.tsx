import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Card } from "react-bootstrap";

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
            <div>
                <h1>{project.name}</h1>
            </div>
            <p>Categoria: {project.category}</p>
            <p>Total de Orçamento: {project.budget}</p>
        </>
    );
}