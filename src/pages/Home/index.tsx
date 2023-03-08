import { ButtonNewProject } from "../../components/ButtonNewProject";

export function Home () {
    return (
        <div className="col-xl-12 text-center">
            <h1>Bem-vindo</h1>
            <p>Começe a gerenciar seus projetos agora mesmo!</p>
            <ButtonNewProject /> 
        </div>
    );
}