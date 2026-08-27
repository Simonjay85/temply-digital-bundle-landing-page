import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/components.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
