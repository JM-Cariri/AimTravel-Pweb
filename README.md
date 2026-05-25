# AimTravel

> Viaje mais, gaste menos — inspire e seja inspirado.

AimTravel é uma plataforma PWA de viagens onde usuários compartilham relatos reais com custos detalhados e pontos turísticos visitados, inspirando outras pessoas a viajar. O app integra companhias aéreas, hotéis, restaurantes e agências de turismo, permitindo a compra de pacotes e passagens diretamente na plataforma.

---

## Tecnologias

**Frontend**
- React.js
- React Router v6
- React Query
- Axios
- Lucide Icons

**Backend**
- Node.js + Express
- PostgreSQL
- Socket.io (WebSocket)
- JWT + Passport.js (OAuth2)

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado na sua máquina:

- Node.js v18 ou superior — https://nodejs.org
- PostgreSQL v15 ou superior — https://www.postgresql.org
- Git — https://git-scm.com

---

## ⚙️ Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/AimTravel-Pweb.git
cd AimTravel-Pweb
```

### 2. Configure o Backend

```bash
cd backend
npm install
cp .env.example .env
```

Abra o arquivo `.env` e preencha as variáveis com suas configurações locais (banco de dados, chaves de API, etc.).

Crie o banco de dados no PostgreSQL:

```bash
createdb aimtravel
```

Rode as migrations:

```bash
npm run migrate
```

Inicie o servidor:

```bash
npm run dev
```

O backend estará disponível em `http://localhost:3001`

### 3. Configure o Frontend

Abra um novo terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

Inicie a aplicação:

```bash
npm start
```

O frontend estará disponível em `http://localhost:3000`

---

## Estrutura do Projeto

```
/AimTravel-Pweb
  ├── /frontend        ← Aplicação React PWA
  ├── /backend         ← API Node.js + Express
  └── /docs            ← Documentação completa
```

---

## Documentação

Toda a documentação do projeto está na pasta `/docs`:

- `main.md` — Visão geral, stack, público-alvo e entidades
- `design-system.md` — Cores, tipografia e componentes visuais
- `architecture.md` — Arquitetura, padrões de código e fluxo de desenvolvimento
- `competitors.md` — Análise de concorrência
- `/specs` — Especificações detalhadas por funcionalidade

---

## Branches

```
main          ← produção, sempre estável
develop       ← integração, base para novas features
feature/xxx   ← nova funcionalidade
fix/xxx       ← correção de bug
docs/xxx      ← documentação
```

Nunca commitar direto na `main`. Sempre abrir Pull Request para `develop`.

---

## Time

Projeto desenvolvido como parte de trabalho acadêmico.

---

## Licença

Este projeto é de uso acadêmico e não possui licença de distribuição pública.
