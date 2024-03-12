import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import PageTitle from "../../components/PageTitle";
import DragAndDropImage from "../../components/reusable/DragAndDropImage";
import ReactiveButton from "../../components/reusable/ReactiveButton";
import { useForm } from "react-hook-form";
import uploadAdapter from "../../adapters/uploadAdapter";
import { ErrorType } from "../../errors/types";
import { ErrorManagement } from "../../errors/ErrorTypeClass";
import { fetchToServer } from "../../adapters/fetchToServer";


export default function UploadPerfilImage()
{
    const [ hasAnError, setError ] = useState<ErrorType>(ErrorManagement.initialErrorState);

    const { id } = useParams();
    const [ saveIsEnable, enableSave ] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    async function onSubmit(data: any)
    {
        localStorage.removeItem("newUserId");
        const res = await fetchToServer(uploadAdapter.uploadProfileImage, [data, id]);
        if (!res.ok )
        {
            return setError(res.error)            
        }
        navigate("/login");
    }

    function skip()
    {
        navigate("/login")
    }

    useEffect(() => {
        if (localStorage.getItem("newUserId") !== id)
        {
            navigate("/register");
        } 
    }, [])

    useEffect(() => {

    }, [hasAnError])    

    return (
        <div className="flex flex-col justify-center items-center gap-5 w-[400px] p-5 my-5 bg-gray dark:bg-blackBlue rounded-md border border-darkGray">
            <PageTitle>
                Foto de Perfil
            </PageTitle>
            <form className="flex flex-wrap items-center" onSubmit={handleSubmit(onSubmit)}> 
                <label className="text-darkGray mb-2">
                    Escolha uma foto para o seu perfil
                </label>             
                <DragAndDropImage 
                    register={register} 
                    updateState={enableSave} 
                />
                <div className="flex w-full mt-4 justify-between ">
                    <button className="text-darkGray hover:text-black" onClick={e => {e.preventDefault(); skip()}}>
                        Pular etapa
                    </button>
                    <ReactiveButton 
                        text="Salvar"
                        backgrounColor="orange"
                        textcolor="white"
                        type="submit"
                        able={saveIsEnable}                        
                    />  
                </div>
            </form>
        </div>
    )
}