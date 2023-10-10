import UxIcons from "../../../../assets/ui/ux-icons";

export default function()
{   
    return(
        <div className="w-full h-[211px] bg-[#EBEBEB] border-2 border-darkGray rounded-lg p-2">
        <label htmlFor="input-file-image" className="">
            <input type="file" 
            className="hidden bg-transparent" 
            accept="image/*" 
            id="input-file-image"
            />
            <div className="flex flex-col justify-center items-center h-full w-full rounded-md border-dashed border-2 border-darkGray">
                <UxIcons.dragOrClickToAddANewImage />
                <span className="text-xl font-semibold text-black opacity-[0.25]">
                    Clique ou arraste a imagem
                </span>
            </div>
        </label>
        </div>
    )
}