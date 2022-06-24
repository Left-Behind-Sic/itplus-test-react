import { Grid } from "@mui/material";
import { HousesPlants } from "../../models/IHouse";
import useGetData from "./../../hooks/useGetData";
import HouseChart from "./HouseChart";
import HousesPlantsChart from "./HousesPlantsChart";
import PlantsChart from "./PlantsChart";

export default function Charts() {
    const { data, isSuccess } = useGetData();
    const housesPlants = data as HousesPlants;

    return (
        <>
            {console.log(isSuccess)}
            {isSuccess ? (
                <>
                    <Grid
                        item
                        sx={{
                            display: "flex",
                            height: { xs: 300, md: 700 },
                        }}
                    >
                        <HouseChart housesPlants={housesPlants} />
                    </Grid>
                    <Grid
                        item
                        sx={{
                            display: "flex",
                            height: { xs: 300, md: 700 },
                        }}
                    >
                        <PlantsChart housesPlants={housesPlants} />
                    </Grid>
                    <Grid
                        item
                        sx={{
                            display: "flex",
                            height: { xs: 400, md: 700 },
                        }}
                    >
                        <HousesPlantsChart housesPlants={housesPlants} />
                    </Grid>
                </>
            ) : (
                <></>
            )}
        </>
    );
}
