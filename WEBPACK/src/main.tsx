import React from "react";
import { createRoot } from "react-dom/client";
import "./mystyles.scss";
import logo from "./content/logo_1.png";

const root = createRoot(document.getElementById("root"));

root.render(
  <div>
    <h1>Hello from React!</h1>
    <img src={logo} style={{ width: 200 }} />
  </div>
);
