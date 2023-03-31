import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { Button, Form, FormProps } from "react-bootstrap";
import { toast } from "react-toastify";

import { Project } from "../../@types/project";

import { api } from "../../services/api";

import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

type Props = FormProps & {
  project: Project;
  show: boolean;
};

export function FormServicesRegister({ project, show, ...rest }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  async function handleRegisterService() {
    const costService = Number(cost);

    if (project.budget > costService) {
      const budget = project.budget - costService;
      const newServices = [
        ...project.services,
        {
          id: uuidv4(),
          name,
          description,
          cost,
        },
      ];

      try {
        await api.put(`/projects/${project.id}`, {
          ...project,
          budget,
          services: newServices,
        });

        setName("");
        setDescription("");
        setCost("");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Orçamento ultrapassado, verifique o custo do serviço!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <>
      {show && (
        <Form {...rest}>
          <Form.Group>
            <Form.Label>Nome do Serviço:</Form.Label>
            <Form.Control
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Insira o nome do Serviço..."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descrição do Serviço:</Form.Label>
            <Form.Control
              value={description}
              as="textarea"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Insira a descrição do Serviço..."
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Valor do Serviço:</Form.Label>
            <Form.Control
              type="number"
              value={cost}
              onChange={(event) => setCost(event.target.value)}
              placeholder="Insira o valor de custo do Serviço..."
            />
          </Form.Group>
          <Button variant="dark" onClick={handleRegisterService}>
            Cadastrar Serviço
          </Button>
        </Form>
      )}
    </>
  );
}
