export default function() 
{
    return(
        <div className="flex flex-col gap-1 w-full">
            <label className="text-darkGray text-sm">
                Nome da rua:
            </label>
            <input  
            type="text" 
            value="Hello" 
            className="px-1 w-full h-[28px] rounded-md bg-[#EBEBEB]"
            />
        </div>
    )    
}