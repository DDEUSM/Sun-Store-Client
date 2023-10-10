export default function() 
{
    return(
        <div className="flex flex-col gap-1">
            <label className="text-darkGray text-sm">
                Título:
            </label>
            <input  
            type="text" 
            value="Hello" 
            className="px-1 w-full h-[28px] rounded-md bg-[#EBEBEB]"
            />
        </div>
    )    
}