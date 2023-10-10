import { createSlice } from "@reduxjs/toolkit";
import { LoginStatusType } from "../../types/login_status_types";

const initialState : LoginStatusType = {
    isLogged : localStorage.getItem("userName")? true : false
};

const slice = createSlice({
    name : 'login_status',
    initialState,
    reducers : {
        updateLoginStatus : ( state, action ) => {
            state.isLogged = action.payload;
        }
    }
});

export const { updateLoginStatus } = slice.actions;
export default slice.reducer;