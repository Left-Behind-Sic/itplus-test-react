import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HouseConsumption, HousesPlants, PlantConsumption} from "../../models/IHouse";
import {fetchHousesPlants} from "./ActionCreators";
import {GridCellEditCommitParams} from "@mui/x-data-grid";

interface HouseState {
    housesPlants: HousesPlants;
    isLoading: boolean;
    error: string;
}


interface IHousePlantsConsumptions extends HouseConsumption, PlantConsumption {}

const initialState: HouseState = {
    housesPlants: { houses: [], plants: [] },
    isLoading: false,
    error: "",
};

export const housesPlantsSlice = createSlice({
    name: "housesPlants",
    initialState,
    reducers: {
        dataChange: (state, action: PayloadAction<GridCellEditCommitParams>) => {
            let inc: number = 0;
            const houseRows = state.housesPlants.houses.flatMap((house) =>
                house.consumptions.map((item) => ({
                    id: inc++,
                    Name: house.Name,
                    ConsumerId: house.ConsumerId,
                    Date: item.Date,
                    Weather: item.Weather,
                    Consumption: item.Consumption,
                }))
            );

            const plantRows = state.housesPlants.plants.flatMap((plant) =>
                plant.consumptions.map((item) => ({
                    id: inc++,
                    Name: plant.Name,
                    ConsumerId: plant.ConsumerId,
                    Date: item.Date,
                    Price: item.Price,
                    Consumption: item.Consumption,
                }))
            );
            const changed = [...houseRows, ...plantRows].map((r) => {
                if (r.id === action.payload.id) {
                    return {
                        ...r,
                        [action.payload.field]: action.payload.value,
                    };
                } else {
                    return { ...r };
                }
            });

            let name = [...new Set(changed.map((a) => a.Name))];
            let ids = [...new Set(changed.map((a) => a.ConsumerId))];
            const nameIds = name.map((e, i) => ({
                Name: e,
                ConsumerId: ids[i],
                consumptions: [],
            }));

            const result = nameIds.map((item) => ({
                Name: item.Name,
                ConsumerId: item.ConsumerId,
                consumptions: changed
                    .filter((e) => {
                        if (e.ConsumerId === item.ConsumerId) {
                            return true;
                        }
                    })
                    .map((i: IHousePlantsConsumptions) =>
                        i.Weather
                            ? {
                                  Date: i.Date,
                                  Consumption: i.Consumption,
                                  Weather: i.Weather,
                              }
                            : {
                                  Date: i.Date,
                                  Consumption: i.Consumption,
                                  Price: i.Price,
                              }
                    ),
            }));

            state.housesPlants.houses = result.filter((e) =>
                e.Name.includes("дом")
            );
            state.housesPlants.plants = result.filter((e) =>
                e.Name.includes("завод")
            );
        },
    },
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

export const { dataChange } = housesPlantsSlice.actions;

export default housesPlantsSlice.reducer;
