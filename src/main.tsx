import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./screens/home/home";
import Welcome from "./screens/welcome/welcome";
import { BrowserRouter, Route, Routes } from "react-router";
import { SystemStateProvider } from "./context/systemStateContext";

import "./index.css";

import "./demos/ipc";
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SystemStateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/app" element={<App />} />
        </Routes>
      </BrowserRouter>
    </SystemStateProvider>
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
