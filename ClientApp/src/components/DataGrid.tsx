import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect } from "react";
import { fetchHouses } from "../store/reducers/ActionCreators";
import LinearProgress from "@mui/material/LinearProgress";

export default function BasicColumnsGrid() {
  const { housesPlants, isLoading, error } = useAppSelector(
    (state) => state.houseReducer
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchHouses());
  }, [dispatch]);

  let rows = housesPlants.houses.flatMap((house, indexFirst) =>
    house.consumptions.flatMap((item, index) => ({
      id: indexFirst * 1000 + index,
      Name: house.Name,
      ConsumerId: house.ConsumerId,
      Date: item.Date,
      Weather: item.Weather,
      Consumption: item.Consumption,
    }))
  );

  return (
    <div style={{ height: window.innerHeight, width: "100%" }}>
      {isLoading && <h1>Загрузка</h1>}
      {error && <h1>Ошибка</h1>}
      {console.log(isLoading)}
      <DataGrid
        // components={{ LoadingOverlay: LinearProgress }}
        // loading
        // {...housesPlants}
        experimentalFeatures={{ newEditingApi: true }}
        columns={[
          // { field: "id" },
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
        ]}
        rows={rows}
      />
    </div>
  );
}
