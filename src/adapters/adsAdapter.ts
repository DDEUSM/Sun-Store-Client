import axios from 'axios';
import URL_BASE from './xhr';
import { AdsType } from '../types/ads_types';

type SearchDataType = AdsType[];

type PgandAdscountType = {
    count_items : number;
    tot_pages : number;
};

export type UrlParamsType = {
    state? : string;
    category? : string;
    sub_category? : string;
};

export type QueryStringType = {
    userId? : string;
    title? : string;
    actual_page? : number;
    max_price? : number;
    min_price? : number;
    sort? : 'higher-price-first' | 'low-price-first' | 'most-relevant-first' | string;
};

type GetSearchType = (
    urlParams : UrlParamsType,
    queryString : QueryStringType
    ) => Promise<SearchDataType>; 

type GetPgandAdscountType = (    
    urlParams : UrlParamsType,
    queryString : QueryStringType
    ) => Promise<PgandAdscountType>;



async function getAllAds(){
    const allAds = await axios.get(URL_BASE+'/all');
    return allAds.data;
};

async function getSingleAds( id : string ){
    const result_req = await axios.get( URL_BASE+'/ads/'+id );
    return result_req.data;
};

const getAds: GetSearchType =  async function( params, query )
{
    console.log(params, query);
    const result_req = await axios.get(`${URL_BASE}/search/${params.state}/${params.category?(params.category):('empty')}/${params.sub_category?(params.sub_category):('empty')}?page=${query.actual_page}&userId=${query.userId?(query.userId):('empty')}&title=${query.title?(query.title):('empty')}&order=${query.sort?(query.sort):('empty')}&min_price=${query.min_price?(query.min_price):('empty')}&max_price=${query.max_price?(query.max_price) : 'empty'}`);
    return result_req.data;
}

const getAdCountAndPg: GetPgandAdscountType = async function( params, query )
{
    const result_req = await axios.get(`${URL_BASE}/search/${params.state}/${params.category?(params.category):('empty')}/${params.sub_category?(params.sub_category):('empty')}?page=${query.actual_page}&userId=${query.userId?(query.userId):('empty')}&title=${query.title?(query.title):('empty')}&order=${query.sort?(query.sort):('empty')}&min_price=${query.min_price?(query.min_price):('empty')}&max_price=${query.max_price?(query.max_price) : 'empty'}`);

    return result_req.data;
}

/*
const getAdsResultSearch: GetSearchType = async function( params, query ){ 

    if(params.sub_category?(params.sub_category.length > 0):(false)){

        const result_req = await axios.get(`${URL_BASE}/search/${params.state}/${params.category}/${params.sub_category}?page=${query.actual_page}&title=${query.title?(query.title):('')}&order=${query.sort?(query.sort):('')}&min_price=${query.min_price?(query.min_price):('')}&max_price=${query.max_price?(query.max_price):''}`);

        return result_req.data;

    }else if(params.category?(params.category.length > 0):(false)){

        const result_req = await axios.get(`${URL_BASE}/search/${params.state}/${params.category}?page=${query.actual_page}&title=${query.title?(query.title):('')}&order=${query.sort?(query.sort):('')}&min_price=${query.min_price?(query.min_price):('')}&max_price=${query.max_price?(query.max_price):''}`);

        return result_req.data;

    }else{

        const result_req = await axios.get(`${URL_BASE}/search/${params.state}?page=${query.actual_page}&title=${query.title?(query.title):('')}&order=${query.sort?(query.sort):('')}&min_price=${query.min_price?(query.min_price):('')}&max_price=${query.max_price?(query.max_price):''}`);

        return result_req.data;
    }    
};


const getPgandAdscount: GetPgandAdscountType = async function( params, query ){

    if(params.sub_category?(params.sub_category.length > 0):(false)){

        const result_req = await axios.get(`${URL_BASE}/count/${params.state}/${params.category}/${params.sub_category}?title=${query.title?(query.title):('')}&min_price=${query.min_price?(query.min_price):('')}&max_price=${query.max_price?(query.max_price):''}`);

        return result_req.data;

    }else if(params.category?(params.category.length > 0):(false)){

        const result_req = await axios.get(`${URL_BASE}/count/${params.state}/${params.category}?title=${query.title?(query.title):('')}&min_price=${query.min_price?(query.min_price):('')}&max_price=${query.max_price?(query.max_price):''}`);

        return result_req.data;

    }else{

        const result_req = await axios.get(`${URL_BASE}/count/${params.state}?title=${query.title?(query.title):('')}&min_price=${query.min_price?(query.min_price):('')}&max_price=${query.max_price?(query.max_price):''}`);

        return result_req.data;
    }    
};
*/

const getUserAds: GetSearchType = async function( params, query )
{
    console.log(params.category);
    const result_req = await axios.get(`${URL_BASE}/search/${params.state}/${params.category?(params.category):('empty')}/${params.sub_category?(params.sub_category):('empty')}?page=${query.actual_page}&userId=${query.userId?(query.userId):('empty')}&title=${query.title?(query.title):('empty')}&order=${query.sort?(query.sort):('empty')}&min_price=${query.min_price?(query.min_price):('empty')}&max_price=${query.max_price?(query.max_price) : 'empty'}`);

    return result_req.data;
}

const getPageAndUserAdCount: GetPgandAdscountType = async function( params, query )
{
    const result_req = await axios.get(`${URL_BASE}/search/${params.state}/${params.category?(params.category):('empty')}/${params.sub_category?(params.sub_category):('empty')}?page=${query.actual_page}&userId=${query.userId?(query.userId):('empty')}&title=${query.title?(query.title):('empty')}&order=${query.sort?(query.sort):('empty')}&min_price=${query.min_price?(query.min_price):('empty')}&max_price=${query.max_price?(query.max_price) : 'empty'}`);

    return result_req.data;
}


export default { getAllAds, getSingleAds, getUserAds, getPageAndUserAdCount, getAds, getAdCountAndPg };