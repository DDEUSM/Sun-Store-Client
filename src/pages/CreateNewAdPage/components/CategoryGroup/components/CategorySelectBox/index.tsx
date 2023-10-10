export default function() 
{
    return(
        <div className="flex flex-col gap-1">
            <label className="text-darkGray text-sm">
                Categoria:
            </label>
            <select className="w-[163px] h-33 text-darkGray bg-gray rounded-md">
                <option selected value="Veículos">
                    Veículos
                </option>
                <option value="Moda">
                    Moda
                </option>
            </select>            
        </div>
    )    
}