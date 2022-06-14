import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchHousesPlants } from "../../store/reducers/ActionCreators";
import HouseChart from "./HouseChart";
import HousesPlantsChart from "./HousesPlantsChart";
import PlantsChart from "./PlantsChart";

export default function Charts() {
    const { housesPlants, isLoading, error } = useAppSelector(
        (state) => state.housesPlantsReducer
    );
    // const dispatch = useAppDispatch();
    // useEffect(() => {
    //     dispatch(fetchHousesPlants());
    // }, []);
    return (
        <>
            {isLoading && <h1>Загрузка</h1>}
            {error && <h1>Ошибка</h1>}
            <Grid
                item
                sx={{
                    display: { xs: "flex", md: "block" },
                    height: { xs: 300, md: 700 },
                }}
            >
                <HouseChart housesPlants={housesPlants} />
            </Grid>
            <Grid
                item
                sx={{
                    display: { xs: "flex", md: "block" },
                    height: { xs: 300, md: 700 },
                }}
            >
                <PlantsChart housesPlants={housesPlants} />
            </Grid>
            <Grid
                item
                sx={{
                    display: { xs: "flex", md: "block" },
                    height: { xs: 400, md: 700 },
                }}
            >
                <HousesPlantsChart housesPlants={housesPlants} />
            </Grid>
        </>
    );
}
