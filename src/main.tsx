import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TemperatureProvider } from "./components/Context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TemperatureProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TemperatureProvider>
);
