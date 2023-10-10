import { createSlice } from "@reduxjs/toolkit";
import { StateInitialStateType } from "../../types/state_types";

const initialState : StateInitialStateType = {
    all_states : []
};

export const slice = createSlice({
    name : "state",
    initialState,
    reducers : {
        setState : (state, action) => {
            state.all_states = action.payload;
        }
    }
});

export const {setState} = slice.actions;
export default slice.reducer;