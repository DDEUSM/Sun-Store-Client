import { PropsWithChildren } from "react";
import UxIcons from "../../../assets/ui/ux-icons";

type Props = {
    windowStatus: boolean;
}

export default function({ children, windowStatus }: PropsWithChildren & Props)
{    
    return(
        <div className={`fixed top-[56px] left-0 ${windowStatus?(``):(`
        translate-x-[-240px] md:translate-x-0`)} flex flex-col items-center w-60 h-[100svh] bg-white rounded gap-4 ease-in-out duration-100   md:justify-start md-2:px-2 md:gap-1 md:w-full md:h-[80px] md:static md:flex-row md:bg-gray`}> 
                                                      
            { children }
                 
        </div>
    )
}
