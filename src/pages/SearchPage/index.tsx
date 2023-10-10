import { redirect, useParams, useSearchParams, Outlet, Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import useRootStateSelector from "../../redux/hookRootState/RootStateSelector";
import { useDispatch } from "react-redux";
import { setCategories } from "../../redux/reducers/categoryReducer";
import categoryAdapter from "../../adapters/categoryAdapter";
import { CategoryType } from "../../types/category_types";
import FormSearch from "../../components/FormSearch";
import NavigationHistory from "../../components/NavigationHistory";


export default function SearchPage()
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

    return (
        <>
            <FormSearch searchType="Search"/>               
            <Outlet/>            
        </>                        
    );
};

