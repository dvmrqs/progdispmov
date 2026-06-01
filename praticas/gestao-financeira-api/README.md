# Gestão Financeira API

API REST desenvolvida com Node.js, Express e Prisma ORM para o aplicativo de Gestão Financeira.

## Tecnologias

- Node.js v22+
- Express
- Prisma ORM
- MySQL
- Zod (validação)

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js v22+](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)

## Configuração do Ambiente

### 1. Clone o repositório

```bash
git clone https://github.com/dvmrqs/progdispmov.git
cd progdispmov/praticas/gestao-financeira-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Abra o MySQL e crie o banco:

```sql
CREATE DATABASE gestao_financeira CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Configure as variáveis de ambiente

Copie o arquivo de exemplo e edite com suas credenciais:

```bash
cp .env.example .env
```

Edite o `.env`:

DATABASE_URL="mysql://SEU_USUARIO:SUA_SENHA@localhost:3306/gestao_financeira"
PORT=3000

### 5. Execute as migrations

```bash
npx prisma migrate dev
```

### 6. Popule as categorias iniciais

```bash
npm run prisma:seed
```

### 7. Inicie o servidor

```bash
npm run dev
```

O servidor estará rodando em http://localhost:3000

## Configuração do App

### 1. Acesse a pasta do app

```bash
cd ../gestao-financeira
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a URL da API

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Edite o .env conforme seu ambiente:

Emulador Android
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000
Device físico (substitua pelo IP da sua máquina)
EXPO_PUBLIC_API_URL=http://192.168.0.10:3000
iOS Simulator
EXPO_PUBLIC_API_URL=http://localhost:3000


### 4. Inicie o app

```bash
npx expo start
```

## Credenciais de Login

| Usuário | Senha | Nome |
|---------|-------|------|
| davi | 1234 | Davi Marques |
| admin | admin | Administrador |

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | / | Health check |
| GET | /categories | Lista categorias |
| POST | /categories | Cria categoria |
| PUT | /categories/:id | Atualiza categoria |
| DELETE | /categories/:id | Remove categoria |
| GET | /transactions | Lista transações |
| POST | /transactions | Cria transação |
| PUT | /transactions/:id | Atualiza transação |
| DELETE | /transactions/:id | Remove transação |

A collection completa do Postman está em postman/collection.json.