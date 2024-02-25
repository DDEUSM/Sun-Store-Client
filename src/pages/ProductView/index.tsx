import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import { useParams } from "react-router-dom";
import FormSearchResult from "../../components/FormSearch";
import adsAdapter from "../../adapters/adsAdapter";
import { useEffect, useRef, useState } from "react";
import { AdsStateType, AdsType } from "../../types/ads_types";
import ads_icons from "../../assets/ui/ads-icons";
import ux_icons from "../../assets/ui/ux-icons";
import userAndAdsAdapter, { LikeAdsType } from "../../adapters/userAndAdsAdapter";
import userAdapter from "../../adapters/userAdapter";


function ImagesSlider({ads, photoIndex}: any)
{
    const [selectedPhotoIndex, setPhotoIndex] = photoIndex;
    return(
        <>
            {ads.url_image && ads.url_image.map((url: any, index: any) => 
                <div className={`flex-none h-20 w-20 bg-darkGray cursor-pointer rounded ${index === selectedPhotoIndex?(`border border-orange`):(`border border-white dark:border-gray`)}`}>
                    <img key={index} className="object-cover h-full w-full rounded" src={url} alt="ads-image" onClick={() => setPhotoIndex(index)}/>
                </div>
            )}
        </> 
    )
}

function ImageSliderMobile({ads}: any)
{
    return(
        <>
            {ads.url_image && ads.url_image.map((url: any, index: number) => 
            <SwiperSlide className='flex justify-center items-center w-[300px] h-[300px]'>
                <img className="object-cover h-full w-full" src={url} alt="" key={index}/>
            </SwiperSlide>
            )}
        </>
    )
}

function ProductView()
{
    const [ selected_photo_index, setPhotoIndex ] = useState(0);
    const { id } = useParams();
    const [ ads, setAdsInfos ] = useState<AdsType>();
    const [ hasLiked, setLike ] = useState(false);
    const [ user_creator, setUserInfos ] = useState<any>();    
    const inRequestRef = useRef(false);

    const [ownerInfosIsOpen, openOwnerInfos] = useState(false);

    function verifyIfUserIsLogged()
    {        
        if(!(localStorage.getItem("id")))
        {
            console.log("Você precisa estar logado!")
            return false;
        }
        if(!id){
            console.log("Sem anúncio")
            return false;
        }
        return true;
    }

    async function visualizeAd()
    {
        if(verifyIfUserIsLogged() && !inRequestRef.current)        
        {                    
            inRequestRef.current = true;
            const userId = localStorage.getItem("id") as string;
            const adId = id as string;
            await userAndAdsAdapter.visualizeAds({ userId, adId });
            inRequestRef.current = false;
        }
    }

    async function loadAds()
    {        
        if( id )
        {
            await adsAdapter.getSingleAds( id )
            .then( ad => {
                setAdsInfos(ad.result_ads);
                setUserInfos( ad.user_creator);                               
            });                                      
        };     
    };

    async function checkThisUserFavoriteAds() 
    {
        await userAdapter.consultUserAccount(localStorage.getItem("id") as string)
        .then(thisUser => thisUser.favorite_ads.includes(id)? setLike(true) : setLike(false))
        .catch(error => console.log(error));
    }

    async function favoriteAd()
    {                
        if(verifyIfUserIsLogged() && !inRequestRef.current)
        {   
            inRequestRef.current = true;
            const adId = ads?._id as string;
            const userId = localStorage.getItem("id") as string;
            await userAndAdsAdapter.likeAds({ userId, adId });
            await loadAds();
            await checkThisUserFavoriteAds()
            inRequestRef.current = false;
        }
    }

    useEffect(() => {
        if(!inRequestRef.current)
        {
            inRequestRef.current = true;
            loadAds();
            checkThisUserFavoriteAds();           
            visualizeAd();
            inRequestRef.current = false;
        }        
    }, []);   

    return(
        <>
            <FormSearchResult searchType="Search"/>            
            <div className="flex flex-col md:flex-wrap justify-center items-center w-full mb-4">            
            {ads?
                (<div className="w-full flex justify-center flex-wrap gap-1 ">                    
                    <div className="overflow-hidden flex flex-col justify-center items-center w-full md:w-[69%] bg-gradient-to-r from-[#EFEFEF] to-gray border border-gray rounded-md shadow-md dark:bg-gradient-to-r from-darkGray to-darkGray dark:border-darkGray">   
                        
                        <Swiper
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="w-full h-[460px]"
                        >
                            {ads.url_image.map((imgUrl, index) => {
                                return (
                                    <SwiperSlide 
                                        className=" w-full h-full"
                                        key={index}
                                    >
                                       <div className="flex justify-center items-center w-full h-full">
                                        <img src={imgUrl} alt="" 
                                                className="object-cover h-full"
                                            />
                                       </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>                       
                        
                        { /*                  
                        <div className="flex w-full hidden">
                            <div className="flex justify-center w-full gap-2 border border-gray rounded-md dark:border-darkGray">

                                <img className="h-[400px] object-cover rounded-md" 
                                src={ ads.url_image?(ads.url_image[selected_photo_index]):('') } alt="product-img" /> 
                                                               
                            </div>
                            <div className="custom-scroll flex flex-col gap-1 items-center w-[120px] h-[400px] overflow-y-scroll py-1 bg-white border-2 border-white rounded-md dark:bg-darkGray dark:border-gray">                                                                                                  
                               <ImagesSlider 
                                ads={ads} 
                                photoIndex={[
                                selected_photo_index, 
                                setPhotoIndex
                                ]}
                               /> 
                                                                                             
                            </div>                        
                        </div>
                        */}

                        <div className="flex px-4 gap-4 items-center w-full h-[50px] bg-white rounded-b-md dark:bg-gradient-to-r from-[#141B34] from-70% to-[#1A1A1B]">
                            
                            <div className="flex justify-center items-end cursor-pointer">
                                <ads_icons.ViewIcon width={28} height={28}/>
                                <p className="dark:text-gray">
                                    { ads.views }
                                </p>
                            </div>
                            <div className="flex justify-center items-end cursor-pointer hover:brightness-110 dark:text-gray"
                            >
                                                                    
                                <ads_icons.LikeIcon 
                                    className={hasLiked?(
                                        "fill-orange stroke-orange"
                                    ):(
                                        "fill-gray stroke-gray"
                                    )} 
                                    width={28} 
                                    height={28}
                                    onClick={() => favoriteAd()}
                                />                                   
                                
                                <p className="">
                                    { ads.likes }
                                </p>
                            </div>
                            <div className="flex justify-center items-end cursor-pointer hover:brightness-110">
                                <ads_icons.ShareIcon width={28} height={28}/>
                                
                            </div>
                            <div className="flex justify-center fill-darkGray items-end cursor-pointer hover:fill-black">
                                <ads_icons.FlagIcon width={28} height={28}/>
                               
                            </div>                            
                        </div>                
                    </div>

                    <div className={`fixed bottom-0 w-full md-2:static md-2:w-[263px] ${ownerInfosIsOpen?(`h-[453px]`):(`md-2:`)} flex flex-col items-center justify-center border border-gray rounded-md shadow-md dark:border-darkGray z-[100] md-2:z-0`}>

                        <button className={`lg:hidden  absolute top-1 left-2 ${ownerInfosIsOpen?(`rotate-180`):(``)} ease-in-out duration-100 z-10`}
                            onClick={() => openOwnerInfos(!ownerInfosIsOpen)}
                        >
                            <ux_icons.ArrowTopIcon className="h-5 w-5 stroke-black "/>
                        </button>  

                        <div className={`relative ${ownerInfosIsOpen?(`flex`):(`hidden md-2:flex`)} justify-center h-1/3 w-full bg-yellow rounded-t-md dark:bg-orange`}>

                            <div className="absolute top-[25%] text-center">
                                <p className="font-semibold text-white mb-2">
                                    Gold
                                </p>
                                <div className="h-32 w-32 rounded-full bg-gray border-2 border-white">
                                    <img src={user_creator.profile_img} alt="user creator image" className="flex justify-center items-center w-full h-full object-cover rounded-full text-darkGray" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start items-center h-full w-full bg-white text-darkGray rounded-b-md dark:bg-darkGray">
                            
                            <div className={`${ownerInfosIsOpen?(`mt-20 mb-4 h-20 px-2 w-full`):(`w-full bg-yellow text-white py-1`)} md-2:mt-20 md-2:mb-4 md-2:h-20 md-2:px-2 md-2:w-full md-2:bg-white md-2:text-darkGray`}>
                                <div className="flex justify-center lg:justify-start gap-2 dark:text-gray w-full">
                                    
                                    <h3 className="text-sm font-light">
                                        Nome
                                    </h3>
                                    <p className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                                        { user_creator.name }
                                    </p>
                                    
                                </div>

                                <div className={`justify-start gap-2 dark:text-gray w-full ${ownerInfosIsOpen?(
                                    `flex`
                                ):(
                                    `hidden md-2:flex`
                                )}`}>
                                        <h3 className="text-sm font-light">
                                            Email
                                        </h3>
                                        <p className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden">
                                            { user_creator.email }
                                        </p>
                                </div>                                
                                                                                        
                            </div>
                            
                            
                            <div className={`grid ${ownerInfosIsOpen?(`grid-rows-2`):(`grid-cols-3 md-2:grid-cols-1 md-2:grid-rows-2`)} text-darkGray dark:text-gray gap-1 py-1`}>
                                <div className="flex justify-center items-center">
                                    <div className="h-3 w-3 rounded-full bg-greenLight">
                                    </div>
                                    <p>
                                        Online
                                    </p>
                                </div>
                                <button className={`${ownerInfosIsOpen?(`col-start-1 row-start-2`):(`col-start-2 md-2:col-start-1 md-2:row-start-2`)} flex justify-center items-center w-[131px] h-[35.6px] lg:w-48 lg:h-12 rounded-3xl bg-orange text-white font-semibold hover:brightness-110`}>
                                        <ux_icons.ChatIcon />
                                </button>
                                
                            </div>
                        </div>
                    </div>                    
                    <div className="flex justify-start gap-4 items-center basis-full lg:w-[839px] bg-white p-4 border border-gray shadow-md dark:bg-[#141B34] dark:border-darkGray">
                            <div className="flex flex-col justify-center items-start">
                                <h3 className="px-2 border-2 rounded-xl font-semibold text-gray2 dark:text-gray">{ ads.category.name[0].toUpperCase() + ads.category.name.slice(1) }</h3>
                                <h1 className="text-xl text-gray2 w-full font-semibold mb-1 dark:text-gray">
                                    { ads.title }
                                </h1>
                                <h2 className="bg-orange text-white text-2xl font-semibold px-3 rounded-md">

                                    R${(ads.price).toLocaleString('pt-BR', {
                                        minimumFractionDigits : 2,
                                        maximumFractionDigits : 3
                                    })}
                                </h2>

                            </div>                                   
                    </div>
                    <div className="flex flex-col basis-full justify-start p-2 items-start  dark:bg-[#0000]">
                        <div className="flex justify-center items-center gap-1 text-darkGray font-light dark:text-gray">
                            <p className="text-sm text-orange">
                                Postado em 
                            </p>
                            <p className="text-sm ">
                                { ads.date_created }
                            </p> 
                        </div>
                        <div className="flex gap-1 text-sm text-darkGray mt-1 leading-[16px] font-medium dark:text-gray">

                            { Object.values(ads.address).map((item, index) => index < Object.values(ads.address).length - 1? `${item}, ` : item)} 

                        </div>
                    </div>  
                    <div className="describe-product basis-full lg:w-[839px] shadow-md rounded-md p-4 border border-gray dark:border-darkGray">
                        <label htmlFor="" className="text-darkGray font-semibold mb-2 dark:text-gray">
                            Descrição do Produto
                        </label>
                        <p className="font-light dark:text-gray">
                            { ads.description }
                        </p>
                    </div>
                    
                </div>
            ):(
                <></>
            )}
        </div>
    </>
    )
}

export default ProductView;