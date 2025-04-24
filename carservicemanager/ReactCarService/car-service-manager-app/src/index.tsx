import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box,CssBaseline } from "@mui/material";
import MenuComponent from "./components/menu/MenuComponent";
import IndexComponent from "./components/IndexComponent";
import CarsUpdateComponent from "./components/car/CarsUpdateComponent";
import CarsSaveComponent from "./components/car/CarsSaveComponent";
import CarsComponent from "./components/car/CarsComponent";
import CarsDetailsComponent from "./components/car/CarsDetailsComponent";
import ServicesComponent from "./components/carService/ServicesComponent";
import ServicesSaveComponent from "./components/carService/ServicesSaveComponent";
import ServicesUpdateComponent from "./components/carService/ServicesUpdateComponent";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Menü alanı */}
        <Box sx={{ width: "250px", bgcolor: "#f9f9f9", borderRight: "1px solid #ddd" }}>
          <MenuComponent />
        </Box>

        {/* Ana içerik alanı */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<IndexComponent />} />
            <Route path="cars" element={<CarsComponent />} />
            <Route path="cars/detail" element={<CarsDetailsComponent />} />
            <Route path="cars/save" element={<CarsSaveComponent />} />
            <Route path="cars/update" element={<CarsUpdateComponent />} />
            <Route path="services" element={<ServicesComponent />} />
            <Route path="services/save" element={<ServicesSaveComponent />} />
            <Route path="services/update" element={<ServicesUpdateComponent />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  </React.StrictMode>
);