import { PropsWithChildren } from "react";
import UxIcons from "../../../assets/ui/ux-icons";

type Props = {
    title: string
}

export default function({ title }: Props){
    return (
        <div className="flex justify-center items-center w-full md:w-auto h-[80px] font-semibold text-darkGray bg-gray rounded-t-md gap-1">
                                     
            <h3 className="md:hidden md:w-auto">
                { title }                
            </h3>
               
        </div>
    )
}