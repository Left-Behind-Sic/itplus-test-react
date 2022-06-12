import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { setupStore } from "./store/store";
import { theme } from "./MUI_Theme/theme";
import { BrowserRouter } from "react-router-dom";

const store = setupStore();

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
);
