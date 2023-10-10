export default function() 
{
    return(
        <div className="flex-auto flex flex-col gap-1 basis-[26%]">
            <label className="text-darkGray text-sm">
                Número:
            </label>
            <input  
            type="text" 
            value="Hello" 
            className="px-1 w-full h-[28px] rounded-md bg-[#EBEBEB]"
            />
        </div>
    )    
}