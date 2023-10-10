import { createSlice } from "@reduxjs/toolkit";
import { NavHistoryReducerType } from "../../types/nav_history_type";
import { HistoryReducerType } from "../../types/navigation_types";

const initialState : HistoryReducerType = {
    url_history : []
}

const slice = createSlice({
    name : 'nav_history',
    initialState,
    reducers : {
        setUrlJson : ( state, action) => {
            state.url_history = action.payload;
        }
    }
});

export const { setUrlJson } = slice.actions;
export default slice.reducer;