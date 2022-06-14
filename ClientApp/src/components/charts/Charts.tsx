import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchHousesPlants } from "../../store/reducers/ActionCreators";
import HouseChart from "./HouseChart";
import HousesPlantsChart from "./HousesPlantsChart";
import PlantsChart from "./PlantsChart";

export default function Charts() {
    return (
        <>
            <Grid
                item
                sx={{
                    display: "flex",
                    height: { xs: 300, md: 700 },
                }}
            >
                <HouseChart />
            </Grid>
            <Grid
                item
                sx={{
                    display: "flex",
                    height: { xs: 300, md: 700 },
                }}
            >
                <PlantsChart />
            </Grid>
            <Grid
                item
                sx={{
                    display: "flex",
                    height: { xs: 400, md: 700 },
                }}
            >
                <HousesPlantsChart />
            </Grid>
        </>
    );
}
