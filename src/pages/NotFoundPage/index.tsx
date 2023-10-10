import { Link } from "react-router-dom";
function NotFound(){
    return (
        <div className="not-found flex flex-col gap-5 justify-center items-center">
            <h1 className="text-5xl text-darkGray dark:text-white">
                Ocorreu um erro 404, a página não foi encontrada!
            </h1>
            <Link to="/" className="text-2xl text-darkGray hover:text-yellow dark:text-white dark:hover:text-yellow">Voltar para a Página Inicial</Link>
        </div>
    )
}

export default NotFound;