import { useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import c from './components/AllComponents';

import social_media_icons from './assets/ui/social-media-icons';
import sun_store_icons from './assets/ui/sun-store-icons';
import ux_icons from './assets/ui/ux-icons';

import AllRoutes from './routes';

function App()
{
  const [darkTheme, setDarkTheme] = useState(false);

  function swapTheme(event: React.MouseEvent<HTMLDivElement>)
  {
    let theme = event.currentTarget;
    let doc = document.documentElement;
    if(theme.classList.contains('dark-theme'))
    {
        doc.classList.add('dark');
        setDarkTheme(true);
    }
    else
    {
        doc.classList.remove('dark');
        setDarkTheme(false);            
    }        
}  

  const[buttonToTop, setButtonToTop] = useState(false);  
  window.addEventListener('scroll',() => {
    const buttonOn = window.scrollY >= 140? true : false;    
    setButtonToTop(buttonOn);
  });
  
  function toTop()
  {
    scroll.scrollTo(0);    
  };

  return (
    <div className='flex flex-col items-center justify-center bg-white min-h-[100svh] px-2 font-Poppins dark:bg-gradient-to-r from-[#141B34] from-70% to-[#1A1A1B] duration-300 ease-in overflow-x-hidden'>
      <c.Header swapTheme={swapTheme}/>      
      <main className='flex flex-col items-center justify-start mt-[56px] w-full min-h-[70svh]   md:max-w-[877px]'>
        <AllRoutes />
      </main>
      
      <button className={`fixed bottom-20 right-20 hidden md:flex justify-center items-center h-20 w-20 bg-orange text-white rounded-md shadow-2xl z-10 hover:brightness-110 ease-in-out duration-150 ${buttonToTop?(`opacity-1`):(`opacity-0 z-[-1]`)}`} onClick={toTop}>
        <ux_icons.ArrowTopIcon className='stroke-white duration-150 ease-in-out' width={50} height={50}/>
      </button>
      
      <footer className='relative bottom-0 flex items-center justify-center w-full h-[20svh] bg-gray dark:bg-darkGray mb-[55px]   md:mb-0'>
          <div className='grid grid-rows-3 grid-cols-4 items-center justify-center h-28 lg:w-1/2 lg:h-24 mx-2'>
            {darkTheme?(
              <sun_store_icons.SunEclipseIcon className='w-[57px] h-[45px] flex justify-center items-center col-span-1 row-span-full'/>  
            ):(
              <sun_store_icons.SunStoreIcon className='w-[full] h-[40px] flex justify-center items-center col-span-1 row-span-full'/>  
            )}
            
            <a href='#' className='col-start-2 col-end-2 row-start-1 row-end-1 flex items-start justify-start text-grayDark text-sm leading-[15px] h-10 '>Regras de Uso</a>
            <a href='#' className='col-start-2 col-end-2 row-start-2 row-end-2 flex items-start justify-start text-grayDark text-sm leading-[15px] h-10 '>Ajuda & Contato</a>
            <a href='#' className='col-start-3 col-end-3 row-start-1 row-end-1 flex items-start justify-start text-grayDark text-sm leading-[15px] h-10 '>Sobre Nós</a>
            <a href='#' className='col-start-3 col-end-3 row-start-2 row-end-2 flex items-start justify-start text-grayDark text-sm leading-[15px] h-10 '>Termos de Uso</a>
            <a href='#' className='col-start-3 col-end-3 row-start-3 row-end-3 flex items-start justify-start text-grayDark text-sm leading-[15px] h-10 '>Regiões do Mapa</a>                        
            <div className='col-start-4 flex flex-col justify-start items-center gap-1 leading-[15px] mb-[-65px] '>              
              <a href='https://pt-br.facebook.com/' target='_blank'>
                <social_media_icons.FacebookIcon className='w-[30px] h-[30px]'/>
              </a>
              <a href='https://www.instagram.com/' target='_blank' >
                <social_media_icons.InstagramIcon className='w-[30px] h-[30px]'/>
              </a>            
              <a href='https://twitter.com/' target='_blank'>
                <social_media_icons.TwitterIcon className='w-[30px] h-[30px]'/>
              </a>
            </div>
          </div>
        </footer>  
    </div>
  )
}

export default App;