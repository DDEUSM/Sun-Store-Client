import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import PageTitle from "../../components/PageTitle";
import userAdapter from "../../adapters/userAdapter";
import { useState } from "react";
import ux_icons from '../../assets/ui/ux-icons';
import { useDispatch } from "react-redux";
import { updateLoginStatus } from "../../redux/reducers/loginStatusReducer";

export type LoginForm = {
    email : string;
    password : string;
};

export default function Login(){

    const { register, handleSubmit,formState : { errors } } = useForm<LoginForm>();
    const [ is_visible, setPasswordVisible ] = useState(false);
    const [ is_loading, setLoad ] = useState(false);
    const [ error_alert, setErrorALert ] = useState<string>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function onSubmit(data : LoginForm){
        setLoad(true);
        const result_req = await userAdapter.login(data);
        if(result_req.error){
            setErrorALert(result_req.error);
            setLoad(false);
            return;
        }else{
            const {id, name, email, token, refresh_token,profile_img } = result_req.data;
            localStorage.setItem("id", id)
            localStorage.setItem("userName", name);
            localStorage.setItem("email", email);
            localStorage.setItem("profile_img", profile_img);
            localStorage.setItem("token", token);
            localStorage.setItem("refresh_token", refresh_token);    
            setErrorALert(undefined);
            setLoad(false);
            dispatch(updateLoginStatus(true));
            navigate("/");
        }                
    };

    return(
        <div className="flex flex-col justify-center items-center w-[400px] p-5 my-5 bg-gray dark:bg-blackBlue rounded-md border border-darkGray">
            <PageTitle>
                Faça seu Login
            </PageTitle>
            
            <span className="text-red font-medium my-2">
                { error_alert }
            </span>
            
            <div className="flex flex-col gap-5 justify-center items-center mb-5">
            <form className="flex flex-col justify-center w-full gap-3" 
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="w-full">
                    <label className="text-darkGray">Digite o seu email*</label>            
                    <input className="rounded-md w-full p-2" type="email" 
                        {...register('email')}
                    />
                </div>
                <div className="relative w-full">
                    <label className="text-darkGray">Digite a sua Senha*</label>
                    <input className="rounded-md w-full p-2" 
                        type={is_visible?('text'):('password')}  
                        {...register('password')}
                    />
                    <button type="button" onClick={() => 
                        setPasswordVisible(!is_visible)
                    }>
                    {
                        is_visible?(
                            <ux_icons.HidePasswordIcon 
                                className="absolute top-7 right-1" 
                            />
                        ):(
                            <ux_icons.ShowPasswordIcon 
                                className="absolute top-6 right-1" 
                            />
                        )
                    }
                    </button>
                </div>
                <div className="flex w-full justify-start items-center gap-2">
                    <input type="checkbox" name="Lembrar" />
                    <label className="text-darkGray dark:text-white" htmlFor="">Lembrar Senha</label>                    
                </div>            
                    <input 
                        className={is_loading?(
                            "w-full py-2 bg-orange brightness-90 text-xl font-semibold text-white rounded-md ease-in-out duration-100"
                        ):(
                            "w-full py-2 bg-orange text-xl font-semibold text-white rounded-md cursor-pointer hover:brightness-110 ease-in-out duration-100"
                        )}   
                        type="submit" 
                        value="Entrar" 
                        disabled={is_loading}                        
                    />                               
            </form>
            </div>
            <p className="border-t border-darkGray dark:text-white">Não possui uma conta? <Link className="text-blue1 hover:brightness-110" to='/register'>Cadastre-se</Link></p>
        </div>
    )
}
