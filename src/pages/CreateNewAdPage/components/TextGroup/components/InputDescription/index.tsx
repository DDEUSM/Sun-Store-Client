export default function()
{
    return(
        <div className="flex flex-col gap-1">
            <label className="text-darkGray text-sm">
                Descrição:
            </label>
            <textarea              
                value="" 
                className="flex justify-start items-start p-1 w-full h-[234px] rounded-md bg-[#EBEBEB] leading-4"
                placeholder="Digite a Descrição aqui"
            />
        </div>
    )
}