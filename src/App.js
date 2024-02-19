import "./styles.css";
import React from "react";
import Navi from "./nav";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./home";
import { Route, Routes } from "react-router-dom";
import Lipsa from "./lipsa";
import Adaug from "./adaug";
import DetaliiAuto from "./detalii";
import BrandCards from "./brandcars";
import Contact from "./contact";

const App = () => {
  return (
    <div>
      <div>
        <Navi />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marca/:brand" element={<BrandCards />} />
        <Route path="/lipsa" element={<Lipsa />} />
        <Route path="/adaug" element={<Adaug />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detalii/:id" element={<DetaliiAuto />} />
      </Routes>
    </div>
  );
};

export default App;
