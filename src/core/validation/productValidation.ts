import { z } from "zod";

export const productSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().min(1, "O nome é obrigatório"),
    description: z.string().min(1, "A descrição é obrigatória"),
    price: z.number().nonnegative("O preço deve ser um número válido"),
    status: z.number().refine((val) => [1, 2, 3].includes(val), {
      message: "Status inválido",
    }),
    stock_quantity: z
      .number()
      .min(0, "A quantidade deve ser maior ou igual a 0")
      .nonnegative("A quantidade deve ser um número válido"),
  })
  .refine(
    (data) => {
      if (data.status === 1 || data.status === 2) {
        return data.stock_quantity > 0;
      }
      if (data.status === 3) {
        return data.stock_quantity === 0;
      }
      return true;
    },
    {
      message: "A quantidade em estoque não condiz com o status selecionado",
      path: ["stock_quantity"],
    }
  );

export type ProductFormData = z.infer<typeof productSchema>;
