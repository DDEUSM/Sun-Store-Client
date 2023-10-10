import { createSlice } from "@reduxjs/toolkit";
import { CategoryType, CategoryStateType } from "../../types/category_types";

const initialState : CategoryStateType = {
    all_categories : []
};

export const slice = createSlice({
    name : "categories",
    initialState,
    reducers : {
        setCategories : (state, action) => {
            state.all_categories = action.payload;
        }
    }
});

export const {setCategories} = slice.actions;
export default slice.reducer;