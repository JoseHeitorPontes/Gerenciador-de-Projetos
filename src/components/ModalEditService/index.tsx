import { useState } from "react";

import { api } from "../../services/api";
import { Service } from "../../@types/service";

import { Modal, ModalProps, Form, Button } from "react-bootstrap";

type Props = ModalProps & {
  idProduct?: string;
  service?: Service;
};

export function ModalEditService({ idProduct, service, ...rest }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  async function handleUpdateService() {
    try {
      await api.put(`/projects/${idProduct}`, {
        name,
        description,
        cost,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal {...rest}>
      <Modal.Header closeButton>
        <Modal.Title>{service?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nome do Serviço:</Form.Label>
            <Form.Control
              value={service?.name || name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Insira o nome do serviço..."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descrição do Serviço:</Form.Label>
            <Form.Control
              value={service?.description || description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Insira a descrição do serviço..."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Preço do Serviço:</Form.Label>
            <Form.Control
              value={service?.cost || cost}
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
