import { configureStore, combineReducers } from "@reduxjs/toolkit";
import housesPlantsReducer from "./reducers/HousesPlantsSlice";

const rootReducer = combineReducers({
    housesPlantsReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
