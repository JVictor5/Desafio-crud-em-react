import React from "react";
import ProductForm from "../../components/porduct-form/productForm";
import { ProductFormData } from "../../core/validation/productValidation";
import { createProduct } from "../../core/service/product";

const CreateProduct: React.FC = () => {
  const handleCreateProduct = async (data: ProductFormData) => {
    try {
      await createProduct(data);
    } catch (error) {
      console.error("Erro ao cadastrar produto", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <ProductForm onSubmit={handleCreateProduct} />
    </div>
  );
};

export default CreateProduct;
