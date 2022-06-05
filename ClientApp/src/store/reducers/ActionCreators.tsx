import axios from "axios";
import { AppDispatch } from "../store";
import { House, HousesPlants } from "../../models/IHouse";
import { houseSlice } from "./HouseSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchHouses = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(houseSlice.actions.housesFetching());
//     const response = await axios.get<House[]>("/api/Data");
//     dispatch(houseSlice.actions.housesFetchingSuccess(response.data));
//   } catch (e) {
//     dispatch(houseSlice.actions.housesFetchingError(e.message));
//   }
// };

export const fetchHouses = createAsyncThunk(
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
