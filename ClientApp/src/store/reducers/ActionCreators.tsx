import axios from "axios";
import { AppDispatch } from "../store";
import { House, HousesPlants } from "../../models/IHouse";
import { housesPlantsSlice } from "./HousesPlantsSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchHousesPlants = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(housesPlantsSlice.actions.housesFetching());
//     const response = await axios.get<HousesPlants>("/api/Data");
//     dispatch(housesPlantsSlice.actions.housesFetchingSuccess(response.data));
//   } catch (e) {
//     dispatch(housesPlantsSlice.actions.housesFetchingError(e.message));
//   }
// };

export const fetchHousesPlants = createAsyncThunk(
  "housesPlants/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<HousesPlants>("/api/Data");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось загрузить");
    }
  }
);
