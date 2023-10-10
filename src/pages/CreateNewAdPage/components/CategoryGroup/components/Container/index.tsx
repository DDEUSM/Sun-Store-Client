import { PropsWithChildren } from "react";

export default function({ children }: PropsWithChildren)
{
    return(
        <div className="flex flex-col w-full border-2 border-darkGray rounded-lg p-2 gap-2">
            <h2 className="absolute text-center bg-white px-1 text-md font-medium text-darkGray mt-[-19.8px]">
                Categorias
            </h2>
            { children }
        </div>
    )
}