import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import CreateContextProvider from "./contexts/CreateContext";
import AuthContextProvider from "./contexts/AuthContext";

import "./assets/scss/app.scss";


const root = createRoot(document.getElementById("root"))
root.render(
  <AuthContextProvider>
    <CreateContextProvider>
      <App />
    </CreateContextProvider>
  </AuthContextProvider>
)
