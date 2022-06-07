import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchHousesPlants } from "./store/reducers/ActionCreators";
import { Container, createTheme, Grid } from "@mui/material";
import DataGrid from "./components/DataGrid";
import { ruRU } from "@mui/material/locale";

function App() {
  // const { housesPlants, isLoading, error } = useAppSelector(
  //   (state) => state.houseReducer
  // );
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchHouses());
  // }, [dispatch]);

  // let houseMap = Object.entries(housesPlants.houses);
  // console.log(houseMap);

  return (
    <Container sx={{ mt: "1rem" }}>
      <Grid container>
        {/*<Grid item xs={12} md={4}>*/}
        {/*  <Tabs />*/}
        {/*</Grid>*/}
        <Grid item xs={12} md={12}>
          <DataGrid />
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
