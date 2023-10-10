import { Outlet } from "react-router-dom";
import FormSearchResult from "../../components/FormSearch";
import useRootStateSelector from "../../redux/hookRootState/RootStateSelector";
import { useDispatch } from "react-redux";
import categoryAdapter from "../../adapters/categoryAdapter";
import { setCategories } from "../../redux/reducers/categoryReducer";
import { useEffect } from "react";

export default function()
{
    const category_root_state = useRootStateSelector((state) => state.categories);    
    const dispatch = useDispatch();
    async function getAllCategories(){
        const result_req = await categoryAdapter.getAllCategories();
        dispatch(setCategories(result_req));
    }

    useEffect(() => {
        if(category_root_state.all_categories.length === 0){
            getAllCategories();
        } 
    },[]);

    return(
        <>
            <FormSearchResult searchType="my-ads" />
            <Outlet />
        </>
    )
}