import axios from "axios";
import Swal from "sweetalert2";

export const api = axios.create({
  baseURL: "http://34.71.240.100/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const tokenRaw = localStorage.getItem("token");

    if (tokenRaw) {
      try {
        const parsed = JSON.parse(tokenRaw);
        const { access_token, expires_in, created_at } = parsed;

        const createTime = new Date(created_at).getTime();
        const currentTime = new Date().getTime();
        const diffInSeconds = (currentTime - createTime) / 1000;

        if (diffInSeconds < Number(expires_in)) {
          // Token ainda válido
          config.headers["Authorization"] = `Bearer ${access_token}`;
        } else {
          // Token expirado
          localStorage.removeItem("token");

          await Swal.fire({
            title: "Sessão expirada",
            text: "Faça login novamente.",
            icon: "error",
            confirmButtonText: "OK",
          });

          window.location.href = "/signin";
        }
      } catch (e) {
        console.error("Token inválido no localStorage:", e);
        localStorage.removeItem("token");

        await Swal.fire({
          title: "Erro de autenticação",
          text: "Token inválido. Faça login novamente.",
          icon: "error",
          confirmButtonText: "OK",
        });

        window.location.href = "/signin";
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
