import { ButtonNavigate } from "../../components/ButtonNavigate";

export function Home () {
    return (
        <div className="col-xl-12 text-center">
            <h1>Bem-vindo</h1>
            <p>Começe a gerenciar seus projetos agora mesmo!</p>
            <ButtonNavigate
                data-cy="new-project-button"
                textButton="Novo Projeto"
                navigateLink="/novo-projeto"
            />
        </div>
    );
}