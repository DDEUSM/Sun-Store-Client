import { Link } from 'react-router-dom';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import categoryAdapter from '../adapters/categoryAdapter';
import { CategoryDataType } from '../model/CategoriesModel';
import SunStoreIcons from '../assets/ui/sun-store-icons';


type CategoryType = {
    "_id" : ""
    name : string;
    types? : SubType[];
    color : string;
    category_icon_url : string;
    filters : string;
}

type SubType = {
    name : string;
    sub_types? : SubType[];
}

function utilsFunctions()
{
    async function getAllCategories(setCategoriesData: Dispatch<SetStateAction<CategoryType[] | undefined>>)
    {
        await categoryAdapter.getAllCategories()
        .then(categories => setCategoriesData(categories));        
    }

    function listAllCategories(categories: CategoryType[] | undefined)
    {
        return(
        <>
            {categories && categories.map((category) => {                                                
                return (
                <Link to={`/search/Todos/${category.name}`} 
                    className="group flex flex-col justify-start items-center gap-1 w-[100px] border rounded-md border-transparent ease-in-out duration-100 hover:text-lg hover:font-semibold" 
                    key={category._id}
                >
                    <div className="group flex justify-center items-center h-[54.95px] w-[54.95px] rounded-full cursor-pointer group-hover:scale-105 ease-in-out duration-100" 
                        style={{
                            backgroundColor : category.color
                        }}
                    >
                        <img className="group-hover:scale-105 ease-in-out duration-100" 
                            src={`https://sun-store-api.cyclic.cloud/${category.category_icon_url}`} 
                            alt="svg" 
                        />                                                        
                    </div>
                    <p className="font-medium text-blue1 dark:text-white cursor-pointer group-hover:scale-105 ease-in0out duration-100"
                        style={{
                            color : category.color
                        }}
                    >
                        {category.name}
                    </p>
                </Link>
                )
            })}
        </>)
    }
    return { getAllCategories, listAllCategories };
}


export default function()
{
    const [categories_data, setCategoriesData] = useState<CategoryType[]>();
    const { getAllCategories, listAllCategories } = utilsFunctions();

    useEffect(() => {
        getAllCategories(setCategoriesData);
    }, []);

    return (
        <>
            <h1 className='text-center text-3xl my-1  md:mt-0 md:mb-5 font-semibold text-yellow dark:text-white'>
                Todas as Categorias
            </h1>
            <div className="relative flex flex-wrap flex-col w-full h-auto justify-center items-start"> 
                                           
                <div className="flex gap-5 
                py-[25px] px-[10px] my-[5px] w-full rounded-lg shadow-md border border-gray dark: border-darkGray overflow-x-auto h-[140px]  min-[465px]:justify-center">
                    { listAllCategories(categories_data) }  
                </div>
                <div className="md:max-w-[877px] flex flex-col justify-center items-center h-[328px] w-full mb-10 bg-gradient-to-r from-[#0C38BF] to-[#8B1096] border-2 border-white border-dashed rounded-lg dark:border-darkGray">
                    <p className="text-white text-2xl lg:text-4xl">Venha se</p>                    
                    <p className="text-white text-3xl lg:text-[40px] font-extrabold">Desapegar</p>
                    <p className="text-white text-2xl lg:text-4xl">De tudo aquilo que te</p>
                    <p className="text-white text-3xl lg:text-[40px] font-extrabold">Prende</p>
                    <SunStoreIcons.SunStoreIconCustom />
                </div>                                              
            </div>
        </>
    )
}
