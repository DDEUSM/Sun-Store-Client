import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import PageTitle from "../../components/PageTitle";
import DragAndDropImage from "../../components/reusable/DragAndDropImage";
import ReactiveButton from "../../components/reusable/ReactiveButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import userAdapter from "../../adapters/userAdapter";
import uploadAdapter from "../../adapters/uploadAdapter";

export default function UploadPerfilImage()
{
    const { id } = useParams();
    const [ saveIsEnable, enableSave ] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    function onSubmit(data)
    {
        localStorage.removeItem("newUserId");
        uploadAdapter.uploadProfileImage(data, id);
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

    return (
        <div className="flex flex-col justify-center items-center gap-5 w-[400px] p-5 my-5 bg-gray dark:bg-blackBlue rounded-md border border-darkGray">
            <PageTitle>
                Foto de Perfil
            </PageTitle>
            <form className="flex flex-wrap items-center" onSubmit={handleSubmit(onSubmit)}> 
                <label className="text-darkGray mb-2">
                    Escolha uma foto para o seu perfil
                </label>             
                <DragAndDropImage register={register} updateState={enableSave}/>
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