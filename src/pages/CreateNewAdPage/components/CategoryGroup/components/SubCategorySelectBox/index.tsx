export default function()
{
    return(
        <div className="flex flex-col gap-1">
            <label className="text-darkGray text-sm">
                Sub-Categoria:
            </label>
            <select className="w-[163px] h-33 text-darkGray bg-gray rounded-md">
                <option selected value="Carros">
                    Carros
                </option>
                <option value="Motos">
                    Motos
                </option>
            </select>            
        </div>
    )
}