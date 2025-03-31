import React, { useEffect, useRef } from "react";
import AppRoutes from "./AppRoutes";
import { loginAutomatically } from "./core/service/auth";
import { getAll } from "./core/service/product";

const App: React.FC = () => {
  const hasRun = useRef(false); // Evita que a função rode mais de uma vez

  useEffect(() => {
    const autoLogin = async () => {
      if (!hasRun.current) {
        await loginAutomatically();
        hasRun.current = true;
      }
    };

    autoLogin();

    const fetch = async () => {
      const data = await getAll();
      console.log(data);
    };
    fetch();
  }, []);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

export default App;
