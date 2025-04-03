import React, { useEffect, useState } from "react";
import { getAll, deleteProduct } from "../../core/service/product";
import { Link } from "react-router-dom";
import "./home.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);
  const MySwal = withReactContent(Swal);

  const fetchProducts = async () => {
    try {
      const response = await getAll();
      console.log(response);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error("Erro: os dados não são um array", response);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    const checkAuthAndFetch = () => {
      const token = localStorage.getItem("token");
      const isNowAuthenticated = !!token;
      setIsAuthenticated(isNowAuthenticated);

      if (isNowAuthenticated && products.length === 0) {
        fetchProducts();
      }
    };

    // Verifica imediatamente ao montar o componente
    checkAuthAndFetch();

    // Escuta alterações no localStorage (ex: login em outra aba)
    window.addEventListener("storage", checkAuthAndFetch);

    return () => window.removeEventListener("storage", checkAuthAndFetch);
  }, [products.length]);

  const swalWithBootstrapButtons = MySwal.mixin({
    customClass: {
      actions: "swal-actions",
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const handleDelete = async (id: number, name: string) => {
    swalWithBootstrapButtons
      .fire({
        title: "Tem certeza?",
        html: `<p>Você não poderá reverter essa ação!</p><p>Id do produto: ${id} </p><p>Nome do produto: ${name}</p>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, deletar!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteProduct(id);
            await fetchProducts();
            swalWithBootstrapButtons.fire({
              title: "Deletado!",
              text: "O produto foi removido com sucesso.",
              icon: "success",
            });
          } catch (error) {
            console.error("Erro ao excluir produto:", error);
            swalWithBootstrapButtons.fire({
              title: "Erro!",
              text: "Não foi possível excluir o produto.",
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Seu produto está seguro",
            icon: "error",
          });
        }
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setProducts([]);
  };

  const statusOptions = [
    { value: 1, label: "Em Estoque", className: "in-stock" },
    { value: 2, label: "Em Reposição", className: "restocking" },
    { value: 3, label: "Em Falta", className: "out-of-stock" },
  ];

  return (
    <>
      <h1 className="title">Gerenciamento de Produtos</h1>
      <div className="home-container">
        <div className="actions-container">
          {!isAuthenticated && (
            <Link to="/signin" className="btn">
              Login
            </Link>
          )}
          {isAuthenticated && (
            <>
              <button className="logout" onClick={logout}>
                Logout
              </button>
              <Link to="/create" className="btn">
                Cadastrar Produto
              </Link>
            </>
          )}
        </div>

        <div className="table table-responsive-xl">
          <table>
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Status</th>
                <th>Stock</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((item) => {
                  const statusInfo = statusOptions.find(
                    (option) => option.value === item.status
                  );
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td className="limited-description">
                        {item.description}
                      </td>
                      <td>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item.price)}
                      </td>
                      <td className={statusInfo?.className || "unknown"}>
                        {statusInfo?.label || "Desconhecido"}
                      </td>
                      <td>{item.stock_quantity}</td>
                      <td className="actions">
                        <Link to={`/update/${item.id}`} className="edit">
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          className="delete"
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="empty-message">
                    {isAuthenticated
                      ? "Nenhum produto encontrado."
                      : "Faça login para ver os produtos."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
