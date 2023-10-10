import { ReactNode, useState } from "react";
import ux_icons from "../assets/ui/ux-icons";
import { AdsType } from "../types/ads_types";

type Props = {
    qtdPages : number;
    Children : ReactNode;    
}

export default function Carrousel({ qtdPages, Children } : Props){

    const [page_status, updateStatus] = useState(0);
    const count_pages = qtdPages > 0?(statusCarrousel()):([]);


    function statusCarrousel(){
        let array_jsx = [];
        let count_pages = qtdPages / 5;
        count_pages = Number.isInteger(count_pages)?(count_pages):(Math.floor(count_pages) + 1);
        for(let i=0; i < count_pages; i++){
            array_jsx.push(
            <div className={`text-center h-5 w-10 border-2 border-gray rounded-lg ease-in duration-300`} key={i}>                
            </div>
            )
        }
        return array_jsx;
    }

    return (
        <>   
            <button className="absolute left-1 z-10 bg-yellow border border-gray rounded-lg" onClick={() => {
                page_status > 0?(updateStatus(page_status - 1)):(null);
            }}>
                <ux_icons.ArrowLeftIcon className='stroke-white' height={55} width={55}/>
            </button>                    
            <button className="group absolute right-1 z-10 bg-yellow border border-gray rounded-lg" onClick={() => {
                page_status < count_pages.length-1?(updateStatus(page_status + 1)):(null);
            }}>
                <ux_icons.ArrowRightIcon className='stroke-white' height={55} width={55}/>
            </button>
            <div className={`flex gap-5 ml-2 ease-in-out duration-500 translate-x-[-${page_status * 1300}px]`}>         
                { Children }            
            </div>                         
            <div className="flex justify-center items-center gap-2 py-4">
                    {count_pages.map((item, index) => {
                        return (
                            index === page_status? <div className={`text-center h-5 w-10 bg-orange border border-orange rounded-lg ease-in duration-300`} key={index}>
                            </div> : item
                        )
                    })}
            </div>                
        </>
    )
}