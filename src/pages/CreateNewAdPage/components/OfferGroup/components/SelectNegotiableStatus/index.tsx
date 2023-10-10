export default function() 
{
    return(
        <div className="flex flex-col gap-1">
            <label className="text-darkGray text-sm">
                Negociável:
            </label>
            <select className="w-[100px] h-33 text-darkGray bg-[#EBEBEB] rounded-md">
                <option selected value="Sim">
                    Sim
                </option>
                <option value="Não">
                    Não
                </option>
            </select>            
        </div>
    )    
}