import NestedCategory from "./NestedCategory";
import { useEffect, useState } from "react";
import useRootStateSelector from "../redux/hookRootState/RootStateSelector";
import { useDispatch } from "react-redux";
import { setSearchInfos } from "../redux/reducers/searchReducer";
import { Link, useNavigate, useParams } from "react-router-dom";
import ux_icons from "../assets/ui/ux-icons";

type Props = {
    windowStatus: boolean;
    type : 'Search' | 'my-ads'
}

function CategorySearch({ windowStatus, type }: Props)
{
    const[nestedState, setNewNode] = useState<JSX.Element>(<></>);
    const search_params = useRootStateSelector((state) => state.search.params);    
    const all_categories = useRootStateSelector((state) => state.categories.all_categories); 
    const { state, category, sub_category} = useParams(); 
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cat_array = [all_categories.find(cat => cat.name === category)];

    function handleClick( id : number)
    {
        dispatch(setSearchInfos({...search_params, category_index : id}));
        navigate({
            pathname : `/${type}/${search_params.state}/${all_categories[id].name}`,
            search : search_params.title?(`?title=${search_params.title}`):(``)
        },{replace : true});
    }

    useEffect(() => {
        console.log("cat_array: " + cat_array);
    }, []);
    
    return (
        <div className={`fixed md:static flex flex-col border-2 border-gray rounded-md min-w-[188px] lg:max-w-[188px]
        h-full top-[56px] md:top-auto ${windowStatus?(`left-0 md-2:left-auto`):(`translate-x-[-240px] md:translate-x-0`)} bg-white z-10 ease-in-ou duration-100`}>
            <label 
                htmlFor="" 
                className="flex justify-center items-center font-semibold text-darkGray bg-gray h-[80px] w-full px-2 rounded-md"
            >
                Busca por Sub-categorias
            </label>
            {category && 
                
                <Link to={`/${type}/${state}`} className="flex items-center text-darkGray">
                    <ux_icons.ArrowLeftIcon className="stroke-darkGray" width={28} height={26}/>
                    Voltar
                </Link>
            }
            <div className=" w-full p-1 ">                
                {cat_array[0] !== undefined?
                    (<NestedCategory data={cat_array} url={`/${type}/${state}`}  lv={0}/>)
                    :
                    (
                        <ul className="p-1 bg-[#F9F9F9] bg w-40 mr-[-20px] divide-y divide-gray border border-gray rounded-md">
                        {all_categories.map((item, index) => {
                            return (
                                <li key={index}>
                                    <div                                    
                                        className=" hover:underline cursor-pointer" 
                                        style={{
                                            color : item.color,
                                            fontWeight : "bolder"
                                        }}
                                        onClick={() => {
                                            handleClick(index)
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                </li>
                            )
                        })}
                        </ul>
                    )
                }                 
            </div>
        </div>
    )
}

export default CategorySearch;