import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ApplicationViews } from "./views/ApplicationViews.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <ApplicationViews />
    </React.StrictMode>
  </BrowserRouter>
);
