export default function() 
{
    return(
        <div className="flex-initial flex flex-col gap-1 basis-[40%]">
            <label className="text-darkGray text-sm">
                Estado:
            </label>
            <input  
            type="text" 
            value="Hello" 
            className="px-1 w-full h-[28px] rounded-md bg-[#EBEBEB]"
            />
        </div>
    )    
}