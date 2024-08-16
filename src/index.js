import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import CreateContextProvider from "./contexts/CreateContext";
import "./assets/scss/app.scss";


const root = createRoot(document.getElementById("root"))
root.render(<React.StrictMode>
  <CreateContextProvider>
    <App />
  </CreateContextProvider>
</React.StrictMode>)
