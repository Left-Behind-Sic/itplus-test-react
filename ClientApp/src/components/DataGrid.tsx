import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { HousesPlants } from "../models/IHouse";

interface ChartProps {
  housesPlants: HousesPlants;
}

export default function Grid({ housesPlants }: ChartProps) {
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

  return (
    <div style={{ height: window.innerHeight - 40, width: "100%" }}>
      <DataGrid
        getRowId={(row) => row.id}
        experimentalFeatures={{ newEditingApi: true }}
        columns={columns}
        rows={rows()}
      />
    </div>
  );
}
