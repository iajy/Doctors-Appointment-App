import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import AppBar from "./Components/AppBar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppBar/>
    <App />
    <Toaster />
  </StrictMode>
);
