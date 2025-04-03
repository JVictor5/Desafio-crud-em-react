import React from "react";
import AppRoutes from "./AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.scss";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

export default App;
