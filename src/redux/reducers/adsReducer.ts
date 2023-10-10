import { createSlice } from '@reduxjs/toolkit';
import { AdsStateType } from '../../types/ads_types';

const initialState : AdsStateType = {
    all_ads : []
};
// Ficar de Olho pois pode dar Problema;

export const slice = createSlice({
    name : 'ads',
    initialState,
    reducers : {
        setAds : (state, action) => {

            state.all_ads = action.payload;
            
        }
    }
});

export const {setAds} = slice.actions;
export default slice.reducer;