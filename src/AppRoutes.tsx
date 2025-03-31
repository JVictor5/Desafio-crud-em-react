import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/home";
import CreateProduct from "./pages/createProduct/createProduct";
import UpdateProduct from "./pages/updateProduct/updateProduct";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/update/:productId" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
