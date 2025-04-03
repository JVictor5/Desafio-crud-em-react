import { api } from "../api/axios";
import { ProductFormData } from "../validation/productValidation";
export interface ProductApiResponse {
  success: boolean;
  code: number;
  data: ProductFormData; // Dados do produto
}
// Criar produto
export const createProduct = async (productData: ProductFormData) => {
  try {
    const response = await api.post("/product/create", productData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
};

// Listar todos os produtos
export const getAll = async () => {
  try {
    const response = await api.post("/product/list", {});
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};

// Buscar um produto específico
export const getProduct = async (id: number): Promise<ProductApiResponse> => {
  try {
    const response = await api.get(`/product/read?id=${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar o produto ${id}:`, error);
    throw error;
  }
};

export const updateProduct = async (productData: ProductFormData) => {
  try {
    const response = await api.put(`/product/update`, productData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar o produto ${productData}:`, error);
    throw error;
  }
};

// Deletar um produto
export const deleteProduct = async (id: number) => {
  try {
    const response = await api.delete(`/product/delete`, {
      data: { id },
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar o produto ${id}:`, error);
    throw error;
  }
};
