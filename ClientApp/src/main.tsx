import { ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { theme } from "./MUI_Theme/theme";
import { setupStore } from "./store/store";
import { ReactQueryDevtools } from "react-query/devtools";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const store = setupStore();

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <App />
                    <ReactQueryDevtools />
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </QueryClientProvider>,
    document.getElementById("root")
);
