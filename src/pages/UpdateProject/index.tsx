import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Button, Form } from "react-bootstrap";

import { api } from "../../services/api";

import { Project } from "../../@types/project";

import { useFormProject } from "../../hooks/useFormOrListProject";

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

    const {viewForm, setViewForm} = useFormProject();

    return (
        <>
            <div className="border-bottom border-dark">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>{project.name}</h2>
                    <Button
                        variant="dark"
                        onClick={() => {
                            if (viewForm === false) {
                                setViewForm(true);
                            } else {
                                setViewForm(false);
                            }
                        }}
                    >
                        Editar Projeto
                    </Button>
                </div>
                {
                    viewForm ? (
                        <Form className="mb-4">
                            <Form.Group>
                                <Form.Label>Nome do projeto:</Form.Label>
                                <Form.Control />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Orçamento do projeto:</Form.Label>
                                <Form.Control />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Selecione a categoria:</Form.Label>
                                <Form.Select>
                                    <option>Selecione a categoria do projeto</option>
                                    <option value="Infra">Infra</option>
                                    <option value="Desenvolvimento">Desenvolvimento</option>
                                    <option value="Design">Design</option>
                                    <option value="Planejamento">Planejamento</option>
                                </Form.Select>
                            </Form.Group>
                            <Button 
                                variant="dark"
                                className="mt-2"
                            >
                                Editar
                            </Button>
                        </Form>
                    ) : (
                        <>
                            <div className="mb-4">
                                <p className="m-0">Categoria: {project.category}</p>
                                <p className="m-0">Total de Orçamento: R$ {project.budget}</p>
                                <p className="m-0">Total Gasto: R$ 0</p>
                            </div>
                        </>
                    )
                }
            </div>
            <div className="border-bottom border-dark">
                <div className="d-flex justify-content-between align-items-center my-4">
                    <h2>Adicionar Serviço</h2>
                    <Button
                        variant="dark"
                    >
                        Novo Serviço
                    </Button>
                </div>
            </div>
            <div className="my-4">
                <h2>Serviços</h2>
            </div>
        </>
    );
}