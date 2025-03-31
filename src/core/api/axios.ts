import axios from "axios";
import { loginAutomatically } from "../service/auth";

export const api = axios.create({
  baseURL: "http://34.71.240.100/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    await loginAutomatically();
    let token = localStorage.getItem("token");

    if (token) {
      const { access_token } = JSON.parse(token);

      config.headers["Authorization"] = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
