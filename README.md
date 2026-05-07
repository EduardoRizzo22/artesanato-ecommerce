# E-commerce Artesanal

## Requisitos

* Node.js
* MongoDB Community Server
* MongoDB Compass (Opcional)

---

# Instalação MongoDB

Baixar:

[https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

Durante instalação marcar:

```txt
Install MongoDB as a Service
```

---

# Verificar se MongoDB está rodando

Abrir:

```bash
services.msc
```

Procurar:

```txt
MongoDB
```

Se estiver parado:

```txt
Start
```

---

# Backend

## Configurar .env

Arquivo:

```txt
backend/.env
```

Conteúdo:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/artesanato
JWT_SECRET=segredo
```

---

## Instalar dependências

```bash
cd backend
npm install
```

---

## Inserir Seed

```bash
npm run seed
```

Resultado esperado:

```txt
Produtos cadastrados
```

---

## Rodar Backend

```bash
npm run dev
```

Resultado esperado:

```txt
MongoDB conectado
Servidor rodando
```

---

# Frontend

## Instalar dependências

```bash
cd frontend
npm install
```

---

## Rodar Frontend

```bash
npm run dev
```

Resultado esperado:

```txt
VITE v5
Local: http://localhost:5173/
```

---

# Frontend Index.html

Arquivo:

```txt
frontend/index.html
```

Conteúdo:

```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>E-commerce Artesanal</title>
  </head>

  <body>
    <div id="root"></div>

    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

# Acessos

Frontend:

```txt
http://localhost:5173
```

Backend:

```txt
http://localhost:5000
```

---

# Funcionalidades

* Cadastro de usuário
* Login JWT
* Catálogo de produtos
* Carrinho
* Checkout fake
* CRUD de produtos
* Painel Admin
* Seed automátic
