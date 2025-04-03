import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signinSchema,
  signinFormData,
} from "../../core/validation/authValidation";
import { Link } from "react-router-dom";
import "./authForm.scss";

interface AuthFormProps {
  onSubmit: (data: signinFormData) => void;
}

function AuthForm({ onSubmit }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signinFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async (data: signinFormData) => {
    try {
      await onSubmit(data);
      console.log(data);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="containSignIn">
      <div className="heading">
        <p className="signIn">Login</p>
        <p className="sub">Bem-vindo de volta!</p>
        <p className="text">Entre com sua conta para continuar</p>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="auth-form">
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        {/* Senha */}
        <div className="input-group">
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            aria-invalid={!!errors.password}
            autoComplete="off"
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        {/* Botões */}

        <div className="form-actions">
          <Link to="/" className="cancel-button-auth">
            Cancelar
          </Link>

          <button type="submit" className="signIn-button">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
