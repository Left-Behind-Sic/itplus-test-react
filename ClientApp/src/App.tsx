import React, { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import DataGrid from "./components/DataGrid";
import Charts from "./components/charts/Charts";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchHousesPlants } from "./store/reducers/ActionCreators";

function App() {
    const { isLoading, error } = useAppSelector(
        (state) => state.housesPlantsReducer
    );

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchHousesPlants());
    }, []);
    return (
        <Container>
            <Grid container>
                <Header />
                <Grid item xs={12} md={12}>
                    {isLoading && <h1>Загрузка</h1>}
                    {error && <h1>Ошибка</h1>}
                    <Routes>
                        <Route path="/Charts" element={<Charts />} />
                        <Route path="/" element={<DataGrid />} />
                    </Routes>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
