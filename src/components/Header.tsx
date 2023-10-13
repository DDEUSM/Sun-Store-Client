import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import ux_icons from '../assets/ui/ux-icons';
import user_icons from '../assets/ui/user-icons';
import sun_store_icons from '../assets/ui/sun-store-icons';
import theme_icons from '../assets/ui/theme-icons';
import useRootStateSelector from '../redux/hookRootState/RootStateSelector';
import { useDispatch } from 'react-redux';
import { updateLoginStatus } from '../redux/reducers/loginStatusReducer';

type Props = {
    swapTheme: (e: React.MouseEvent<HTMLDivElement>) => void
}

export default function Header({swapTheme}: Props)
{
    const [listMyAccount, openListMyAccount] = useState(false);
    const [listAboutMe, openListAboutMe] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);
    const dispatch = useDispatch();
    const logged = localStorage.getItem("userName")? (true):(false);
    const isLogged = useRootStateSelector((state) => state.login_status);
    const [navIsOpen, openNav] = useState(false);    
    const navRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    function logout()
    {
        localStorage.clear();
        dispatch(updateLoginStatus(false));        
    }

    function openList(listName : string)
    {    
        listName === 'myAccount'? (
            openListMyAccount(!listMyAccount)
        ):(
            openListAboutMe(!listAboutMe)
        )
    } 
    
    
    useEffect(() => {
    },[isLogged]);

    return (
        <header className='fixed flex items-center top-0 w-full h-[56px] px-2 text-black bg-white dark:border-orange dark:bg-gradient-to-r from-[#141B34] from-70% to-[#1A1A1B] z-10    md:border-b-2 md:border-b-yellow'>
            {document.documentElement.classList.contains("dark")? (
                <Link to='/'>
                    <sun_store_icons.SunEclipseIcon 
                    className="w-[57px] h-[45px]"
                    />
                </Link>
            ):(
                <Link to='/'>
                    <sun_store_icons.SunStoreIcon 
                    className="w-[57px] h-[45px]"
                    />
                </Link>                
            )}          
            <nav ref={navRef} className={`${navIsOpen?(
                ``      
            ):(
                `mr-[-164px]`
            )} fixed top-[0px] right-[0px] flex flex-col gap-4 items-center w-[164px] h-[100svh] p-1 dark:text-white bg-white shadow-md ease-in-out duration-100 focus:bg-orange    md:top-auto md:right-2 md:flex-row md:w-auto md:h-auto md:mr-auto md:p-0 md:shadow-none md:bg-transparent`}
                onBlur={() => openNav(false)}
            >   
                {navIsOpen?(
                    <button className='fixed right-2 top-3 flex justify-center items-center h-[28px] w-[28px] text-3xl font-light text-orange rounded shadow-lg     md:hidden'
                    onClick={e => {                          
                        openNav(!navIsOpen);                                                           
                    }}
                    >
                        x
                    </button>
                ):(
                    < ux_icons.MenuIcon 
                        className='fixed right-2 top-3 h-[30px] w-[30px] stroke-darkGray    md:hidden'
                        onClick={e => {                          
                            openNav(!navIsOpen);                                                           
                        }}
                    />                  
                )}    
                        
                {logged? (
                    <>
                        <Link to='/my-account' className=''>
                            {localStorage.getItem('profile_img')?(
                                <div className='flex flex-col gap-1 justify-center items-center text-center border-b border-b-gray pb-1     md:border-none'>

                                    <div className='w-[45px] h-[45px] border border-black rounded-full  sm:  md:'                                    
                                    >
                                        <img 
                                            src={ localStorage.getItem('profile_img') as string } 
                                            alt="user img" 
                                            className="object-cover w-full h-full rounded-full border border-darkGray"
                                        />
                                    </div>

                                    <h2 className='text-sm font-medium text-darkGray leading-[1rem] md:hidden'>
                                        { localStorage.getItem("userName") }
                                    </h2>

                                </div>
                            ):(
                                <user_icons.UserIcon className='stroke-black dark:stroke-white'/>
                            )}
                        </Link>

                        <Link to="/" className='group hover:text-orange overflow-hidden'>
                            Início
                            <div className='w-full h-[2px] ml-[-100%] bg-orange rounded group-hover:ml-[0] duration-200 ease-in'></div>
                        </Link>

                        <div className='relative flex-col group justify-center'>
                            <div className='hidden md:flex'>
                                <p
                                    className='cursor-pointer duration-100 ease-in-out group-hover:text-orange'
                                >
                                    Minha conta
                                </p>
                                <ux_icons.ArrowDownIcon  width={32} height={32} 
                                    className='arrow-down stroke-black rounded dark:stroke-white duration-100 ease-in-out group-hover:fill-orange group-hover:stroke-orange group-hover:stroke-white' 
                                    onClick={() => {openList('myAccount')}}
                                                                     
                                />
                            </div>                            
                            <div className={`${listMyAccount?'flex items-center justify-center': 'md:hidden'} top-full h-[110px] shadow-md w-[132px] py-1 text-blueBg bg-white border border-gray rounded-md dark:bg-gray md:absolute`}>
                                <ul className='flex flex-col text-right w-full p-1 divide-y divide-gray'>
                                    <Link to="/my-account" className='w-full rounded cursor-pointer hover:text-orange'>
                                        Meus Dados
                                    </Link>
                                    <Link to="/my-ads/Todos" className='rounded cursor-pointer hover:text-orange'>
                                        Meus Anúncios
                                    </Link>
                                    <Link to="/my-favorite-ads/Todos" className='rounded cursor-pointer hover:text-orange'>
                                        Meus Favoritos
                                    </Link>
                                    <li className='text-center w-full rounded cursor-pointer text-orange'>
                                        <button onClick={() => {
                                            logout()
                                            navigate("/login")
                                        }}>
                                            Sair
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>                            
                        <Link to='/help' className='helpAnchor duration-100 ease-in-out group hover:text-orange overflow-hidden'>
                            Ajuda
                            <div className='w-full h-[2px] ml-[-100%] bg-orange rounded group-hover:ml-[0] duration-200 ease-in'></div>
                        </Link>
                        <Link to='/create-new-ad' className='btnAddPost px-5 py-1 text-white bg-orange rounded-lg duration-100 ease-in hover:brightness-110'>
                            Novo Post+
                        </Link>                        
                    </>
                ):(
                    <>
                        <Link to='/login' className='group ease-in-out duration-100 mt-3 hover:text-orange overflow-hidden md:mt-0'>
                            Entrar
                            <div className='w-full h-[2px] ml-[-100%] bg-orange rounded group-hover:ml-[0] ease-in duration-200'></div>
                        </Link>
                        <Link to='/register' className='group ease-in-out duration-100 hover:text-orange overflow-hidden'>
                            Cadastrar-se
                            <div className='w-full h-[2px] ml-[-100%] bg-orange rounded group-hover:ml-[0] ease-in duration-200'></div>
                        </Link>
                    </>
                )}

                <div className='darkAndLight flex gap-1 items-center justify-center w-14 h-7 bg-yellow rounded-2xl dark:bg-white'>   
                    <div className='light-theme w-6 h-6 bg-white stroke-yellow rounded-full cursor-pointer duration-300 ease-in hover:stroke-orange' onClick={e => swapTheme(e)}>
                        <theme_icons.LightIcon />
                    </div>
                    <div className='dark-theme w-6 h-6 stroke-white rounded-full cursor-pointer duration-300 dark:bg-blueBg ease-in hover:stroke-orange' onClick={e => swapTheme(e)}>
                        <theme_icons.DarkIcon width={23} height={23}/>
                    </div>                    
                </div>
            </nav>            
        </header>
    );
}

