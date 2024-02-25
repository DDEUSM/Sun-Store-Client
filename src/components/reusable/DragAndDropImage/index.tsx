import { Dispatch, useState } from "react";
import UxIcons from "../../../assets/ui/ux-icons";

type Props = {
    register: any,
    updateState: Dispatch<React.SetStateAction<boolean>>
}

export default function({ register, updateState }: Props)
{   
    const [ img, setImg ] = useState<any>();    
    
    return(
        <div className="w-full h-[211px] bg-[#EBEBEB] border-2 border-darkGray rounded-lg p-2">
        <label htmlFor="input-file-image" className="">
            <input type="file" 
            className="hidden bg-transparent" 
            accept="image/*" 
            id="input-file-image"            
            {...register("profileImage", { onChange: (e: any) => 
                {                
                    if (!e.target.files[0]) return;
                    updateState(true);                               
                    const fileUrl = URL.createObjectURL(e.target.files[0])
                    setImg(fileUrl);
                }
            })}
            />
            <div className="flex flex-col justify-center items-center h-full w-full rounded-md border-dashed border-2 border-darkGray">
                <UxIcons.dragOrClickToAddANewImage />
                {img? (
                    <img src={img} className="h-full w-full object-contain"/>
                ):(
                    <span className="text-lg px-4 font-semibold text-black opacity-[0.25]">
                        Clique ou arraste a imagem
                    </span>
                )}
            </div>
        </label>
        </div>
    )
}