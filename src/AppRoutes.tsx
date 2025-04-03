import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/home/home";
import CreateProduct from "./pages/createProduct/createProduct";
import UpdateProduct from "./pages/updateProduct/updateProduct";
import Signin from "./pages/signin/signin";
import Footer from "./layouts/footer/footer";
import Navbar from "./layouts/navbar/navbar";
import PrivateRoute from "./core/protect/PrivateRoute";
import PublicRoute from "./core/protect/PublicRoute";

const AppRoutes: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/signin"
            element={
              <PublicRoute>
                <Signin />
              </PublicRoute>
            }
          />

          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateProduct />
              </PrivateRoute>
            }
          />

          <Route
            path="/update/:productId"
            element={
              <PrivateRoute>
                <UpdateProduct />
              </PrivateRoute>
            }
          />

          {/* Rota para qualquer path não encontrado */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes;
