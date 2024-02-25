import { Link } from "react-router-dom";
import ShortcutBar from "../../components/ShortcutBar";
import { useState } from "react";
import ReactiveButton from "../../components/reusable/ReactiveButton";

export default function()
{
    const [ windowStatus, openMenu ] = useState(false);

    function openWindowMenu(){
        openMenu(!windowStatus)
    }

    return(
        <>
        
        <div className="flex justify-center w-full gap-2">
                                                      
            <div className="flex flex-col w-full shadow-lg rounded-md border border-transparent dark:border-darkGray">
                 
                <section className="flex items-center gap-2 w-full h-[270px] px-4 bg-yellow rounded-t-md dark:bg-orange">
                    <div className="flex-none w-[125px] h-[125px] rounded-full border border-white">
                        <img className=" object-cover w-full h-full rounded-full" src={localStorage.getItem("profile_img") as string} alt="profile-img" />
                    </div>
                    <div className="">
                        <h3 className="font-semibold text-[24px] text-white">
                            Seu Nível de Reputação
                        </h3>
                        <p className="font-semibold text-white">
                            Gold
                        </p>
                    </div>
                </section>
                <section className="w-full h-[50%]">
                    <h3 className="w-full px-4 py-1 text-2xl font-semibold text-yellow border-b border-gray dark:text-gray dark:border-darkGray">
                        Dados de Cadastro
                    </h3>
                    <div className="flex flex-col justify-center gap-3 p-2 px-4">
                        <div className="">
                            <label className="dark:text-gray">
                                Nome:
                            </label>
                            <p className=" font-semibold dark:text-gray">
                            { localStorage.getItem("userName") }
                            </p>
                        </div>
                        <div className="">
                            <label className="dark:text-gray">
                                Email:
                            </label>
                            <p className="font-semibold dark:text-gray">
                                { localStorage.getItem("email") }
                            </p> 
                        </div>                   
                    </div>
                    <div className="flex items-center justify-center px-4 h-20 border-t border-black bg-white">
                        <ReactiveButton 
                            text="Deletar conta"
                            textcolor="red"
                            backgrounColor="white"                            
                        />
                    </div>
                </section>
            </div>

            <ShortcutBar.ShadowBackground 
                windowStatus={windowStatus}
                closeWindow={openWindowMenu}                
            />
            <ShortcutBar.Container >                
               
                <ShortcutBar.Button 
                    type="openMenu" 
                    isActivated={windowStatus}  
                    openWindow={openWindowMenu}
                />                
            </ShortcutBar.Container>
        </div>
        </>
    )
}