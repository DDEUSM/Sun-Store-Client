import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import useRootStateSelector from '../redux/hookRootState/RootStateSelector';
import { useDispatch } from 'react-redux';
import { setSearchInfos } from '../redux/reducers/searchReducer';

import { CategoryType } from '../types/category_types';
import { SearchReducertype } from '../types/search_types';
import UxIcons from '../assets/ui/ux-icons';

type FormData = SearchReducertype;

type Props = {
    searchType: "Search" | "my-ads" | "my-favorite-ads"
}

export default function FormSearchResult({ searchType }: Props)
{    

    //navigation
    const navigate = useNavigate();

    //Redux States
    const states_data = useRootStateSelector(( state ) => state.state);
    const categories_data = useRootStateSelector(( state ) => state.categories);
    const search = useRootStateSelector((state) => state.search);
    const [searchMode, setSearchMode] = useState(false);
    //Redux dispatch
    const dispatch = useDispatch();    

    //UseForm
    const { register, handleSubmit, getValues } = useForm<FormData>();

    const onSubmit = handleSubmit((data) => {        
        let { state, title, category_index } = data;                         
        dispatch(setSearchInfos({...search.params, state, title, category_index}));
        navigate({
            pathname : `/${searchType}/${state}${category_selected?(`/${category_selected.name}`):(``)}`, 
            search : `?order=most-relevant-first${data.title?(`&title=${title}`):(``)}`
        }, { replace : true});        
    });
    
    // state para category
    const [category_selected, setCategory] = useState<CategoryType | undefined>(search.params.category_index?
        (categories_data.all_categories[search.params.category_index]):(undefined));
    
    useEffect(() => {        
        if(search.params.category_index){
            setCategory(categories_data.all_categories[search.params.category_index]);
        }
    },[search.params.category_index]);

    return (
        <div className='flex justify-center w-full'>
            <div className='flex items-center w-full h-[49px] rounded-[8px] bg-yellow mb-[10px]  md:mb-[20px] md:h-20 md:rounded-lg dark:bg-orange md:mt-4 lg:min-w-[98.5svw]'>                
                <form onSubmit={onSubmit} className='flex w-full px-2 items-center justify-center gap-1    md:px-4 md:gap-4'>
                    <select className={`${searchMode?(`hidden`):(``)} min-w-[24%] h-[35px] px-1 bg-yellow border-2 border-white rounded-lg text-white font-medium dark:bg-orange    md:h-[39px]     lg:min-w-[203px]`} 
                    {...register('state')} defaultValue={search.params.state}> 
                        <option value='Todos'>Estado</option>
                        {states_data.all_states.map(( item_state, index ) => {                                                       
                            return (                               
                                <option value={item_state.name} key={index}>
                                    {item_state.name}
                                </option>
                            );
                        })};                        
                    </select>
                    <div className='flex items-center justify-center px-1
                    py-[2px] w-[100%] md:bg-white rounded-lg    lg:w-[626px]'>
                        <div className={`flex items-center justify-center w-full bg-white rounded-lg px-2 overflow-hidden`}>
                            <input className={`lg:block w-full h-9 rounded-lg text-sm duration-200 ease-in focus:outline-none`} type='text' placeholder='Digite uma palavra chave' defaultValue={search.params.title}
                            {...register('title')} onBlur={() => setSearchMode(false)}
                            />                                                                       
                                        
                        </div>
                        <button type='submit' className='ml-2 bg-transparent md:flex md:items-center md:bg-orange md:rounded-lg md:py-1 md:px-3 hover:brightness-110'>
                            <p className=' hidden md:block md:text-white'>Pesquisar</p>
                            <UxIcons.SearchIcon className='stroke-white w-[20px] h-[25px]'/>
                        </button> 
                    </div>
                    
                </form>                
            </div>
        </div>
    )
}
