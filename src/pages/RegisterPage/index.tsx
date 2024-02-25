import useRootStateSelector from "../../redux/hookRootState/RootStateSelector";
import { setState } from "../../redux/reducers/stateReducer";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import userAdapter from "../../adapters/userAdapter";
import stateAdapter from "../../adapters/stateAdapter";

import { useEffect, useState } from "react";
import ux_icons from "../../assets/ui/ux-icons";
import PageTitle from "../../components/PageTitle";
import MyDatepicker from "../../components/reusable/Datepicker";
import { isNumber } from "../../utils/utils";
import options from "tailwind-datepicker-react/types/Options";

function currentDate()
{
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()
    return new Date(year, month, day)
}

const mySchema = z.object({
    name : z.string().min(2, { message : 'No mínimo 2 caracteres.'}),
    birth : z.date().max(currentDate()),
    cpf : z.string().max(14, {message: 'Deve ser um cpf válido!'}), 
    sex: z.string(),
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

export default function RegisterNewUser()
{    
    const[ is_loading, setLoad ] = useState(false);
    const [ selectedSex, setSex ] = useState<any>(
        {
            "feminino" : false,
            "masculino": false
        }
    );

    const all_states = useRootStateSelector((state) => state.state.all_states );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<RegisterInputs>({
        resolver : zodResolver(mySchema),
        defaultValues: {
            state: "Acre",
            birth: currentDate()
        }
    });

    async function onSubmit(data : RegisterInputs)
    {
        setLoad(true);
        const newUser = await userAdapter.register(data);
        localStorage.setItem("newUserId", newUser.id)
        setLoad(false);
        navigate(`/register/upload-image/${newUser.id}`);
    };

    const { onChange, onBlur, name, ref } = register("cpf");

    const [ is_visible, setPasswordVisible ] = useState({
        password : false,
        confirmPassword : false
    });

    function birthDateHandler(date: Date)
    {        
        setValue("birth", date)
    }

    function cpfMask(value)
    {
        let rawValue = value.replace(".", "")
        rawValue = rawValue.replace("-", "")
        if (!isNumber(rawValue) && rawValue.length > 0)
        {
            setValue("cpf", getValues("cpf"))                       
        }
        else if (value.length < getValues("cpf").length)
        {
            setValue("cpf", value)
        }
        else if (value.length === 3 || value.length === 7)
        {
            setValue("cpf", value+".")
        }
        else if (value.length === 11)
        {
            setValue("cpf", value+"-")
        }
        else
        {
            setValue("cpf", value)
        }
    }    

    async function getStatesData()
    {
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

    useEffect(() => {

    }, [selectedSex])

    return(
        <div className="flex flex-col justify-center items-center gap-5 w-[400px] p-5 my-5 bg-gray dark:bg-blackBlue rounded-md border border-darkGray">
            <PageTitle>
                Faça seu cadastro
            </PageTitle>
            <form className="flex flex-col justify-center w-full gap-3" 
            onSubmit={handleSubmit(onSubmit)}
            >
                <div className="w-full">
                    <label className="text-darkGray">Digite o seu nome completo*</label>            
                    <input className="rounded-md w-full p-2" type="text"
                        {...register('name')}
                    />
                    { errors.name?.message && <small className="text-red">{errors.name?.message}</small>}
                </div>
                <div className="w-full">
                    <label className="text-darkGray">Escolha sua data de nascimento*</label>            
                    <MyDatepicker birthDateHandler={birthDateHandler}/>
                    { errors.birth?.message && <small className="text-red">{errors.birth?.message}</small>}
                </div>
                <div className="w-full">
                    <label className="text-darkGray">Digite o seu cpf*</label>
                    <input className="rounded-md w-full p-2" type="text"                                            
                    onChange={e => cpfMask(e.target.value)}                        
                    name={name}
                    ref={ref}
                    maxLength={14}                                       
                    />
                    { errors.cpf?.message && <small className="text-red">{errors.cpf?.message}</small>}
                </div>
                <div className="flex flex-wrap w-full">
                    <label className="text-darkGray w-full">
                        Escolha o seu sexo*
                    </label>
                    <div className="flex gap-1 w-2/4">
                        <input className="" 
                        value="Masculino" 
                        type="checkbox" 
                        checked={selectedSex.masculino? true : false}
                        onChange={e => (setValue("sex", "masculino"), setSex({masculino: true, feminino: false}))}                         
                        />
                        <label htmlFor="">Masculino</label>
                    </div>
                    <div className="flex gap-1">
                        <input className="" 
                        value="Feminino" 
                        type="checkbox"                         
                        checked={selectedSex.feminino? true : false }
                        onChange={e => (setValue("sex", "feminino"), setSex({masculino: false, feminino: true}))}                        
                        />
                        <label htmlFor="">Feminino</label>
                    </div>
                    { errors.sex?.message && <small className="text-red">{errors.sex?.message}</small> }
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
                    <select className="w-full p-2 rounded-md text-darkGray" {...register('state')}>
                        { all_states.map((state, index) => {
                            return (
                                <option value={state.name} key={index}>
                                    { state.name }
                                </option>
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
                    value="Cadastrar"
                />                
            </form>
            <p className="border-t border-darkGray dark:text-white">Se já possui uma conta? <Link className="text-blue1 hover:brightness-110" to='/login'>Faça login</Link></p>
        </div>
    )
}

