import { Button, Form, FormProps } from "react-bootstrap";

import "./styles.css";

type Props = FormProps & {
  show: boolean;
};

export function FormServices({ show, ...rest }: Props) {
  return (
    <>
      {show && (
        <Form {...rest}>
          <Form.Group>
            <Form.Label>Nome do Serviço:</Form.Label>
            <Form.Control placeholder="Insira o nome do Serviço..." />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nome do Serviço:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Insira a descrição do Serviço..."
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Valor do Serviço:</Form.Label>
            <Form.Control placeholder="Insira o valor de custo do Serviço..." />
          </Form.Group>
          <Button variant="dark">Cadastrar Serviço</Button>
        </Form>
      )}
    </>
  );
}
