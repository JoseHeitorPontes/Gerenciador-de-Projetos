import { v4 as uuidv4 } from "uuid";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Button, Form, FormProps } from "react-bootstrap";
import { toast } from "react-toastify";

import { Project } from "../../@types/project";
import { Service } from "../../@types/service";

import { api } from "../../services/api";

import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

type Props = FormProps & {
  project: Project;
  services: Service[];
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  fetchProduct: () => Promise<void>;
};

export function FormRegisterService({ project, services, show, setShow, fetchProduct, ...rest }: Props) {
  async function handleRegisterService({ id, name, description, cost }: Service) {
    const costService = Number(cost);

    if (project.budget > costService) {
      const budget = project.budget - costService;

      try {
        await api.put(`/projects/${project.id}`, {
          ...project,
          budget,
          services: [
            ...services,
            {
              id,
              name,
              description,
              cost,
            },
          ],
        });

        setShow(false);

        formik.resetForm({ values: {
          name: "",
          description: "",
          cost: 1,
        }});

        fetchProduct();

        toast.success("Serviço cadastrado com sucesso!", {
          position: "top-right",
          autoClose: 1500,
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
    } else {
      toast.error("Orçamento ultrapassado, verifique o custo do serviço!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const initialValues = {
    name: "",
    description: "",
    cost: 1,
  };

  const ServiceFormValidation = Yup.object().shape({
    name: Yup.string()
      .required("O nome do serviço é um campo obrigatório!")
      .min(5, "O nome do serviço deve conter no mínimo 5 caracteres!"),
    description: Yup.string()
      .required("A descrição do serviço é um campo obrigatório!")
      .min(5, "A descrição do serviço deve conter no mínimo 5 caracteres!"),
    cost: Yup.number()
      .required("O campo de orçamento do serviço é um campo obrigatório!")
      .min(1, "O custo do serviço deve ser maior que 0!"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: ServiceFormValidation,
    onSubmit: (values) => {
      const dataFormService = {
        id: uuidv4(),
        name: values.name,
        description: values.description,
        cost: values.cost,
      };

      handleRegisterService(dataFormService);
    }
  });

  return (
    <>
      {show && (
        <Form {...rest} onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label>Nome do Serviço:</Form.Label>
            <Form.Control
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Insira o nome do Serviço..."
            />
            <span className="text-danger">{formik.errors.name}</span>
          </Form.Group>
          <Form.Group>
            <Form.Label>Descrição do Serviço:</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Insira a descrição do Serviço..."
            />
            <span className="text-danger">{formik.errors.description}</span>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Valor do Serviço:</Form.Label>
            <Form.Control
              name="cost"
              type="number"
              value={formik.values.cost}
              onChange={formik.handleChange}
              placeholder="Insira o valor de custo do Serviço..."
            />
            <span className="text-danger">{formik.errors.cost}</span>
          </Form.Group>
          <Button type="submit" variant="dark">
            Cadastrar Serviço
          </Button>
        </Form>
      )}
    </>
  );
}
