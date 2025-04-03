# 🧩 Desafio - CRUD em React

Este projeto é uma aplicação CRUD (Create, Read, Update, Delete) Desenvolvido com **React** e **TypeScript**, com foco em autenticação, rotas protegidas e testes automatizados utilizando Jest.

---

## 📌 Descrição

A aplicação permite:

- Login do usuário
- Criação, visualização, edição e exclusão de produtos
- Rotas protegidas por autenticação
- Validação de formulários com Zod e React Hook Form
- Testes com Jest e React Testing Library

---

## 🚀 Tecnologias Utilizadas

- React + TypeScript
- React Router DOM
- React Hook Form + Zod
- Jest + React Testing Library
- SCSS

---

## ⚙️ Instalação e Execução

### Pré-requisitos

- Node.js ^16
- NPM ou Yarn

### Passos

```bash
git clone https://github.com/seu-usuario/desafio-crud-em-react.git
cd desafio-crud-em-react
npm install
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### Rodar os testes

```bash

# rodar o teste dos componentes basta usar o comando abaixo
npm test

```

---

## 📁 Estrutura do Projeto

```text
src/
├── components/               # Componentes reutilizáveis
│   ├── auth-form/            # Formulários de autenticação (login)
│   └── product-form/         # Formulário para criação e edição de produtos
│
├── core/                     # Camada de lógica da aplicação
│   ├── api/                  # Comunicação com API
│   ├── protect/              # Proteção de rotas (ex: PrivateRoute)
│   ├── service/              # Serviços de domínio (ex: authService, productService)
│   └── validation/           # Regras e schemas de validação
│
├── layouts/                  # Layouts reutilizáveis
│   ├── footer/               # Rodapé da aplicação
│   └── navbar/               # Barra de navegação
│
├── pages/                    # Páginas principais do sistema
│   ├── createProduct/        # Página para cadastrar produto
│   ├── home/                 # Página inicial
│   ├── signin/               # Página de login
│   └── updateProduct/        # Página para editar produto
│
├── tests/                    # Testes automatizados
│   ├── components/           # Testes de componentes
│   ├── mocks/                # Mocks e utilitários para testes
│   └── pag/                  # Testes de páginas
│
├── AppRoutes.tsx             # Definição e gerenciamento das rotas
├── App.tsx                   # Componente principal da aplicação
├── index.tsx                 # Ponto de entrada (renderiza o App)
├── app.scss                  # Estilos globais
```

---

## 📄 Documentação dos Componentes

## `AuthForm`

- **Responsabilidade:** Formulário de login.
- **Props:**
  - `onSubmit(data: SigninFormData)`: Callback disparado ao enviar o formulário.
- **Validação:** Utiliza Zod para validar e-mail e senha obrigatórios.

---

## `ProductForm`

- **Responsabilidade:** Cadastro e edição de produtos.
- **Props:**
  - `productData?`: Dados do produto para edição (opcional).
  - `onSubmit(data: ProductFormData)`: Callback disparado ao enviar o formulário.
- **Campos:** Nome, descrição, preço, status, quantidade em estoque.
- **Validação:** Zod com React Hook Form.

---

## `SignIn.tsx`

- Renderiza o componente `AuthForm`.
- Chama `signin()` (service) com os dados recebidos.
- Redireciona para `/` após login bem-sucedido.

---

## `Home.tsx`

- Exibe a listagem de produtos utilizando `getAll()`.
- Ações disponíveis:
  - Login/logout.
  - Cadastro de novo produto.
  - Edição e exclusão de produtos (com confirmação via SweetAlert2).

---

## `CreateProduct.tsx`

- Renderiza o componente `ProductForm`.
- Envia os dados usando `createProduct(data)`.

---

## `UpdateProduct.tsx`

- Busca o produto pelo ID com `getProduct(id)`.
- Renderiza `ProductForm` com os dados preenchidos.
- Atualiza o produto via `updateProduct(data)`.

---
