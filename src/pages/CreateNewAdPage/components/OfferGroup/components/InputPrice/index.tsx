export default function() 
{
    return(
        <div className="flex flex-col gap-1">
            <label className="text-darkGray text-sm">
                Preço:
            </label>
            <div className="flex bg-[#EBEBEB] max-w-[365.67px] h-[28px] rounded-md">
                <div className="flex-none flex justify-center items-center w-[28px] h-[28px] text-darkGray font-bold bg-gray rounded-md">
                    R$
                </div>
                <input  
                type="number" 
                value="1100.00" 
                className="px-1 bg-[#EBEBEB] rounded-md w-full"
                />
            </div>
        </div>
    )    
}