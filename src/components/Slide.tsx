import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";

register();
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

import { Pagination, Scrollbar, Navigation } from "swiper/modules";
import { PropsWithChildren } from "react";

type SlideConfigType = {
    height? : string;
    width? : string;
    space_between : number;
    slides_per_view : number;
    direction : 'vertical' | 'horizontal';  
}

type Props = {
    slide_config : SlideConfigType;        
}



export default function Slider({ slide_config, children }: Props & PropsWithChildren)
{
    const { 
        height, 
        width, 
        space_between,
        slides_per_view, 
        direction 
    } = slide_config;

    return(             
        <Swiper
            navigation
            slidesPerView={slides_per_view}
            spaceBetween={space_between}
            direction={direction}
            pagination={{ clickable: true }}            
            className={`${height} ${width}`}                
        >
            { children }
        </Swiper>
        
    )
}