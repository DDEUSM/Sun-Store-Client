export default function() 
{
    return(
        <div className="flex-auto flex flex-col gap-1 basis-[40%]">
            <label className="text-darkGray text-sm">
                Cidade:
            </label>
            <input  
            type="text" 
            value="Jundiaí" 
            className="px-1 w-full h-[28px] rounded-md bg-[#EBEBEB]"
            />
        </div>
    )    
}