import { Grid } from "@mui/material";
import { useQuery } from "react-query";
import { HousesPlants } from "../../models/IHouse";
import { getData } from "../../store/reducers/ActionCreators";
import HouseChart from "./HouseChart";
import HousesPlantsChart from "./HousesPlantsChart";
import PlantsChart from "./PlantsChart";

export default function Charts() {
    const { data } = useQuery("housesPlants", getData);
    const housesPlants: HousesPlants = data;

    return (
        <>
            {housesPlants && (
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
            )}
        </>
    );
}
