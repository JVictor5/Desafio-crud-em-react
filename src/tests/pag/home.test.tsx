import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "../../pages/home/home";
import { BrowserRouter } from "react-router-dom";
import * as ProductService from "../../core/service/product";

jest.mock("../../core/service/product");
jest.mock("sweetalert2", () => {
  class FakeSwal {
    static fire = jest.fn(() => Promise.resolve({ isConfirmed: true }));
    static mixin = () => FakeSwal;
  }

  return {
    __esModule: true,
    default: FakeSwal,
    DismissReason: { cancel: "cancel" },
  };
});

const mockedGetAll = ProductService.getAll as jest.Mock;
const mockedDeleteProduct = ProductService.deleteProduct as jest.Mock;

const mockProdutos = [
  {
    id: 1,
    name: "Produto A",
    description: "Descrição do produto A",
    price: 50.0,
    status: 1,
    stock_quantity: 10,
  },
  {
    id: 2,
    name: "Produto B",
    description: "Descrição do produto B",
    price: 100.0,
    status: 2,
    stock_quantity: 5,
  },
];

const renderHome = () => {
  localStorage.setItem("token", "fake-token");
  return render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

describe("Home", () => {
  beforeEach(() => {
    mockedGetAll.mockResolvedValue({ data: mockProdutos });
    mockedDeleteProduct.mockResolvedValue({});
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("deve exibir os produtos após buscar com sucesso", async () => {
    renderHome();

    await waitFor(() => {
      expect(screen.getByText("Produto A")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Produto B")).toBeInTheDocument();
    });

    expect(screen.getAllByText("Editar").length).toBe(2);
    expect(screen.getAllByText("Deletar").length).toBe(2);
  });

  it("deve mostrar mensagem para login quando usuário não está autenticado", async () => {
    localStorage.removeItem("token");

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(
      await screen.findByText(/faça login para ver os produtos/i)
    ).toBeInTheDocument();
  });

  it("deve excluir um produto após clicar em 'Deletar'", async () => {
    let currentProdutos = [...mockProdutos];

    mockedGetAll.mockImplementation(() =>
      Promise.resolve({ data: currentProdutos })
    );
    mockedDeleteProduct.mockImplementation((id: number) => {
      currentProdutos = currentProdutos.filter((p) => p.id !== id);
      return Promise.resolve({});
    });

    renderHome();

    await waitFor(() => {
      expect(screen.getByText("Produto A")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Produto B")).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText("Deletar")[0]);

    await waitFor(() => {
      expect(mockedDeleteProduct).toHaveBeenCalledWith(1);
    });

    await waitFor(() => {
      expect(screen.queryByText("Produto A")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Produto B")).toBeInTheDocument();
  });
});
