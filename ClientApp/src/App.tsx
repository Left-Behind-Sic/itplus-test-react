import React from "react";
import { Container, Grid } from "@mui/material";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import DataGrid from "./components/DataGrid";
import Charts from "./components/charts/Charts";

function App() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Header />
          <Routes>
            <Route path="/DataGrid" element={<DataGrid />} />
            <Route path="/Charts" element={<Charts />} />
            <Route path="/" element={<DataGrid />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
