import { useState, useEffect, FormEvent } from "react";

import { useParams } from "react-router-dom";

import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { useFormProject } from "../../hooks/useFormOrListProject";
import { api } from "../../services/api";
import { Project } from "../../@types/project";
import { FormServices } from "../../components/FormServices";

export function UpdateProject() {
  const { id } = useParams();

  const [project, setProject] = useState({} as Project);
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");

  const [showFormServices, setShowFormServices] = useState(false);

  async function handleFethcDataProject() {
    const { data } = await api.get(`/projects/${id}`);

    setProject(data);
    setName(data.name);
    setBudget(data.budget);
    setCategory(data.category);
  }

  async function handleUpdateProject(event: FormEvent) {
    event.preventDefault();

    try {
      await api.put(`/projects/${id}`, {
        name,
        budget,
        category,
      });

      handleFethcDataProject();
      setViewForm(false);

      toast.success("Projeto editado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleFethcDataProject();
  }, []);

  const { viewForm, setViewForm } = useFormProject();

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
        {viewForm ? (
          <Form className="col-xl-5 mb-4">
            <Form.Group>
              <Form.Label>Nome do projeto:</Form.Label>
              <Form.Control
                placeholder="Insira o nome do projeto..."
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Orçamento do projeto:</Form.Label>
              <Form.Control
                placeholder="Insira o orçamento do projeto..."
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Selecione a categoria:</Form.Label>
              <Form.Select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option>Selecione a categoria do projeto</option>
                <option value="Infra">Infra</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="Design">Design</option>
                <option value="Planejamento">Planejamento</option>
              </Form.Select>
            </Form.Group>
            <Button variant="dark" type="submit" onClick={handleUpdateProject}>
              Editar
            </Button>
          </Form>
        ) : (
          <>
            <div className="mb-4">
              <p className="m-0">Categoria: {category}</p>
              <p className="m-0">Total de Orçamento: R$ {budget}</p>
              <p className="m-0">Total Gasto: R$ 0</p>
            </div>
          </>
        )}
      </div>
      <div className="border-bottom border-dark">
        <div className="d-flex justify-content-between align-items-center my-2">
          <h2>Adicionar Serviço</h2>
          <Button
            variant="dark"
            onClick={() => {
              if (!showFormServices) {
                setShowFormServices(true);
              } else {
                setShowFormServices(false);
              }
            }}
          >
            Novo Serviço
          </Button>
        </div>
        <FormServices show={showFormServices} className="col-xl-5 mb-4" />
      </div>
      <div className="my-2">
        <h2>Serviços</h2>
      </div>
    </>
  );
}
