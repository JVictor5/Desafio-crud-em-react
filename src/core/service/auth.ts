import { api } from "../api/axios";
import { signinFormData } from "../validation/authValidation";


export const signin = async (data: signinFormData) => {
  try {
    const response = await api.post("/auth/login", data);

    const { access_token, expires_in } = response.data;

    localStorage.setItem(
      "token",
      JSON.stringify({
        access_token,
        expires_in,
        created_at: new Date().toISOString(),
      })
    );
    return access_token;
  } catch (error) {
    throw error;
  }
};
