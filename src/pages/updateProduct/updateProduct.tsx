import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import ProductForm from "../../components/porduct-form/productForm";
import { ProductFormData } from "../../core/validation/productValidation";
import { getProduct, updateProduct } from "../../core/service/product"; // Exemplo de serviço para buscar o produto
import { useParams } from "react-router-dom";

const UpdateProduct: React.FC = () => {
  const [productData, setProductData] = useState<ProductFormData | null>(null);
  const navigate = useNavigate(); // Cria uma instância de navegação
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(Number(productId));
        setProductData(response.data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleUpdateProduct = async (data: ProductFormData) => {
    try {
      await updateProduct(data);
      navigate("/");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  if (!productData) {
    return null; // Não exibe nada enquanto os dados não estiverem prontos
  }

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <ProductForm productData={productData} onSubmit={handleUpdateProduct} />
    </div>
  );
};

export default UpdateProduct;
