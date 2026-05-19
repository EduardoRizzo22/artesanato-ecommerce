# E-commerce Artesanal

Um sistema completo de E-commerce construído para venda de produtos artesanais. O projeto conta com um portal público para os clientes visualizarem produtos, adicionarem ao carrinho e realizarem o checkout, além de um painel administrativo seguro para a gestão de catálogo e acompanhamento de vendas.

## Tecnologias Utilizadas

- **Frontend:** React.js (com Vite), React Router DOM.
- **Backend:** Node.js, Express.js.
- **Banco de Dados:** MongoDB.
- **Upload de Arquivos:** Multer (armazenamento local).
- **Segurança e Autenticação:** JWT (JSON Web Tokens) e bcryptjs para criptografia de senhas.

## Funcionalidades

### Área Pública (Clientes)
- Visualização da vitrine de produtos na Home com design moderno e agradável.
- Sistema de Carrinho de Compras.
- Checkout para finalizar pedidos.
- Autenticação de usuários (Cadastro e Login seguros com criptografia).

### Área Administrativa (Painel Admin)
- Acesso restrito (visível na navegação apenas para contas com permissão de administrador).
- **Gestão de Produtos:** Cadastro, edição e exclusão de produtos em tempo real.
- **Upload de Imagens:** Suporte para escolher imagens direto do computador, salvar em pasta local (`/uploads`) de forma integrada na criação/edição do produto.
- **Relatório de Vendas:** Listagem de todos os pedidos finalizados com ID, Valor Total e Quantidade de Itens.

---

## Como rodar o projeto

Siga o passo a passo abaixo para rodar o projeto localmente na sua máquina.

### 1. Iniciar o Banco de Dados (MongoDB)
O projeto depende do MongoDB. Ele está configurado para rodar isoladamente através do Docker, porém com a porta mapeada para o seu computador local.
Abra um terminal na pasta raiz do projeto e execute:
```bash
docker-compose up -d mongo
```
*Isso deixará o banco de dados rodando em segundo plano na porta 27017.*

### 2. Iniciar o Backend (API)
O backend é responsável por toda a lógica de segurança, processamento das compras e persistência dos dados.
Abra um **novo** terminal, navegue até a pasta do backend e execute:
```bash
cd backend
npm install
npm run dev
```
*O servidor Node.js iniciará na porta 5000.*

### 3. Iniciar o Frontend (Interface)
O frontend contém toda a interface visual que o usuário e o administrador acessarão no navegador.
Abra um **terceiro** terminal, navegue até a pasta do frontend e execute:
```bash
cd frontend
npm install
npm run dev
```
*O Vite iniciará o servidor frontend. Acesse no seu navegador em `http://localhost:5173` (ou a porta indicada no terminal).*

---

## Como criar uma conta de Administrador

Como o banco de dados inicia zerado, não há um login padrão no código. Para acessar o Painel Admin, crie sua própria conta de administrador seguindo os passos:

1. Acesse o site pelo navegador e vá para a aba **Cadastre-se**.
2. Preencha seus dados de e-mail, senha, etc.
3. Marque a caixa especial: **"Criar conta como Administrador (Apenas para testes)"**.
4. Clique em Cadastrar.
5. Em seguida, vá na tela de **Login** e entre com as informações cadastradas.
6. A opção **Admin** aparecerá instantaneamente no topo da tela para você.