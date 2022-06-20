import { Container, Grid } from "@mui/material";
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import Charts from "./components/charts/Charts";
import DataGrid from "./components/DataGrid";
import Header from "./components/Header";
import { getData } from "./store/reducers/ActionCreators";

function App() {
    const { isLoading, error } = useQuery("housesPlants", getData);

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
