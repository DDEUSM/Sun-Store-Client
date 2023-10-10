import { configureStore } from "@reduxjs/toolkit";
import adsReducer from "./reducers/adsReducer";
import searchReducer from "./reducers/searchReducer";
import categoryReducer from "./reducers/categoryReducer";
import stateReducer from "./reducers/stateReducer";
import navHistoryReducer from "./reducers/navHistoryReducer";
import loginStatusReducer from "./reducers/loginStatusReducer";
import darkThemeReducer from "./reducers/darkThemeReducer";

export const store = configureStore({
    reducer : {
        ads : adsReducer,
        search : searchReducer,
        categories : categoryReducer,
        state : stateReducer,
        nav_history : navHistoryReducer,
        login_status : loginStatusReducer,
        darkTheme : darkThemeReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

