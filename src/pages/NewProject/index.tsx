import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import { Project } from "../../@types/project";
import { api } from "../../services/api";

import "react-toastify/dist/ReactToastify.css";

export function NewRegister() {
  const navigate = useNavigate();

  async function handleRegisterProject({ name, budget, category }: Project) {
    try {
      await api.post("/projects", {
        name,
        budget,
        category,
        services: [],
      });

      toast.success("Projeto cadastrado com sucesso!", {
        position: "top-right",
        autoClose: 2000,
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

  const initialValues = {
    name: "",
    budget: 1,
    category: "",
  };

  const ProjectFormValidation = Yup.object().shape({
    name: Yup.string()
      .required("O nome do projeto é um campo obrigatório!")
      .min(5, "O nome do produto deve conter no mínimo 5 characteres!"),
    budget: Yup.number()
      .required("O orçamento do projeto é um campo obrigatório!")
      .min(1, "O orçamento do projeto deve ser maior que 0!"),
    category: Yup.string()
      .required("A categoria do projeto é um campo obrigatório!"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: ProjectFormValidation,
    onSubmit: (values) => {
      const dataFormProject = {
        name: values.name,
        budget: values.budget,
        category: values.category,
        services: []
      };

      handleRegisterProject(dataFormProject);
    }
  });

  return (
    <div className="col-xl-12 d-flex justify-content-center">
      <Form id="form-register-project" onSubmit={formik.handleSubmit}>
        <h1>Criar Projeto</h1>
        <p className="fs-5 fw-800 text-muted">
          Crie seu projeto para depois adicionar os serviços
        </p>
        <Form.Group className="mb-2">
          <Form.Label>Nome do projeto:</Form.Label>
          <Form.Control
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Insira o nome do projeto"
          />
          <span className="fs-7 text-danger">{formik.errors.name}</span>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Selecione a categoria:</Form.Label>
          <Form.Select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
          >
            <option>Selecione a categoria do projeto</option>
            <option value="Infra">Infra</option>
            <option value="Desenvolvimento">Desenvolvimento</option>
            <option value="Design">Design</option>
            <option value="Planejamento">Planejamento</option>
          </Form.Select>
          <span className="fs-7 text-danger">{formik.errors.category}</span>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Orçamento do projeto:</Form.Label>
          <Form.Control
            name="budget"
            type="number"
            value={formik.values.budget}
            onChange={formik.handleChange}
            placeholder="Insira o orçamento do projeto"
          />
          <span className="fs-7 text-danger">{formik.errors.budget}</span>
        </Form.Group>
        <Button variant="dark" type="submit">
          Cadastrar
        </Button>
      </Form>
    </div>
  );
}
