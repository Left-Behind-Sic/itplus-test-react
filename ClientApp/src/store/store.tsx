import { configureStore, combineReducers } from "@reduxjs/toolkit";
import houseReducer from "./reducers/HouseSlice";

const rootReducer = combineReducers({
  houseReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
