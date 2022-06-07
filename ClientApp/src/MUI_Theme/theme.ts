import { createTheme, ThemeProvider } from "@mui/material";
import { ruRU } from "@mui/x-data-grid";

export const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  ruRU
);
