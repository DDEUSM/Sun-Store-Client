import { useLocation, Link, useParams, useSearchParams } from "react-router-dom";
import useRootStateSelector from "../redux/hookRootState/RootStateSelector";
import { setUrlJson } from "../redux/reducers/navHistoryReducer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { HistoryType } from "../types/navigation_types";
import { constructArrHistory } from "../helpers/construct_url_history";
import { UrlParamsStructureType } from "../types/navigation_types";
import { setSearchInfos } from "../redux/reducers/searchReducer";

export default function NavigationHistory(){

    const nav_history = useRootStateSelector((state) => state.nav_history);
    const dispatch = useDispatch();
    const actual_url = useLocation();
    const [ arr_nav_history, setArrHistory ] = useState<HistoryType[]>();
    const { state, category, sub_category, id } = useParams();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const search = useRootStateSelector(( state ) => state.search.params);
    const categories = useRootStateSelector(( state ) => state.categories.all_categories);


    function configNavHistory( state_arg? : string, category_arg? :string, sub_category_arg? : string,id_arg? : string ){        
        const arr_params : UrlParamsStructureType[] = [ 
            
            {
                type : "state",
                value : state_arg
            }, 
            {
                type : "category",
                value : category_arg
            },     
            {
                type : "sub_category",
                value : sub_category_arg
            },       
            {
                type : "ads",
                value : id_arg
            }                       
        ]
        .filter(item => {
            if(item.value){
                return item;
            }
        });
        let arr_history = constructArrHistory(arr_params, actual_url.search);
        console.log(arr_history);
        setArrHistory(arr_history);
    }

    useEffect(() => {                
        console.log("category_index: " + search.category_index);
        if(id){            
            configNavHistory(search.state, typeof(search.category_index) === 'number'?(categories[search.category_index].name):(undefined), sub_category?(''):(''), id);
        } else {
            configNavHistory(state, category);

            let cat_index : number | undefined;

            for(let i in categories){
                if(categories[i].name === category){
                    cat_index = Number(i);
                }
            }

            if(typeof cat_index === 'number'){
                dispatch(setSearchInfos({...search, state : state, category_index : cat_index}));
            }else{
                dispatch(setSearchInfos({
                    state : state                    
                }))
            }
        }

    }, [actual_url]);

    return (
        <div className=" relative flex items-center gap-[2px] w-full font-semibold h-[40px] px-1 text-blue1 my-1 cursor-pointer dark:text-white">
                        
            {arr_nav_history?.map(( url_json, index ) => {
                
                return (
                    <Link to={url_json.url as string} 
                    className="z-[1] flex flex-col justify-center items-center relative"
                    >
                        <div className={`flex justify-center items-center 
                        ${arr_nav_history.length-1 === index?(
                            `bg-yellow border border-yellow dark:bg-orange`
                            ):(
                                `bg-white border border-gray dark:bg-[#141B34]`
                            )} w-[155px] h-[30px] skew-x-[-20deg]`} 
                            key={index}
                        >                            
                        </div>
                        <p className={`text-center absolute text-lg font-semibold w-full whitespace-nowrap overflow-hidden text-ellipsis px-1 ${arr_nav_history.length-1 === index?(`text-white`):(`text-yellow`)} dark:text-white`}>{`${url_json.name}`}</p>                        
                    </Link>
                )
            })}
            <hr className="absolute text-center right-0 z-[0] flex w-[99%] text-darkGray"/>
        </div>
    )
}