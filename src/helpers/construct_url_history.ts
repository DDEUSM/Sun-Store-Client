import { UrlParamsStructureType } from "../types/navigation_types";
import { HistoryType } from "../types/navigation_types";


export function constructArrHistory( arr_params : UrlParamsStructureType[], query_string : string ){
    let arr_history : HistoryType[] = [];    
    let base_url = `/search`;
    arr_history.push({
        id : 0,
        url : `/`,
        name : `home`,
        active : true
    });
    arr_params.map((param, index) => {
        base_url = constructUrl(param, base_url) as string;
        arr_history.push({
            id : index + 1,
            url : `${base_url}${query_string?(query_string):(``)}`,
            name : param.value as string,
            active : true
        });
    });  
    return arr_history;
}


function constructUrl(item : UrlParamsStructureType, base_url : string){
    switch(item.type){
        case "state":
            return `${base_url}/${item.value}`
            break;
        case "category":
            return `${base_url}/${item.value}`
            break;
        case "sub_category":
            return `${base_url}/${item.value}`
            break;
        case "ads":
            return `/ads/${item.value}`
            break;
    }
}