import { Link, useParams } from "react-router-dom";
import { PropsWithChildren, ReactNode, useState } from "react";
import { CategoryType } from "../types/category_types";
import ux_icons from "../assets/ui/ux-icons";
import useRootStateSelector from "../redux/hookRootState/RootStateSelector";

type props = {
    data : CategoryType[];
    lv : any;
    url: string;    
    isOpen? : boolean;
}

function NestedCategory({data, lv, url, isOpen} : props)
{
    const title = useRootStateSelector((state) => state.search.params.title);
    const [is_open, setOpen] = useState(true);
    const level_color = ["bg-[#F9F9F9]", "bg-[#EBEBEB]", "bg-[#CFCFCF]"];
    const {state, category, sub_category} = useParams();

    if(data[0] !== undefined){
    return(
        <ul className={`p-1 ${level_color[lv]} w-40 mr-[-20px] divide-y divide-gray border border-gray rounded-md`}>            
            {data.map(( item, index ) => {                

                let config_url = `${url}/${item.name}`;                
                return(
                    <li className="">                        
                        {item.sub_category?                            
                            <>
                                <div className="flex items-center">                                    
                                    <Link 
                                    to={`${config_url}${title?(`?title=${title}`):(``)}`} 
                                    className={`hover:underline cursor-pointer`} 
                                    style={{
                                        color : item.color? (item.color) : ("black"),
                                        fontWeight : item.color? ("bolder") : ""
                                    }}>
                                        {item.name}
                                    </Link>
                                    <ux_icons.ArrowRightIcon className="stroke-darkGray cursor-pointer" width={28} height={28} onClick={() => {
                                        setOpen(!is_open);
                                    }}/>
                                    <span className="text-darkGray">
                                        {item.sub_category.length}
                                    </span>
                                </div>
                                <div className={`flex gap-2 ${is_open?(``):(`hidden`)}`}>
                                    <div className="ml-[4px] border border-gray"></div>
                                    <NestedCategory 
                                        data={item.sub_category} 
                                        isOpen={is_open} 
                                        url={config_url}
                                        lv={(lv + 1)} 
                                    />
                                </div> 
                            </>
                        :                        
                            <div className="flex">
                                <Link to={`${config_url}${title?(`?title=${title}`):(``)}`} 
                                className={`hover:underline cursor-pointer ${sub_category == item.name?(`font-bold underline`):(``)}`} 
                                style={{
                                    color : item.color? (item.color) : ("gray"),
                                    fontWeight : item.color? ("bolder") : ""
                                }}>
                                    {item.name}
                                </Link>                            
                            </div>                                                    
                        }
                    </li>
                )
            })}
        </ul>
    )}else{
        return null;
    }
}

export default NestedCategory;