import { Button, Card } from "react-bootstrap";
import { useProjects } from "../../hooks/useProjects";

import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import Swal from "sweetalert2";
import { Project } from "../../@types/project";

import { api } from "../../services/api";

import { useNavigate } from "react-router-dom";

import { ButtonNewProject } from "../../components/ButtonNewProject";

import "./styles.css";

export function Projects() {
    const {projects, fetchProjects} = useProjects();

    const navigate = useNavigate();

    function handleDeleteProject(project: Project) {
        Swal.fire({
            icon: "question",
            title: "Deseja excluir este projeto?",
            showCancelButton: true,
            confirmButtonText: "Excluir",
            confirmButtonColor: "#dc3545",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/projetos/${project.id}`).then(() => fetchProjects());
            }
        });
    }

    return (
        <div className="col-xl-12">
            <div className="d-flex justify-content-between align-items-center px-2 mb-4">
                <h2>Meus Projetos</h2>
                <ButtonNewProject />
            </div>
            {
                projects.length > 0 ? (
                    <div className="d-flex flex-wrap">
                        {
                            projects.map((project) => (
                                <div key={project.id} className="col-xl-4 d-flex justify-content-center">
                                    <Card className="card-project">
                                        <Card.Body>
                                            <Card.Title>{project.name}</Card.Title>
                                            <p>Categoria: {project.category}</p>
                                            <p>Orçamento: {project.budget}</p>
                                        </Card.Body>
                                        <Card.Footer className="d-flex justify-content-end">
                                            <Button 
                                                variant="danger"
                                                className="mx-1"
                                                onClick={() => handleDeleteProject(project)}
                                            >
                                                Excluir
                                                <FaTrash className="ms-2"/>
                                            </Button>
                                            <Button
                                                variant="success"
                                                className="mx-1"
                                                onClick={() => navigate("/editar-projeto")}
                                            >
                                                Editar
                                                <MdEdit className="ms-2"/>
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <h5 className="text-secondary text-center">Sem projetos cadastrados!</h5>
                )
            }
        </div>
    );
}