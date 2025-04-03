# 🧩 Desafio - CRUD em React

Este projeto é uma aplicação **CRUD** (Create, Read, Update, Delete) desenvolvida com **React** e **TypeScript**, com foco em autenticação, rotas protegidas e testes automatizados utilizando **Jest**.

---

## 📌 Descrição

A aplicação permite:

- Login de usuário
- Cadastro, listagem, edição e exclusão de produtos
- Rotas protegidas por autenticação
- Validação de formulários com **Zod** e **React Hook Form**
- Testes com **Jest** e **React Testing Library**

---

## 🚀 Tecnologias Utilizadas

- React + TypeScript
- React Router DOM
- React Hook Form + Zod
- Jest + React Testing Library
- SCSS
- Axios
- SweetAlert2

---

## ⚙️ Instalação e Execução

### Passos

```bash
git clone https://github.com/JVictor5/Desafio-crud-em-react.git
cd desafio-crud-em-react
npm install
# ou
yarn install
```

A aplicação requer autenticação via e-mail e senha. O login deve ser feito na tela inicial da aplicação.

### Executar Projeto e Testes

```bash
# Iniciar a aplicação
npm start
# ou
yarn start

# Executar testes
npm test
# ou
yarn test
```

A aplicação ficará disponível em **http://localhost:3000**.

---

### Testes

Os testes são direcionados aos componentes principais, com foco em uma única página onde sua execução é necessária.

## 📁 Estrutura do Projeto

```text
├── public/          # Arquivos públicos
├── src/
│   ├── components/               # Componentes reutilizáveis
│   │   ├── auth-form/            # Formulário de autenticação (login)
│   │   └── product-form/         # Formulário para criação e edição de produtos
│   │
│   ├── core/                     # Camada central da aplicação
│   │   ├── api/                  # Comunicação com a API
│   │   ├── protect/              # Proteção de rotas (ex: PrivateRoute)
│   │   ├── service/              # Serviços (ex: authService, productService)
│   │   └── validation/           # Schemas de validação com Zod
│   │
│   ├── layouts/                  # Componentes de layout
│   │   ├── footer/               # Rodapé da aplicação
│   │   └── navbar/               # Cabeçalho da aplicação
│   │
│   ├── pages/                    # Páginas principais
│   │   ├── createProduct/        # Cadastro de produto
│   │   ├── home/                 # Listagem de produtos
│   │   ├── signin/               # Tela de login
│   │   └── updateProduct/        # Edição de produto
│   │
│   ├── tests/                    # Testes automatizados
│   │   ├── components/           # Testes dos componentes
│   │   ├── mocks/                # Utilitários e mocks
│   │   ├── pag/                  # Testes das páginas
│   │   └── jest.setup.ts         # Setup do jest
│   │
│   ├── AppRoutes.tsx             # Definição das rotas
│   ├── App.tsx                   # Componente raiz
│   ├── index.tsx                 # Ponto de entrada da aplicação
│   ├── app.scss                  # Estilos globais
│   ├── app.scss                  # Estilos globais
│
├── jest.config.ts   # Configuração do jest
├── package.json     # Dependências e scripts
├── README.md        # Documentação
```

---

# 📘 Documentação dos Componentes e Páginas

## 🧱 Layouts

---

### 1. Header

- **Responsabilidade:** Cabeçalho da aplicação.
- **Comportamento:** Exibe o logotipo e o título "ProductManager".
- **Propriedades:** Nenhuma.

---

### 2. Footer

- **Responsabilidade:** Rodapé da aplicação.
- **Comportamento:** Exibe os direitos autorais e o nome do desenvolvedor.
- **Propriedades:** Nenhuma.

---

## 🧩 Componentes

---

### 3. AuthForm

- **Responsabilidade:** Formulário de login.
- **Propriedades:**
  - `onSubmit(data: SigninFormData)`: Callback de envio.
- **Validação:**
  - Com `Zod` + `React Hook Form`.
  - Campos obrigatórios: e-mail e senha.

---

### 4. ProductForm

- **Responsabilidade:** Cadastro/edição de produtos.
- **Propriedades:**
  - `productData?`: Dados existentes do produto.
  - `onSubmit(data: ProductFormData)`: Callback de envio.
- **Validação:**
  - Zod + React Hook Form.
- **Campos:**
  - Nome, descrição, preço, status, quantidade em estoque.

---

## 📄 Páginas

---

### 1. SignIn.tsx

- **Responsabilidade:** Tela de login.
- **Comportamento:**
  - Renderiza `AuthForm`.
  - Chama `signin()` com os dados.
  - Redireciona para `/` em caso de sucesso.

---

### 2. Home.tsx

- **Responsabilidade:** Página inicial.
- **Funcionalidades:**
  - Carrega produtos com `getAll()`.
  - Permite:
    - Login/logout
    - Cadastrar, editar e excluir produtos
    - Confirmações com **SweetAlert2**

---

### 3. CreateProduct.tsx

- **Responsabilidade:** Cadastro de produto.
- **Comportamento:**
  - Renderiza `ProductForm`.
  - Chama `createProduct(data)`.

---

### 4. UpdateProduct.tsx

- **Responsabilidade:** Edição de produto.
- **Comportamento:**
  - Busca produto com `getProduct(id)`.
  - Renderiza `ProductForm` preenchido.
  - Chama `updateProduct(data)`.

---

## 📌 Observações

- Estrutura modularizada para facilitar a manutenção e reuso.
- Validações robustas com foco em experiência do usuário e integridade de dados.
