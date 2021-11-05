import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import GlobalState from "./context/GlobalState";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <GlobalState>
      <App />
    </GlobalState>
  </React.StrictMode>,
  document.getElementById("root")
);
