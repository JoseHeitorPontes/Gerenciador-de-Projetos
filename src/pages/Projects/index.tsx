import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import { useProjects } from "../../hooks/useProjects";

import Swal from "sweetalert2";

import { api } from "../../services/api";
import { Project } from "../../@types/project";

import { ButtonNavigate } from "../../components/ButtonNavigate";
import { ButtonDelete } from "../../components/ButtonDelete";
import { ButtonEdit } from "../../components/ButtonEdit";

import "./styles.css";

export function Projects() {
  const { projects, fetchProjects } = useProjects();

  const navigate = useNavigate();

  function handleDeleteProject(project: Project) {
    Swal.fire({
      icon: "question",
      title: "Deseja excluir este projeto?",
      showCancelButton: true,
      confirmButtonText: "Excluir",
      confirmButtonColor: "#dc3545",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/projects/${project.id}`).then(() => fetchProjects());
      }
    });
  }

  return (
    <div className="col-xl-12">
      <div className="d-flex justify-content-between align-items-center px-2 mb-4">
        <h2>Meus Projetos</h2>
        <ButtonNavigate
          textButton="Novo Projeto"
          navigateLink="/novo-projeto"
        />
      </div>
      {projects.length > 0 ? (
        <div className="d-flex flex-wrap">
          {projects.map((project) => (
            <div
              key={project.id}
              className="col-xl-4 d-flex justify-content-center"
            >
              <Card className="card-project">
                <Card.Header className="bg-dark">
                  <Card.Title className="text-warning">
                    {project.name}
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <p className="m-0">Orçamento: R$ {project.budget}</p>
                  <p className="m-0">{project.category}</p>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end">
                  <ButtonDelete
                    content="Excluir"
                    handleDelete={() => handleDeleteProject(project)}
                  />
                  <ButtonEdit
                    content="Editar"
                    handleClick={() => navigate(`${project.id}`)}
                  />
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <h5 className="text-secondary text-center">
          Sem projetos cadastrados!
        </h5>
      )}
    </div>
  );
}
