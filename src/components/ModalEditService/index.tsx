import { useState } from "react";

import { Modal, ModalProps, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import { api } from "../../services/api";
import { Service } from "../../@types/service";
import { Project } from "../../@types/project";

type Props = ModalProps & {
  project?: Project;
  serviceSelected?: Service;
  fetchProduct: () => Promise<void>;
};

export function ModalEditService({ project, serviceSelected, fetchProduct, ...rest }: Props) {
  const id = String(serviceSelected?.id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  const newServices = project?.services?.filter(
    (service) => service.id !== serviceSelected?.id
  ) as Service[];

  newServices?.push({
    id,
    name: name || String(serviceSelected?.name),
    description: description || String(serviceSelected?.description),
    cost: cost || String(serviceSelected?.cost),
  });

  const serviceCost = Number(cost) - Number(serviceSelected?.cost);
  const budgetProject = Number(project?.budget) - serviceCost;

  async function handleUpdateService() {
    try {
      await api.put(`/projects/${project?.id}`, {
        ...project,
        budget: budgetProject,
        services: [...newServices],
      });

      fetchProduct();

      toast.success("Serviço editado com sucesso!", {
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

  return (
    <Modal {...rest}>
      <Modal.Header closeButton>
        <Modal.Title>{serviceSelected?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nome do Serviço:</Form.Label>
            <Form.Control
              defaultValue={serviceSelected?.name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Insira o nome do serviço..."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descrição do Serviço:</Form.Label>
            <Form.Control
              defaultValue={serviceSelected?.description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Insira a descrição do serviço..."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Preço do Serviço:</Form.Label>
            <Form.Control
              defaultValue={serviceSelected?.cost}
              onChange={(event) => setCost(event.target.value)}
              placeholder="Insira o preço do serviço..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-start">
        <Button variant="dark" onClick={handleUpdateService}>
          Editar Serviço
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
