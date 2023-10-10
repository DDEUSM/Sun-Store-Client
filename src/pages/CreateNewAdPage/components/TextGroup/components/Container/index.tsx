import { PropsWithChildren } from "react";

type Props = {
    className : string;
}

export default function({ children, className }: PropsWithChildren & Props)
{
    return(
        <div className={className}>
            <h2 className="absolute text-center bg-white w-12 text-md font-medium text-darkGray mt-[-19.8px]">
                Texto
            </h2>
            { children }
        </div>
    )
}