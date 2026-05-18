# AimTravel — Arquitetura do Projeto

> Versão: 0.1
> Última atualização: Maio/2026
> Status: Em andamento

---

## 1. Visão Geral

O AimTravel é organizado como um **Monorepo** — frontend e backend vivem no mesmo repositório Git. Essa decisão foi tomada para simplificar o desenvolvimento em time pequeno, facilitar o compartilhamento de tipos e contratos entre as camadas, e reduzir a complexidade operacional no início do projeto.

A comunicação entre frontend e backend acontece via **REST API** para operações padrão e **WebSocket** para notificações em tempo real.

---

## 2. Estrutura de Pastas

```
/AimTravel-Pweb
  ├── /frontend                  ← Aplicação React PWA
  │     ├── /public
  │     │     ├── manifest.json  ← Configuração PWA
  │     │     └── sw.js          ← Service Worker (push notifications)
  │     ├── /src
  │     │     ├── /assets        ← Imagens, ícones, fontes
  │     │     ├── /components    ← Componentes reutilizáveis
  │     │     │     ├── /ui      ← Componentes base (Button, Card, Input...)
  │     │     │     └── /shared  ← Componentes compartilhados entre páginas
  │     │     ├── /pages         ← Páginas da aplicação (uma pasta por rota)
  │     │     ├── /hooks         ← Custom hooks React
  │     │     ├── /services      ← Chamadas à API (fetch/axios)
  │     │     ├── /store         ← Gerenciamento de estado global
  │     │     ├── /utils         ← Funções utilitárias
  │     │     ├── /styles        ← Estilos globais e variáveis CSS
  │     │     └── App.jsx        ← Componente raiz e rotas
  │     ├── .env.example
  │     └── package.json
  │
  ├── /backend                   ← API Node.js + Express
  │     ├── /src
  │     │     ├── /config        ← Configurações (banco, env, cors)
  │     │     ├── /controllers   ← Lógica de cada endpoint
  │     │     ├── /middlewares   ← Auth, validação, erros
  │     │     ├── /models        ← Models do PostgreSQL
  │     │     ├── /routes        ← Definição das rotas da API
  │     │     ├── /services      ← Regras de negócio e integrações externas
  │     │     ├── /jobs          ← Jobs agendados (ex: alerta de cupom expirando)
  │     │     ├── /websocket     ← Configuração e eventos WebSocket
  │     │     └── /utils         ← Funções utilitárias
  │     ├── /migrations          ← Migrations do banco de dados
  │     ├── .env.example
  │     └── package.json
  │
  ├── /docs                      ← Documentação do projeto
  │     ├── main.md
  │     ├── design-system.md
  │     ├── architecture.md      ← este arquivo
  │     ├── competitors.md
  │     └── /specs
  │           ├── 001-feed-relatos.md
  │           ├── 002-auth.md
  │           ├── 003-rewards.md
  │           ├── 004-search.md
  │           ├── 005-integrations.md
  │           └── 006-notifications.md
  │
  ├── .gitignore
  └── README.md
```

---

## 3. Arquitetura do Backend

### Padrão de Camadas

O backend segue uma arquitetura em camadas clara e previsível:

**Route → Controller → Service → Model**

- **Route:** define o endpoint e aplica middlewares (autenticação, validação)
- **Controller:** recebe a requisição, chama o service e retorna a resposta
- **Service:** contém a lógica de negócio — é aqui que as regras dos specs vivem
- **Model:** acessa o banco de dados via queries SQL ou ORM

Essa separação garante que cada camada tenha uma única responsabilidade e facilita os testes unitários.

### Exemplo de Fluxo

```
POST /api/trips
  → middleware: verificar JWT (auth)
  → middleware: validar campos obrigatórios
  → TripController.create()
    → TripService.createTrip(data)
      → TripModel.insert(data)
        → retorna trip criada
      → RewardService.creditCoins(userId, amount)
    → response 201 com dados da trip
```

### REST API

- Prefixo base: `/api`
- Versionamento futuro: `/api/v1` (quando necessário)
- Formato de resposta padrão:

**Sucesso:**
```json
{
  "success": true,
  "data": { },
  "message": "Operação realizada com sucesso"
}
```

**Erro:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Descrição do erro"
  }
}
```

### WebSocket

Usado exclusivamente para notificações em tempo real (curtidas, comentários, novo seguidor, recompensas).

- Biblioteca: `socket.io`
- Conexão autenticada via JWT no handshake
- Cada usuário se conecta a uma sala privada identificada pelo seu `usuario_id`
- Eventos emitidos pelo servidor:

```
notification:new       → nova notificação (qualquer tipo)
notification:reward    → recompensa creditada
notification:social    → curtida, comentário ou novo seguidor
```

### Autenticação

- JWT (JSON Web Token) com expiração de 7 dias
- Refresh token com expiração de 30 dias armazenado em httpOnly cookie
- Middleware `authMiddleware` aplicado em todas as rotas protegidas
- OAuth2 via Google e Facebook usando `passport.js`

### Banco de Dados

- PostgreSQL com migrations versionadas em `/backend/migrations`
- ORM: Sequelize ou Knex.js (a definir com a equipe)
- Convenção de nomenclatura: snake_case para tabelas e colunas
- Toda tabela tem os campos: `id` (UUID), `criado_em` (timestamp), `atualizado_em` (timestamp)

### Jobs Agendados

- Biblioteca: `node-cron`
- Localização: `/backend/src/jobs`
- Jobs previstos:
  - Verificação diária de cupons expirando em 3 dias
  - Recálculo de destinos em alta (semanal)

---

## 4. Arquitetura do Frontend

### Organização de Páginas

Cada página tem sua própria pasta dentro de `/pages` com os arquivos relacionados:

```
/pages
  /Feed
    index.jsx          ← componente da página
    Feed.module.css    ← estilos específicos (opcional)
  /TripDetail
    index.jsx
  /Explore
    index.jsx
  /Auth
    /Login
      index.jsx
    /Register
      index.jsx
  /Profile
    index.jsx
  /Wallet
    index.jsx
```

### Gerenciamento de Estado

- Estado local (componente): `useState` e `useReducer`
- Estado global: Context API para autenticação e notificações
- Cache de dados do servidor: React Query (`@tanstack/react-query`)
  - Gerencia loading, erro e cache das chamadas à API automaticamente

### Chamadas à API

- Todas as chamadas ficam em `/services` — nenhuma chamada de API direto nos componentes
- Biblioteca: `axios` com interceptor para injetar o JWT automaticamente
- Exemplo de organização:

```
/services
  api.js             ← instância do axios com baseURL e interceptors
  tripsService.js    ← funções de chamada para /api/trips
  authService.js     ← funções de chamada para /api/auth
  offersService.js   ← funções de chamada para /api/offers
```

### Roteamento

- Biblioteca: React Router v6
- Rotas protegidas: componente `PrivateRoute` que verifica autenticação
- Rotas públicas: feed (somente leitura), explore, página de destino, login, cadastro

### PWA

- `manifest.json` com nome, ícones e cores do app
- Service Worker para push notifications (Web Push API)
- Estratégia de cache: Network First para dados dinâmicos, Cache First para assets estáticos

---

## 5. Padrões de Código

### Nomenclatura

**Arquivos e pastas:**
- Componentes React: PascalCase — `TripCard.jsx`
- Hooks: camelCase com prefixo "use" — `useAuth.js`
- Services: camelCase com sufixo "Service" — `tripsService.js`
- Utilitários: camelCase — `formatCurrency.js`
- Pastas: PascalCase para componentes/páginas, camelCase para o resto

**Variáveis e funções:**
- JavaScript: camelCase — `totalCost`, `getUserById`
- Constantes: UPPER_SNAKE_CASE — `MAX_PHOTOS`, `JWT_SECRET`
- Componentes React: PascalCase — `TripCard`, `FeedPage`

**Banco de dados:**
- Tabelas: snake_case plural — `trips`, `tourist_spots`, `rewards`
- Colunas: snake_case — `usuario_id`, `criado_em`, `custo_total`

### Commits

Seguir o padrão **Conventional Commits:**

```
feat: adiciona feed de relatos de viagem
fix: corrige cálculo de taxa do parceiro
docs: atualiza spec de autenticação
style: ajusta padding dos cards no mobile
refactor: extrai lógica de recompensas para service
test: adiciona testes do endpoint de criação de relato
chore: configura eslint e prettier
```

### Branches

```
main          ← produção, sempre estável
develop       ← integração, base para novas features
feature/xxx   ← nova funcionalidade (ex: feature/feed-relatos)
fix/xxx       ← correção de bug (ex: fix/calculo-taxa)
docs/xxx      ← documentação (ex: docs/atualiza-spec-auth)
```

- Nunca commitar direto na `main` ou `develop`
- Abrir Pull Request para `develop` ao finalizar uma feature
- Pull Request de `develop` para `main` somente quando pronto para produção

### Variáveis de Ambiente

Nunca commitar arquivos `.env` — usar `.env.example` como referência.

**Frontend `.env.example`:**
```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_SOCKET_URL=http://localhost:3001
REACT_APP_GOOGLE_CLIENT_ID=
```

**Backend `.env.example`:**
```
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/aimtravel
JWT_SECRET=
JWT_REFRESH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
SENDGRID_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
CLOUDINARY_URL=
```

---

## 6. Fluxo de Desenvolvimento

O fluxo recomendado para implementar cada funcionalidade seguindo os specs:

**1.** Ler o spec da funcionalidade em `/docs/specs/`
**2.** Criar branch: `git checkout -b feature/nome-da-feature`
**3.** Criar a migration do banco (se necessário)
**4.** Implementar model → service → controller → route no backend
**5.** Testar os endpoints manualmente (Insomnia ou Postman)
**6.** Implementar os componentes e páginas no frontend
**7.** Integrar frontend com backend via service
**8.** Escrever testes das tasks listadas no spec
**9.** Abrir Pull Request para `develop` com descrição do que foi implementado

---

## 7. Decisões Técnicas Registradas

**Monorepo:** escolhido pela simplicidade para times pequenos e facilidade de compartilhar código entre frontend e backend.

**Ambiente local sem Docker:** escolhido para reduzir a curva de aprendizado inicial. Reavaliar quando o time crescer ou quando houver necessidade de ambiente de staging.

**WebSocket apenas para notificações:** REST API cobre todos os outros casos. WebSocket adiciona complexidade e foi limitado ao mínimo necessário.

**React Query para cache:** evita lógica manual de loading/error/cache nos componentes, tornando o código mais limpo e previsível.

**UUID como chave primária:** evita exposição de IDs sequenciais e facilita futura distribuição do banco de dados.

---

*Atualize este documento sempre que uma decisão arquitetural relevante for tomada pela equipe.*
