import { Slice, createSlice } from "@reduxjs/toolkit";
import { SearchReducertype, SearchStateType } from "../../types/search_types";




const initialState : SearchStateType = {
    params : {
        state : "Todos"                
    }
}; 

const slice = createSlice({
    name : 'search',
    initialState,
    reducers : {
        setSearchInfos : (state, action) => {
            
            state.params = action.payload
        }
    }
});

export const { setSearchInfos } = slice.actions;
export default slice.reducer;