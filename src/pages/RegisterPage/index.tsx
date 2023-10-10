import useRootStateSelector from "../../redux/hookRootState/RootStateSelector";
import { setState } from "../../redux/reducers/stateReducer";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import userAdapter from "../../adapters/userAdapter";
import stateAdapter from "../../adapters/stateAdapter";

import { useEffect, useState } from "react";
import ux_icons from "../../assets/ui/ux-icons";
import PageTitle from "../../components/PageTitle";

const mySchema = z.object({
    name : z.string().min(2, { message : 'No mínimo 2 caracteres.'}),
    email : z.string().email('Email inválido'),
    password : z.string().min(6, { message : 'No mínimo 6 caracteres.' }),
    confirmPassword : z.string(),
    state : z.string(),
})
.refine(data => data.confirmPassword === data.password, {
    message : 'Digite a mesma senha.',
    path: ['confirmPassword'],
});

export type RegisterInputs = z.infer<typeof mySchema>;

export default function RegisterNewUser(){

    const [ is_visible, setPasswordVisible ] = useState({
        password : false,
        confirmPassword : false
    });
    const[ is_loading, setLoad ] = useState(false);
    const all_states = useRootStateSelector((state) => state.state.all_states );
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>({
        resolver : zodResolver(mySchema)        
    });
    
    async function onSubmit(data : RegisterInputs){
        await userAdapter.register(data);
    };

    async function getStatesData(){
        setLoad(true);
        const result_req = await stateAdapter.getAllStates();
        dispatch(setState(result_req));
        setLoad(false);
    };

    useEffect(() => {
        if(all_states.length < 1){
            getStatesData();            
        }
    }, []);

    return(
        <div className="flex flex-col justify-center items-center gap-5 w-[400px] p-5 my-5 bg-gray dark:bg-blackBlue rounded-md border border-darkGray">
            <PageTitle>
                Faça seu cadastro
            </PageTitle>
            <form className="flex flex-col justify-center w-full gap-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full">
                    <label className="text-darkGray">Digite o seu nome completo*</label>            
                    <input className="rounded-md w-full p-2" type="text"
                        {...register('name')}
                    />
                    { errors.name?.message && <small className="text-red">{errors.name?.message}</small>}
                </div>
                <div className="w-full">
                    <label className="text-darkGray">Digite o seu melhor email*</label>
                    <input className="rounded-md w-full p-2" type="email" 
                        {...register('email')} 
                    />
                    { errors.email?.message && <small className="text-red">{errors.email?.message}</small>}
                </div>
                <div className="relative w-full">
                    <label className="text-darkGray">Digite uma senha*</label>
                    <input className="rounded-md w-full p-2" 
                        type={is_visible.password?('text'):('password')} 
                        {...register('password')}
                    />
                    <button type="button" onClick={() => 
                        setPasswordVisible({...is_visible, password : !is_visible.password})
                    }>
                    {
                        is_visible.password?(
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
                    { errors.password?.message && <small className="text-red">{errors.password?.message}</small>}
                </div>
                <div className="relative w-full cursor-pointer">
                    <label className="text-darkGray">Confirme a sua senha*</label>
                    <input className="rounded-md w-full p-2" 
                        type={is_visible.confirmPassword?('text'):('password')} 
                        {...register('confirmPassword')}
                    />
                    <button type="button" onClick={() => 
                        setPasswordVisible({...is_visible, confirmPassword : !is_visible.confirmPassword})
                    }>
                    {
                        is_visible.confirmPassword?(
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
                    { errors.confirmPassword?.message && <small className="text-red">{errors.confirmPassword?.message}</small>}
                </div>
                <div className="w-full">
                    <label className="text-darkGray" htmlFor="password-login">Escolha o seu estado*</label>
                    <select className="w-full p-2 rounded-md text-darkGray" defaultValue='Nenhum estado' {...register('state')}>
                        { all_states.map((state, index) => {
                            return(
                                <option value={state.name} key={index}>{ state.name }</option>
                            )
                        }) }
                    </select>
                    { errors.state?.message && <small className="text-red">{errors.state?.message}</small>}
                </div>
                <input 
                    className={is_loading?(
                        "w-full mt-5 py-2 bg-orange text-xl font-semibold text-white rounded-md brightness-90" 
                    ):(
                        "w-full mt-5 py-2 bg-orange text-xl font-semibold text-white rounded-md cursor-pointer hover:brightness-110 ease-in-out duration-100" 
                    )}
                    type="submit" 
                    disabled={is_loading}
                    value="Cadastrar"/>                
            </form>
            <p className="border-t border-darkGray dark:text-white">Se já possui uma conta? <Link className="text-blue1 hover:brightness-110" to='/login'>Faça login</Link></p>
        </div>
    )
}

