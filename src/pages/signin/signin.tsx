import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth-form/authForm"; // Importe o componente AuthForm
import { signinFormData } from "../../core/validation/authValidation";
import { signin } from "../../core/service/auth";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = async (data: signinFormData) => {
    try {
      await signin(data);
      console.log("Login bem-sucedido:", data);
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <AuthForm onSubmit={handleLoginSubmit} />
    </div>
  );
};

export default SignIn;
