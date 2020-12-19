import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CreateContextProvider from "./contexts/CreateContext";
import "./assets/scss/app.scss";

ReactDOM.render(
  <React.StrictMode>
    <CreateContextProvider>
      <App />
    </CreateContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
