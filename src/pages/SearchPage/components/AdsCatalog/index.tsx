import AdsCard from "../../../../components/AdsCard"
import { AdsStateType } from "../../../../types/ads_types"

type Props = {
    ads:  AdsStateType;
}

export default function({ ads }: Props){
    return(
        <div className="flex justify-center  items-start w-full min-h-[528px] py-2 rounded-md border-y-2 border-gray dark:border-darkGray">
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 '>                        
                {ads.all_ads.length > 0? 
                    (ads.all_ads.map((ad, index) => {
                        return (
                            <AdsCard ads={ad} key={ad._id}/>
                        )        
                    })) : (<></>)}
            </div>
        </div>
    )
}