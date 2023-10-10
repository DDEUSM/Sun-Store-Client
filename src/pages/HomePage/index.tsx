import { useEffect, useState} from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { setCategories } from "../../redux/reducers/categoryReducer";
import { setState } from "../../redux/reducers/stateReducer";

import cmp from '../../components/AllComponents';

import categoryAdapter from "../../adapters/categoryAdapter";
import stateAdapter from "../../adapters/stateAdapter";

import FormSearch from "../../components/FormSearch";
import adsAdapter, { QueryStringType, UrlParamsType } from '../../adapters/adsAdapter';
import { setAds } from '../../redux/reducers/adsReducer';
import useRootStateSelector from '../../redux/hookRootState/RootStateSelector';
import AdsCard from '../../components/AdsCard';

import { AdsStateType } from '../../types/ads_types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'

function utilsFunctions()
{
    async function getAllDatas({ dispatch, setCategory }: any)
    {
        await Promise.all([
            categoryAdapter.getAllCategories(),
            stateAdapter.getAllStates(),            
        ])
        .then(results => {
            dispatch(setCategories(results[0]));
            dispatch(setState(results[1])); 
            setCategory(results[0][0].name);  
        });             
    }

    async function getDataByCategory({dispatch, category_selected}: any)
    {
        const url_params : UrlParamsType = {
            state : "Todos",
            category : category_selected,
        }
        const query_string : QueryStringType = {
            actual_page : 1,
            sort : "most-recent-first"
        }
        const resutl_req = await adsAdapter.getAds(url_params, query_string);
        dispatch(setAds(resutl_req));
    }

    function listAds(adsState: AdsStateType )
    {
        return adsState.all_ads.map((ads, index) => {
            return(
                <SwiperSlide className=' text-center p-2'>
                    <AdsCard ads={ads} key={index}/>
                </SwiperSlide>
            )
        })
    }

    return { getAllDatas, getDataByCategory, listAds };
}


export default function Home()
{
    const { innerWidth } = window;

    const [ windowBreakPoints, setBreakPoint ] = useState(false);

    const adsState = useRootStateSelector(( state ) => state.ads );
    const categories_state = useRootStateSelector(( state ) => state.categories );
    const dispatch = useDispatch();
    const [category_selected, setCategory] = useState<string>();     
    const { getAllDatas, getDataByCategory, listAds } = utilsFunctions(); 

    useEffect(() => {
        if(!adsState.all_ads.length && !categories_state.all_categories.length){
            getAllDatas({dispatch, setCategory});
            return;
        }
        setCategory(categories_state.all_categories[0].name);
    },[]);

    useEffect(() => {    
        if(category_selected)   {
            getDataByCategory({dispatch, category_selected}); 
        }
    },[category_selected]);

    return (
        <> 
            <FormSearch searchType='Search'/>            
            <cmp.Menu/>                        
            <div className="w-full flex flex-col justify-center items-start">            
                <div className="relative flex items-center justify-center h-[49px] w-full bg-yellow mb-5 dark:bg-orange rounded-lg">
                    
                    <h2 className='absolute bg-yellow px-4 font-semibold justify-center items-center text-2xl text-white dark:bg-orange'>
                        Postagens mais recentes
                    </h2>                    
                </div>                                                
                <div className=" relative flex flex-col w-full border border-gray py-3 rounded-lg dark:border-darkGray">
                    <div className='flex justify-start items-center px-2 overflow-x-auto'>                        
                    {categories_state.all_categories.map((cat, index) => {
                        return(
                            <button className={
                                category_selected === cat.name? (
                                    'my-2 mx-1 px-4 py-1 border-2 border-orange text-xl rounded-3xl font-semibold text-white bg-orange border-orange'
                                ) : (
                                    'my-2 mx-1 px-4 py-1 text-xl border-2 border-yellow rounded-3xl font-semibold bg-white text-yellow hover:border-orange hover:text-orange dark:text-gray dark:border-gray'
                                )} 
                                onClick={e => setCategory( e.currentTarget.textContent as string )}
                                key={index}
                            >
                                {cat.name}
                            </button>   
                        )                        
                    })}                            
                    </div>     

                   <div className='px-1'>

                    <Swiper 
                            slidesPerView={4}  
                            spaceBetween={0}                                        
                            navigation
                            className='h-[300px] w-full'
                            pagination = {{
                                clickable: true
                            }}
                            modules={[Pagination]}
                            breakpoints={{
                                100 : {
                                    slidesPerView: 2,
                                    spaceBetween: 20
                                },
                                530: {
                                    slidesPerView: 3,
                                    spaceBetween: 20
                                },
                                700: {
                                    slidesPerView: 4,
                                    spaceBetween: 20
                                },
                                768: {
                                    slidesPerView: 4,
                                    spaceBetween: 40
                                }

                            }}
                            onResize={() => {
                                setBreakPoint(!windowBreakPoints)
                            }}                        
                        >
                            {listAds(adsState)}
                        </Swiper>

                   </div>
                    
                                            
                </div>
                <Link to={`/search/Todos/${category_selected}?order=most-recent-first`} 
                className="flex justify-center items-center w-full py-5 border border-gray rounded-lg text-xl text-blue1 dark:text-orange hover:text-blue3 dark:border-darkGray"
                >
                    Ver Todos 
                </Link>   
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="website-description flex flex-col items-center text-justify border-2 border-darkGray rounded-lg px-5 my-10 dark:border-orange">
                    <h1 className="text-3xl m-5 font-semibold text-darkGray dark:text-gray">
                        Sobre o Site
                    </h1>
                    <p className='text-darkGray mb-10 dark:text-white'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima odio blanditiis nobis vitae ducimus distinctio voluptatem, modi quos magni vero accusamus consequatur, quasi iure illo perspiciatis nam. Saepe, deserunt quam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quia quas ipsa excepturi obcaecati! Incidunt quidem, voluptas nemo animi quo accusantium itaque quaerat ex quasi nam quod molestiae. Repellendus, aut, Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, reprehenderit. Vel, laborum similique dolorem cumque incidunt, rerum doloribus inventore nulla, quo sunt sint. Soluta mollitia temporibus corrupti deserunt enim quia Lorem ipsum dolor, sit amet consectetur adipisicing elit. A voluptates delectus, magnam, nihil illo sunt obcaecati laborum libero eum, eligendi voluptatum fugiat suscipit cum. Accusamus totam incidunt mollitia corrupti perferendis..                         
                    </p>
                </div>
            </div>                           
        </>
    )
}
