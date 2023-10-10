import { Dispatch, SetStateAction } from "react";
import UxIcons from "../../../assets/ui/ux-icons";
import { animateScroll as scroll } from 'react-scroll';


type Props = {
    type: "openCategorySearch" | "toSearchBar" | "openFilters" | "openMenu";
    openWindow: () => void;
    isActivated: boolean;    
}

export default function({ type, openWindow, isActivated }: Props)
{        
    function definesIcon()
    {
        switch(type)
        {
            case "openCategorySearch":
                return <UxIcons.CategorySearchShortcutIcon 
                className={`${isActivated?(`stroke-white fill-orange`):(`stroke-darkGray dark:stroke-gray`)}`}/>
                break;
            case "toSearchBar":
                return <UxIcons.SearchShortcutIcon 
                className={`${isActivated?(`stroke-white fill-orange`):(`stroke-darkGray dark:stroke-gray`)}`}/>
                break;
            case "openFilters":
                return <UxIcons.FilterShortcutIcon 
                className={`${isActivated?(`stroke-white fill-orange`):(`stroke-darkGray dark:stroke-gray`)}`}/>
                break;
            case 'openMenu':
                return <UxIcons.CategorySearchShortcutIcon 
                className={`${isActivated?(`stroke-white fill-orange`):(`stroke-darkGray dark:stroke-gray`)}`}/>
                break;
        }
    }

    function definesText()
    {
        switch(type)
        {
            case "openCategorySearch":
                return "Categoria"
                break;
            case "toSearchBar":
                return "Pesquisa"
                break;
            case "openFilters":
                return "Filtros"                    
                break;
            case "openMenu":
                return "Menu"
                break;
        }
    }

    function toTop()
    {
        scroll.scrollTo(0);
        openWindow();
    };

    return(        
        <button className="flex flex-col items-center w-[74px]"
            onClick={type === "toSearchBar"?(
                    toTop
                ):(
                    openWindow
                )}
        >
            { definesIcon() }
            <p className={`text-sm ${isActivated?(`text-orange font-semibold`):(`text-darkGray dark:text-gray`)}`}>
                { definesText() }
            </p>                
        </button>                    
    )
}