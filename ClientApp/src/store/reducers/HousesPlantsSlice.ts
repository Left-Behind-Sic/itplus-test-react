import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { House, HousesPlants } from "../../models/IHouse";
import { fetchHousesPlants } from "./ActionCreators";

interface HouseState {
  housesPlants: HousesPlants;
  isLoading: boolean;
  error: string;
}

const initialState: HouseState = {
  housesPlants: { houses: [], plants: [] },
  isLoading: false,
  error: "",
};

export const housesPlantsSlice = createSlice({
  name: "housesPlants",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchHousesPlants.fulfilled.type]: (
      state,
      action: PayloadAction<HousesPlants>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.housesPlants = action.payload;
    },
    [fetchHousesPlants.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchHousesPlants.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default housesPlantsSlice.reducer;
