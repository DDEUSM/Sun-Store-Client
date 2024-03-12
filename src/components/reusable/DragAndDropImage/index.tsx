import { Dispatch, useEffect, useState } from "react";
import UxIcons from "../../../assets/ui/ux-icons";
import { ErrorType } from "../../../errors/types";
import { ErrorManagement } from "../../../errors/ErrorTypeClass";

type Props = {
    register: any,
    updateState: Dispatch<React.SetStateAction<boolean>>,
}

const mimeTypes = [ "image/jpeg", "image/png", "image/webp" ]

export default function({ register, updateState }: Props)
{   
    const [ img, setImg ] = useState<any>();    
    const fileSizeAllowed = 550000;
    const [ hasAnError, setError ] = useState<ErrorType>(ErrorManagement.initialErrorState)

    function validateInputImage(e: any)
    {
        const file = e.target.files[0]        
        if (!file)
        {
            return
        }
        else if (!mimeTypes.includes(file.type))
        {
           return setError({ errorStatus: true, errorMessage: "Permitidos apenas os tipos jpeg, png e webp"})
           setImg(null);
        }
        else if (file.size > fileSizeAllowed)
        {
            return setError({ errorStatus: true, errorMessage: "Por favor, escolha um arquivo menor"})
            setImg(null);
        }                            
        updateState(true);                               
        const fileUrl = URL.createObjectURL(file)
        setImg(fileUrl);
        if (hasAnError.errorStatus)
        {
            setError(ErrorManagement.initialErrorState)
        }
    }

    useEffect(() => {
        if (hasAnError.errorStatus)
        {            
            setImg(null)
        }
    }, [hasAnError])

    return(
        <div className="w-full h-[211px] bg-[#EBEBEB] border-2 border-darkGray rounded-lg p-2">        
        <label htmlFor="input-file-image">
            <input type="file" 
            className="hidden bg-transparent" 
            accept="image/*"
            size={fileSizeAllowed} 
            id="input-file-image"            
                {...register("profileImage", { onChange: e => validateInputImage(e) })}
            />
            <div className="flex flex-col justify-center items-center h-full w-full rounded-md border-dashed border-2 border-darkGray">                
                {img? (
                    <img src={img} className="h-full w-full object-contain"/>
                ):(
                    <>
                        <UxIcons.dragOrClickToAddANewImage />
                        <span className="text-lg px-4 font-semibold text-black opacity-[0.25]">
                            Clique ou arraste a imagem
                        </span>
                        <span className="text-red text-sm">{ hasAnError?.errorMessage }</span>
                    </>
                )}
            </div>
        </label>
        </div>
    )
}