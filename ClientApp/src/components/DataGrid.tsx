import * as React from "react";
import { useEffect } from "react";
import {
  DataGrid,
  GridCellEditCommitParams,
  GridColDef,
} from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchHousesPlants } from "../store/reducers/ActionCreators";

export default function Grid() {
  const { housesPlants, isLoading, error } = useAppSelector(
    (state) => state.housesPlantsReducer
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchHousesPlants());
  }, []);
  const columns: GridColDef[] = [
    { field: "ConsumerId", type: "number", headerName: "ID", flex: 0.2 },
    {
      field: "Name",
      headerName: "Название объекта",
      width: 200,
      editable: true,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Date",
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      headerName: "Дата",
      width: 200,
      editable: true,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Weather",
      type: "number",
      headerName: "Температура",
      width: 160,
      editable: true,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Consumption",
      type: "number",
      headerName: "Потребление",
      width: 160,
      editable: true,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Price",
      type: "number",
      headerName: "Цена на кирпич",
      width: 160,
      editable: true,
      flex: 0.5,
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
    console.log(e);
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
      />
    </div>
  );
}
