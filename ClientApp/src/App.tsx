import React, { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import DataGrid from "./components/DataGrid";
import HouseChart from "./components/charts/HouseChart";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchHousesPlants } from "./store/reducers/ActionCreators";
import PlantsChart from "./components/charts/PlantsChart";
import HousesPlantsChart from "./components/charts/HousesPlantsChart";

function App() {
  const { housesPlants, isLoading, error } = useAppSelector(
    (state) => state.houseReducer
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchHousesPlants());
  }, [dispatch]);

  // let houseMap = Object.entries(housesPlants.houses);
  // console.log(houseMap);

  return (
    <Container sx={{ mt: "1rem" }}>
      <Grid container>
        {isLoading && <h1>Загрузка</h1>}
        {error && <h1>Ошибка</h1>}
        {/*<Grid item xs={12} md={4}>*/}
        {/*  <Tabs />*/}
        {/*</Grid>*/}
        <Grid item xs={12} md={12}>
          <HouseChart housesPlants={housesPlants} />
          <hr />
          <PlantsChart housesPlants={housesPlants} />
          <hr />
          <HousesPlantsChart housesPlants={housesPlants} />
          <DataGrid housesPlants={housesPlants} />
        </Grid>
        {/*{housesPlants.houses.map((house) => (*/}
        {/*  <Grid item xs={12} md={4} key={house.ConsumerId}>*/}
        {/*    <div>*/}
        {/*      <h1>*/}
        {/*        {house.ConsumerId}. {house.Name}*/}
        {/*      </h1>*/}
        {/*      <div>*/}
        {/*        {house.consumptions.map((consumption, index) => (*/}
        {/*          <span key={index}>*/}
        {/*            <h2>Дата: {consumption.Date}</h2>*/}
        {/*            <p> Температура: {consumption.Weather}</p>*/}
        {/*            <strong>Потребление: {consumption.Consumption}</strong>*/}
        {/*          </span>*/}
        {/*        ))}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </Grid>*/}
        {/*))}*/}
      </Grid>
    </Container>
  );
}

export default App;
