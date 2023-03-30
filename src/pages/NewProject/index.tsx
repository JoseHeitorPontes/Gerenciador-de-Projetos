import { FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import { api } from "../../services/api";

import "react-toastify/dist/ReactToastify.css";

export function NewRegister() {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  async function handleRegisterProject(event: FormEvent) {
    event.preventDefault();

    try {
      await api.post("/projects", {
        name,
        budget,
        category,
        services: [],
      });

      setName("");
      setBudget("");
      setCategory("");

      toast.success("Projeto cadastrado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/projetos");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="col-xl-12 d-flex justify-content-center">
      <Form id="form-register-project">
        <h1>Criar Projeto</h1>
        <p className="fs-5 fw-800 text-muted">
          Crie seu projeto para depois adicionar os serviços
        </p>
        <Form.Group className="mb-2">
          <Form.Label>Nome do projeto:</Form.Label>
          <Form.Control
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Insira o nome do projeto"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Orçamento do projeto:</Form.Label>
          <Form.Control
            type="number"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            placeholder="Insira o orçamento do projeto"
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
        <Button variant="dark" type="submit" onClick={handleRegisterProject}>
          Cadastrar
        </Button>
      </Form>
    </div>
  );
}
