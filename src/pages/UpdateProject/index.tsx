import { useState, useEffect, FormEvent } from "react";

import { useParams } from "react-router-dom";

import { Button, Card, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { api } from "../../services/api";
import { useFormProject } from "../../hooks/useFormOrListProject";
import { Project } from "../../@types/project";
import { Service } from "../../@types/service";

import { ModalEditService } from "../../components/ModalEditService";
import { FormRegisterService } from "../../components/FormRegisterService";
import { ButtonDelete } from "../../components/ButtonDelete";
import { ButtonEdit } from "../../components/ButtonEdit";

import "./styles.css";

export function UpdateProject() {
  const { id } = useParams();

  const { viewForm, setViewForm } = useFormProject();

  const [project, setProject] = useState({} as Project);
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");
  const [services, setServices] = useState<Service[]>([]);

  const [totalSpend, setTotalSpend] = useState(0);

  const [showFormServices, setShowFormServices] = useState(false);

  const [showModalService, setShowModalService] = useState(false);
  const handleShowModalService = () => setShowModalService(true);
  const handleCloseModalService = () => setShowModalService(false);

  const [serviceSelected, setServiceSelected] = useState({} as Service);

  async function handleFethcDataProject() {
    const { data } = await api.get(`/projects/${id}`);

    setProject(data);
    setName(data.name);
    setBudget(data.budget);
    setCategory(data.category);
    setServices(data.services);

    const servicesArray = data.services as Service[];

    const acumulatorCostsServices = servicesArray.reduce((initialValue, service) =>initialValue + Number(service.cost), 0);
    setTotalSpend(acumulatorCostsServices);
  }

  async function handleUpdateProject(event: FormEvent) {
    event.preventDefault();

    try {
      await api.put(`/projects/${id}`, {
        name,
        budget,
        category,
        services,
      });

      setViewForm(false);
      
      toast.success("Projeto editado com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      handleFethcDataProject();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteService(idService: string) {
    Swal.fire({
      icon: "question",
      title: "Deseja excluir este projeto?",
      showCancelButton: true,
      confirmButtonText: "Excluir",
      confirmButtonColor: "#dc3545",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const newServices = project?.services?.filter((service) => service.id !== idService) as Service[];
        api.put(`/projects/${id}`, {
          ...project,
          services: [...newServices],
        });

        toast.success("Serviço deletado com sucesso!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        handleFethcDataProject();
      }
    });
  }

  useEffect(() => {
    handleFethcDataProject();
  }, []);

  return (
    <>
      <div className="border-bottom border-dark">
        <div className="d-flex justify-content-between align-items-center px-2">
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
          <Form className="col-xl-5 mb-4 px-2">
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
                value={budget}
                placeholder="Insira o orçamento do projeto..."
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
            <div className="mb-4 px-2">
              <p className="m-0">Categoria: {category}</p>
              <p className="m-0">Total de Orçamento: R$ {budget}</p>
              <p className="m-0">Total Gasto: R$ {totalSpend}</p>
            </div>
          </>
        )}
      </div>

      <div className="border-bottom border-dark">
        <div className="d-flex justify-content-between align-items-center my-2 px-2">
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
        <FormRegisterService
          project={project}
          show={showFormServices}
          setShow={setShowFormServices}
          className="col-xl-5 mb-4 px-2"
          fetchProduct={handleFethcDataProject}
        />
      </div>

      <ModalEditService
        id="modal-edit-service"
        show={showModalService}
        onHide={handleCloseModalService}
        project={project}
        serviceSelected={serviceSelected}
        fetchProduct={handleFethcDataProject}
      />

      <div className="col-xl-12">
        <div className="px-2 mt-2">
          <h2>Serviços</h2>
        </div>
        <div className="d-flex flex-wrap">
          {!services?.length ? (
            <h5 className="px-2 text-secondary text-center">
              Sem serviços cadastrados para este projeto!
            </h5>
          ) : (
            <>
              {services?.map((service) => (
                <div
                  key={service.id}
                  className="col-xl-4 d-flex justify-content-center"
                >
                  <Card className="card-service">
                    <Card.Header className="bg-dark">
                      <Card.Title className="text-warning">
                        {service.name}
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <p>{service.description}</p>
                      <p>Custo: R${service.cost}</p>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-end">
                      <ButtonDelete content="Excluir" onClick={() => handleDeleteService(service.id)} />
                      <ButtonEdit
                        content="Editar"
                        onClick={() => {
                          handleShowModalService();
                          setServiceSelected(service);
                        }}
                      />
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
