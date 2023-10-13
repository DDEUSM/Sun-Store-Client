import { useSearchParams, useParams } from 'react-router-dom';
import SearchByCategory from '../../../components/LeftCategoryComponent';
import AdsCard from '../../../components/AdsCard';
import { useEffect, useState } from 'react';
import useRootStateSelector from '../../../redux/hookRootState/RootStateSelector';
import { useDispatch } from 'react-redux';
import { setAds } from '../../../redux/reducers/adsReducer';
import adsAdapter,{UrlParamsType, QueryStringType} from '../../../adapters/adsAdapter';
import ShortcutBar from '../../../components/ShortcutBar';
import CatalogPagination from '../components/CatalogPagination';
import Filters from '../../../components/Filters';
import CountSearchResult from '../components/CountSearchResult';
import { PriceFiltersType } from '../../../types/priceFiltersType';
import { PaginationType, WindowControlsType } from './types';
import AdsCatalog from '../components/AdsCatalog';

function utils()
{    
    const dispatch = useDispatch();    

    async function requestUserSearch(urlParams: UrlParamsType, queryString: QueryStringType, [pagination, setPaginationInfos]: any)
    {        
        const searchResult = await Promise.all([
            adsAdapter.getUserAds( urlParams, queryString ),
            adsAdapter.getPageAndUserAdCount( urlParams, queryString )
        ]);
        dispatch( 
            setAds(searchResult?(
            searchResult[0]
            ):(
                []
            ))
        );
        searchResult?(
            setPaginationInfos({...pagination, 
                tot_pages : searchResult[1].tot_pages, 
                count_items : searchResult[1].count_items
            })
        ):(
            null
        );           
    }    
    return { requestUserSearch };
}

function MyAdSearchResult()
{
    const { requestUserSearch } = utils();

    const ads_root_state = useRootStateSelector( ( state ) => state.ads );

    const { state, category, sub_category } = useParams();
    const [search_params, setSearchParams] = useSearchParams();
    const { title, order } = Object.fromEntries([...search_params]); 

    const [pagination, setPaginationInfos] = useState<PaginationType>({
        tot_pages : 0,
        actual_page : 1,
        count_items : 0
    });
    const [ filter, setFilter ] = useState<PriceFiltersType>({
        max_price : undefined,
        min_price : undefined
    });

    const [ windows, openAWindow ] = useState<WindowControlsType>(
    {
        categorySearchWindow: false,
        searchBar: false,
        filtersWindow: false,
    }
    );    
    
    useEffect(() => {
        if(filter.max_price && filter.min_price){
            if(filter.min_price > filter.max_price){
                setFilter({...filter, min_price : filter.max_price});
            }
        }
    },[ads_root_state, filter, order]);
   
    useEffect(() => {
        const urlParams: UrlParamsType = {
            state, 
            category,
            sub_category
        }
        const queryString: QueryStringType = {
            userId : localStorage.getItem("id") as string,
            title,
            actual_page: pagination.actual_page,
            max_price: filter.max_price,
            min_price: filter.min_price,
            sort: order
        }
        requestUserSearch(urlParams, queryString, [pagination, setPaginationInfos]);                             

    },[state, title, category, sub_category, pagination.actual_page, filter, order]);

    return(
        <>                                                                  
            <div className="flex h-full lg:w-[110%] w-full gap-2 mb-4">        

                <SearchByCategory windowStatus={windows.categorySearchWindow} type='my-ads'/>

                <div className='flex flex-col items-center justify-center h-full w-[100%] border-2 border-gray rounded-md dark:border-darkGray'>

                    <Filters.Container windowStatus={windows.filtersWindow}>
                        <Filters.Title 
                            title={ "Filtros" } 
                        />                          
                        <Filters.PriceFiltersBox 
                            filterState={{ filter, setFilter }}
                        />
                        <Filters.SortSelector 
                            order={ order } 
                            setSearchParams={ setSearchParams }
                        />
                    </Filters.Container>

                    <CountSearchResult 
                        title={ "Resultados da Pesquisa: " } 
                        countItems={ pagination.count_items }
                    />

                   <AdsCatalog 
                    ads={ads_root_state}
                   />
                  
                    <CatalogPagination.Container>
                        <CatalogPagination.Button 
                            pagination={ pagination }
                            setPaginationInfos={setPaginationInfos}
                            buttonType={"previous"}
                        />
                        <CatalogPagination.PagesState 
                            pagination={ pagination }
                        />    
                        <CatalogPagination.Button 
                            pagination={ pagination }
                            setPaginationInfos={setPaginationInfos}
                            buttonType={"next"}
                        /> 

                    </CatalogPagination.Container>                    

                </div>
            </div>  

            <ShortcutBar.Container>
                <ShortcutBar.Button 
                    type={"openCategorySearch"}                     
                    openWindow={() => {
                        openAWindow(
                            {...windows, 
                                categorySearchWindow: !windows.categorySearchWindow,
                                filtersWindow: false,
                            }
                        )
                    }}
                    isActivated={windows.categorySearchWindow}
                />
                <ShortcutBar.Button 
                    type={"toSearchBar"}
                    openWindow={() => {
                        openAWindow(
                            {...windows, 
                                categorySearchWindow: false,
                                filtersWindow: false,
                            }
                        )
                    }}                     
                    isActivated={false}
                />
                <ShortcutBar.Button 
                    type={"openFilters"}                     
                    openWindow={() => {
                        openAWindow(
                            {...windows, 
                                filtersWindow: !windows.filtersWindow,
                                categorySearchWindow: false,                                
                            }
                        )
                    }}
                    isActivated={windows.filtersWindow}
                />
            </ShortcutBar.Container>
        </>
    )
}

export default MyAdSearchResult;