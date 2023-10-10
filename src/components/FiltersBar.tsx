function Filters(){
    return(
        <div className="flex justify-end items-center w-full h-[80px] py-2 px-5 bg-gray rounded gap-2">
            <label htmlFor="id_filtros" className="font-semibold text-darkGray">Filtros</label>
            <div className='flex gap-1 justify-center items-center'>
                <p className='text-darkGray'>De</p>
                <label className='text-darkGray font-semibold bg-white p-1 rounded'>R$</label>
                <input 
                    className='text-darkGray w-40 p-1 rounded'
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
                <p className='text-darkGray'>até</p>
                <label className='text-darkGray font-semibold bg-white p-1 rounded'>R$</label>
                <input 
                    className='text-darkGray w-40 p-1 rounded'
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
            <label htmlFor="id_filter" className="font-semibold text-darkGray">Ordenação</label>
            <select name="ordenacao" 
                id="id_ordenacao" 
                className="text-darkGray w-40 p-1 rounded"
                onChange={event => {                                
                    setSearchParams({"order" : event.target.value})
                }}
                defaultValue={order}
            >                
                { sort_list.map((sort_method, index) => {
                    return(
                        <option key={index} value={ sort_method.value }>{ sort_method.type }</option>
                    )
                })}
            </select>
        </div>
    )
}

export default Filters;