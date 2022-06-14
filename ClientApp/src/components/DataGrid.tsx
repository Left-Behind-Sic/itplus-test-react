import * as React from "react";
import { useEffect } from "react";
import {
    DataGrid,
    GridCellEditCommitParams,
    GridColDef,
} from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchHousesPlants } from "../store/reducers/ActionCreators";
import { dataChange } from "../store/reducers/HousesPlantsSlice";

export default function Grid() {
    const { housesPlants, isLoading, error } = useAppSelector(
        (state) => state.housesPlantsReducer
    );

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchHousesPlants());
    }, [dispatch]);
    const columns: GridColDef[] = [
        {
            field: "Name",
            headerName: "Название объекта",
            editable: true,
            flex: 0.8,
            align: "center",
            headerAlign: "center",
            type: "string",
        },
        {
            field: "Date",
            type: "date",
            valueGetter: ({ value }) => value && new Date(value),
            headerName: "Дата",
            editable: true,
            flex: 0.7,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "Weather",
            type: "number",
            headerName: "Температура",
            editable: true,
            flex: 0.4,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "Consumption",
            type: "number",
            headerName: "Потребление",
            editable: true,
            flex: 0.7,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "Price",
            type: "number",
            headerName: "Цена на кирпич",
            editable: true,
            flex: 0.7,
            align: "center",
            headerAlign: "center",
        },
    ];

    const rows = () => {
        let inc: number = 0;
        const houseRows = housesPlants.houses.flatMap((house) =>
            house.consumptions.map((item) => ({
                id: inc++,
                Name: house.Name,
                ConsumerId: house.ConsumerId,
                Date: item.Date,
                Weather: item.Weather,
                Consumption: item.Consumption,
            }))
        );

        const plantRows = housesPlants.plants.flatMap((plant) =>
            plant.consumptions.map((item) => ({
                id: inc++,
                Name: plant.Name,
                ConsumerId: plant.ConsumerId,
                Date: item.Date,
                Price: item.Price,
                Consumption: item.Consumption,
            }))
        );
        return [...houseRows, ...plantRows];
    };

    const handleCommit = (e: GridCellEditCommitParams) => {
        if (e.field === "Date") {
            e.value = new Date(
                e.value.getTime() - e.value.getTimezoneOffset() * 60000
            )
                .toISOString()
                .slice(0, -5);
        }

        dispatch(dataChange(e));
    };

    return (
        <div style={{ width: "100%" }}>
            {isLoading && <h1>Загрузка</h1>}
            {error && <h1>Ошибка</h1>}
            <DataGrid
                autoHeight
                getRowId={(row) => row.id}
                columns={columns}
                rows={rows()}
                onCellEditCommit={handleCommit}
                sx={{ fontSize: { xs: 9, md: 14 } }}
            />
        </div>
    );
}
