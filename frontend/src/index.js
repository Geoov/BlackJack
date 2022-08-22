import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./services/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <SnackbarProvider maxSnack={1}>
        <App />
      </SnackbarProvider>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
