import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { House, HousesPlants } from "../../models/IHouse";
import { fetchHouses } from "./ActionCreators";

interface HouseState {
  housesPlants: HousesPlants;
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: HouseState = {
  housesPlants: { houses: [], plants: [] },
  isLoading: false,
  error: "",
  count: 0,
};

export const houseSlice = createSlice({
  name: "housesPlants",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchHouses.fulfilled.type]: (
      state,
      action: PayloadAction<HousesPlants>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.housesPlants = action.payload;
    },
    [fetchHouses.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchHouses.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default houseSlice.reducer;
