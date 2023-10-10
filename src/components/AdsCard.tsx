import { Link } from "react-router-dom";
import { AdsType } from "../types/ads_types";

import useRootStateSelector from "../redux/hookRootState/RootStateSelector";
import { setUrlJson } from "../redux/reducers/navHistoryReducer";
import { useDispatch } from "react-redux";

type props = {
    ads : AdsType;
}

function AdsCard( { ads } : props ){

    const nav_history = useRootStateSelector((state) => state.nav_history);
    const dispatch = useDispatch();

    return (
        <Link to={`/ads/${ads._id}`} className="flex flex-none flex-col justify-center items-start h-[258px] w-[170px] overflow-hidden cursor-pointer shadow-lg rounded-md border border-gray hover:scale-105 hover:shadow-2xl ease-in duration-100 dark:border-darkGray " 
        key={ads._id}
        onClick={() => dispatch(setUrlJson([...nav_history.url_history, {
            id : 2,
            url : "/",
            name : "product-x"
        }]))}
        >
                            
            <img className='w-[170px] min-h-[170px] object-cover border-b border-gray rounded-md ease-in duration-100   
            md:w-[200px] md:h-[200px]' src={ads.url_image?(ads.url_image[0]):('')} alt={ads.title}/>
            <div className='flex flex-col justify-center items-start w-full bg-white p-2 dark:bg-[#141B34]'>

                <p className='px-2 border-2 rounded-xl text-sm font-semibold text-gray2 dark:text-gray  md:text-base'>

                    { ads.category.name[0].toUpperCase() + ads.category.name.slice(1)}
                    
                </p>                            
                <p className='ads-title-vitrine text-sm text-gray2 font-semibold w-full rounded-md dark:text-gray   md:text-base'>

                    {ads.title}
                    
                </p>                            
                <div className=" flex text-white font-semibold text-lg rounded-md px-2 mb-1 bg-orange">
                    
                    R${(ads.price).toLocaleString('pt-BR', {
                        minimumFractionDigits : 2,
                        maximumFractionDigits : 3
                    })}
                    
                </div>                            
            </div>

            <button className="">
            </button>

        </Link>
    )
}

export default AdsCard;