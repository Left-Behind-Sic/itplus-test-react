import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect } from "react";
import { fetchHouses } from "../store/reducers/ActionCreators";

export default function BasicColumnsGrid() {
  const { housesPlants, isLoading, error } = useAppSelector(
    (state) => state.houseReducer
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchHouses());
  }, []);

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
      {console.log(rows)}
      <DataGrid
        experimentalFeatures={{ newEditingApi: true }}
        columns={[
          // { field: "id" },
          { field: "ConsumerId", headerName: "ID" },
          {
            field: "Name",
            headerName: "Название объекта",
            width: 200,
            editable: true,
          },
          { field: "Date", headerName: "Дата", width: 200, editable: true },
          {
            field: "Weather",
            headerName: "Температура",
            width: 160,
            editable: true,
          },
          {
            field: "Consumption",
            headerName: "Потребление",
            width: 160,
            editable: true,
          },
        ]}
        rows={rows}
      />
    </div>
  );
}
