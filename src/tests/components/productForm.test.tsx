import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductForm from "../../components/porduct-form/productForm";
import { ProductFormData } from "../../core/validation/productValidation";

const mockOnSubmit = jest.fn();

const renderForm = (productData?: ProductFormData) => {
  render(
    <BrowserRouter>
      <ProductForm productData={productData} onSubmit={mockOnSubmit} />
    </BrowserRouter>
  );
};

describe("ProductForm", () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("deve renderizar todos os campos do formulário", () => {
    renderForm();

    expect(
      screen.getByRole("heading", { name: /cadastrar produto/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preço/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantidade em estoque/i)).toBeInTheDocument();
  });

  it("deve submeter os dados corretamente", async () => {
    renderForm();

    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: "Produto Teste" },
    });
    fireEvent.change(screen.getByLabelText(/descrição/i), {
      target: { value: "Descrição de teste" },
    });
    fireEvent.change(screen.getByLabelText(/preço/i), {
      target: { value: "100.50" },
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/quantidade em estoque/i), {
      target: { value: "5" },
    });

    fireEvent.click(screen.getByRole("button", { name: /cadastrar produto/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        id: 0,
        name: "Produto Teste",
        description: "Descrição de teste",
        price: 100.5,
        status: 1,
        stock_quantity: 5,
      });
    });
  });
});
