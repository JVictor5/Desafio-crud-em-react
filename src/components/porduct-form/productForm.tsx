import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  ProductFormData,
} from "../../core/validation/productValidation";
import { Link, useNavigate } from "react-router-dom";
import "./productForm.scss";

interface ProductFormProps {
  productData?: ProductFormData;
  onSubmit: (data: ProductFormData) => void;
}

function ProductForm({ productData, onSubmit }: ProductFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: productData || {
      id: 0,
      name: "",
      description: "",
      price: 0,
      status: 0,
      stock_quantity: 0,
    },
  });

  useEffect(() => {
    if (productData) reset(productData);
  }, [productData, reset]);

  const statusOptions = [
    { value: 1, label: "Em Estoque" },
    { value: 2, label: "Em Reposição" },
    { value: 3, label: "Em Falta" },
  ];

  const handleFormSubmit = async (data: ProductFormData) => {
    try {
      await onSubmit(data);
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="product-form">
      {/* Nome */}
      <h2 className="text">
        {productData ? "Editar Produto" : "Cadastrar Produto"}
      </h2>
      <div className="input-group">
        <label htmlFor="name">Nome:</label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "O nome é obrigatório." })}
          aria-invalid={!!errors.name}
          autoComplete="off"
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>

      {/* Descrição */}
      <div className="input-group">
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          {...register("description", {
            required: "A descrição é obrigatória.",
          })}
          aria-invalid={!!errors.description}
          autoComplete="off"
          rows={4} // Define altura inicial
        />
        {errors.description && (
          <p className="error-message">{errors.description.message}</p>
        )}
      </div>

      {/* Preço */}
      <div className="input-group">
        <label htmlFor="price">Preço:</label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register("price", {
            valueAsNumber: true,
            required: "O preço é obrigatório.",
          })}
          aria-invalid={!!errors.price}
        />
        {errors.price && (
          <p className="error-message">{errors.price.message}</p>
        )}
      </div>

      {/* Status */}
      <div className="input-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          {...register("status", {
            valueAsNumber: true,
            required: "Selecione um status.",
          })}
          aria-invalid={!!errors.status}
        >
          <option value="0" disabled>
            Selecione o status
          </option>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.status && (
          <p className="error-message">{errors.status.message}</p>
        )}
      </div>

      {/* Quantidade em Estoque */}
      <div className="input-group">
        <label htmlFor="stock_quantity">Quantidade em Estoque:</label>
        <input
          id="stock_quantity"
          type="number"
          {...register("stock_quantity", {
            valueAsNumber: true,
            required: "A quantidade em estoque é obrigatória.",
          })}
          aria-invalid={!!errors.stock_quantity}
        />
        {errors.stock_quantity && (
          <p className="error-message">{errors.stock_quantity.message}</p>
        )}
      </div>

      {/* Botões */}
      <div className="form-actions">
        <Link to="/" className="cancel-button" onClick={() => reset()}>
          Cancelar
        </Link>
        <button type="submit" className="submit-button">
          {productData ? "Atualizar Produto" : "Cadastrar Produto"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
