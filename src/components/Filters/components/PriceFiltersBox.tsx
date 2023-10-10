import { SetStateAction } from "react";
import { PriceFiltersType } from '../../../types/priceFiltersType'
import UxIcons from "../../../assets/ui/ux-icons";

type FilterStateType = {
    filter: PriceFiltersType;
    setFilter: React.Dispatch<React.SetStateAction<PriceFiltersType>>;
}

type Props = {
    filterState: FilterStateType;
}

export default function({ filterState }: Props){

    const { filter, setFilter } = filterState;
    return(
        <div className='flex flex-wrap gap-1 justify-center items-center   md:flex-nowrap'>                      

            <p className='text-center basis-full text-darkGray  md-2:basis-auto'>
                De
            </p>            
            <label className='text-darkGray font-semibold bg-white p-[2px] rounded border-2 border-gray'>
                R$
            </label>
            <input 
                className='text-darkGray w-[130px] p-1 rounded bg-gray  md:bg-white'
                type="number" 
                name='min_price'
                placeholder='Preço mínimo'                                 
                value={filter.min_price}
                onChange={event => {    
                    if(!event.target.value){
                        setFilter({...filter, min_price : undefined});
                        return;
                    }                                                 
                    const value = parseFloat(event.target.value);                                    
                    if(isNaN(value)){                            
                        return;
                    };                                    
                    setFilter({...filter, min_price : value});                      
                }}
            />
            
            <p className='text-center basis-full text-darkGray'>
                até
            </p>
            <label className='text-darkGray font-semibold bg-white p-[2px] rounded border-2 border-gray'>
                R$
            </label>
            <input 
                className='text-darkGray w-[130px] p-1 rounded bg-gray  md:bg-white'
                type="number" 
                name='max_price' 
                placeholder='Preço máximo'
                value={filter.max_price}
                onChange={event => {                                    
                    if(!event.target.value){
                        setFilter({...filter, max_price : undefined});
                        return;
                    }
                    const value = parseFloat(event.target.value);                                    
                    if(isNaN(value)){
                        return;
                    }                                    
                    setFilter({...filter, max_price : value});                                    
                }}
            />                
        </div>
    )
}