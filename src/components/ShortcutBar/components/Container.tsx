import { PropsWithChildren } from "react";

export default function({ children }: PropsWithChildren)
{
 return(
    <div className="fixed bottom-0 flex gap-10 justify-center items-center w-full h-[55px] bg-white z-[30] dark:bg-gradient-to-r from-[#141B34] from-70% to-[#1A1A1B]    md:hidden">
        { children }
    </div>
 )
}