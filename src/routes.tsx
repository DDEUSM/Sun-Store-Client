import { Routes, Route } from 'react-router-dom';
import Page from './pages';

export default function AllRoutes(){
    return (
        <Routes>
          <Route path='/' element={<Page.Home/>} />
          
          <Route path='/create-new-ad' element={<Page.CreateNewAdPage />} />
          <Route path='/my-favorites' element={<>Minha conta</>} />
          <Route path='/my-ads' element={<Page.MyAdsPage />} children={
            <Route path=':state' element={<Page.MyAdSearchResult />} children={
              <Route path=':category' element={<Page.MyAdSearchResult />} children={
                <Route path=':sub_category' element={<Page.MyAdSearchResult/>}
                />
              }/>
            }/>  
          }/>
          <Route path='/my-account' element={<Page.MyAccountPage />} />

          <Route path='/loggout' element={<>Saindo...</>}/>
          <Route path='/register' element={<Page.RegisterNewUser/>}/>
          <Route path='/login' element={<Page.Login/>}/>
          <Route path='/help' element={<>Ajuda...</>}/>                  
          <Route path='/ads/:id' element={<Page.ProductView/>}/>
          <Route path='/search' element={<Page.SearchPage />} children={
            <Route path=':state' element={<Page.SearchResult />} children={
              <Route path=':category' element={<Page.SearchResult />} children={
                <Route path=':sub_category' element={<Page.SearchResult/>}/>
              }/>
            }/>  
          }/>
          <Route path='*' element={<Page.NotFound/>}/>                    
        </Routes>
    )
}