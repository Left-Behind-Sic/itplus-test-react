import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useMutation } from "react-query";
import { HousesPlants } from "../../models/IHouse";
import { queryClient } from "./../../main";

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

export const getData = async () => {
	const response = await axios.get<HousesPlants>("/api/data");
	return response.data;
};

export const usePutData = () => {
	return useMutation(
		async (updatedHousesPlants: HousesPlants) => {
			const res = await axios.put("/api/data", updatedHousesPlants);
			return res.data;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries();
			},
		}
	);
};
