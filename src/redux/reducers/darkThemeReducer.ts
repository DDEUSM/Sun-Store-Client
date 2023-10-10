import { createSlice } from "@reduxjs/toolkit";
import { DarkThemeType } from "../../types/DarkThemeType";


const initialState: DarkThemeType = {
    darkTheme : false
}

const slice = createSlice({
    name: "darkTheme",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.darkTheme = action.payload;
        }
    }
});

export const { setTheme } = slice.actions;
export default slice.reducer;