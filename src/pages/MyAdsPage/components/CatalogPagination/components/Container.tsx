import { Children, PropsWithChildren } from "react";

export default function({ children }: PropsWithChildren){
    return(
        <div className='flex h-[82px] gap-2'>
            { children }                        
        </div>
    )
}