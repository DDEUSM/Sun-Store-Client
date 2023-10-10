import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type Props = {
    windowStatus: boolean;
}

export default function({ windowStatus }: Props)
{
    return(                
        <nav className={`fixed left-0 md:static  ${windowStatus?(`translate-x-0 fixed md:static`):(`translate-x-[-176px] md:translate-x-0 fixed md:static`)} h-full flex flex-col gap-1 w-44 p-2 bg-white dark:bg-gradient-to-r from-[#141B34] from-70% to-[#1A1A1B] z-[2] dark:border dark:border-darkGray ease-in-out duration-100 rounded-r-md shadow-md`}>
             <Link to={"/my-account"} className="font-semibold text-orange underline underline-offset-4 hover:text-orange dark:">
                Minha Conta
            </Link>
            <Link to={"/create-new-ad"} className="hover:text-orange dark:text-white">
                Novo Anúncio
            </Link>                
            <Link to={"/my-ads/Todos"} className="hover:text-orange dark:text-white">
                Meus Anúncios
            </Link>
            <Link to={"/my-favorites"} className="hover:text-orange dark:text-white">
                Meus Favoritos
            </Link>
        </nav>        
    )
}