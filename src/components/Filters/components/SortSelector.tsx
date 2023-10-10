import UxIcons from "../../../assets/ui/ux-icons";

type Props = {
    setSearchParams: (any: any) => void;
    order: string;
}

export default function({ setSearchParams, order }: Props){

    const sortList = [
        {type : 'Mais relevante', value : 'most-relevant-first'}, 
        {type : 'Menor preço', value : 'low-price-first'},
        {type : 'Maior preço', value : 'higher-price-first'},
        {type : 'Mais recentes', value : 'most-recent-first'},
    ];
    
    return(
        <div className="flex justify-center items-center gap-1">
            <UxIcons.SortIcon className="h-[22px]"/>
            <select name="ordenacao" 
                id="id_ordenacao" 
                className="text-darkGray md:w-[130px] md-2:w-40 p-1 rounded bg-gray   md:bg-white"
                onChange={event => {                                
                    setSearchParams({"order" : event.target.value})
                }}
                defaultValue={order}
            >                
                { sortList.map((sortMethod, index) => {
                    return(
                        <option key={index} 
                        value={ sortMethod.value }>
                            { sortMethod.type }
                        </option>
                    )
                })}
            </select>
        </div>
    )
}