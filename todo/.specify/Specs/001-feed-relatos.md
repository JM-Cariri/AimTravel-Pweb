# 001 — Feed de Relatos de Viagem

> Prioridade: 🔴 Alta  
> Versão: 0.1  
> Última atualização: Maio/2026

---

## a. Objetivo

Permitir que usuários publiquem relatos detalhados de suas viagens — incluindo custos reais, pontos turísticos visitados e fotos — e que outros usuários possam descobrir, se inspirar e interagir com esses relatos. Este é o core do produto: o feed é a principal razão pela qual o usuário acessa e retorna ao AimTravel.

### Critérios de Sucesso
- Usuário consegue criar e publicar um relato em menos de 5 minutos
- Feed carrega em menos de 2 segundos
- Relatos exibem claramente o custo total da viagem
- Usuário consegue filtrar relatos por destino, tipo de viagem e orçamento

---

## b. Design

### Telas Envolvidas

**1. Feed Principal**
- Lista de cards de relatos ordenados por relevância (padrão) ou mais recentes
- Cada card exibe: foto de capa, destino, tipo de viagem, custo total, nome do autor e número de curtidas
- Barra de filtros no topo: destino, tipo (aérea/terrestre/marítima), faixa de orçamento
- Botão flutuante "+" para criar novo relato (visível apenas para usuários logados)

**2. Página do Relato**
- Foto(s) da viagem em destaque (carrossel)
- Título e descrição da viagem
- Bloco de custos detalhados:
  - Transporte
  - Hospedagem
  - Alimentação
  - Passeios
  - Total gasto
- Lista de pontos turísticos visitados (com nome e cidade)
- Data de realização e duração da viagem
- Tipo de viagem (aérea, terrestre, marítima)
- Seção de comentários
- Botão de curtir
- Bloco de ofertas relacionadas ao destino (parceiros integrados)

**3. Formulário de Criação de Relato**
- Campo: título da viagem
- Campo: destino (cidade + país)
- Campo: tipo de viagem (select)
- Campo: data de início e fim
- Campo: descrição (texto longo)
- Bloco de custos (campos numéricos por categoria)
- Campo: pontos turísticos (adicionar múltiplos)
- Upload de fotos (mínimo 1, máximo 10)
- Botão: salvar rascunho / publicar

### Referências Visuais
- Cards de relato: estilo Pinterest (foto em destaque com informações sobrepostas)
- Formulário: estilo clean, passo a passo (wizard de 3 etapas)
- Paleta: seguir identidade visual definida em `main.md`

---

## c. Plano

### Fluxo Principal — Criação de Relato

```
Usuário logado
  → Clica no botão "+"
    → Preenche Etapa 1: Informações básicas (destino, tipo, datas)
      → Preenche Etapa 2: Custos e pontos turísticos
        → Preenche Etapa 3: Fotos e descrição
          → Clica em "Publicar"
            → Sistema valida os campos obrigatórios
              → Relato salvo com status "publicado"
                → Usuário redirecionado para a página do relato
                  → Sistema contabiliza recompensa para o usuário
```

### Fluxo Principal — Visualização do Feed

```
Usuário acessa o AimTravel
  → Feed carrega os relatos mais relevantes
    → Usuário aplica filtros (opcional)
      → Usuário clica em um card
        → Página do relato abre
          → Usuário vê custos, pontos turísticos e fotos
            → Usuário vê ofertas de parceiros relacionadas
              → Usuário curte, comenta ou clica na oferta
```

### Regras de Negócio
- Relato só pode ser publicado por usuário autenticado
- Campos obrigatórios: destino, tipo de viagem, pelo menos 1 foto, custo total
- Custo total deve ser maior que zero
- Relato publicado gera recompensa ao autor (ver spec `003-rewards.md`)
- Moderação: relatos com conteúdo inapropriado podem ser removidos (a definir: automática ou manual)
- Usuário pode editar o próprio relato após publicação
- Usuário pode salvar relato como rascunho antes de publicar

### Integrações
- **Parceiros:** ao exibir a página de um relato, o sistema busca ofertas relacionadas ao destino na API de parceiros (ver spec `005-integrations.md`)
- **Rewards:** ao publicar um relato aprovado, o sistema aciona o módulo de recompensas (ver spec `003-rewards.md`)

---

## d. Tasks

### Backend

- [ ] **T001** — Criar model `Trip` no banco de dados PostgreSQL com todos os campos definidos em `main.md`
- [ ] **T002** — Criar endpoint `POST /api/trips` para criação de relato (autenticado)
- [ ] **T003** — Criar endpoint `GET /api/trips` para listagem do feed com paginação (cursor-based)
- [ ] **T004** — Criar endpoint `GET /api/trips/:id` para buscar relato por ID
- [ ] **T005** — Criar endpoint `PUT /api/trips/:id` para edição de relato (apenas autor)
- [ ] **T006** — Criar endpoint `DELETE /api/trips/:id` para remoção de relato (apenas autor)
- [ ] **T007** — Criar endpoint `POST /api/trips/:id/like` para curtir/descurtir relato
- [ ] **T008** — Implementar upload de fotos para S3/Cloudinary com validação de tipo e tamanho
- [ ] **T009** — Implementar filtros no endpoint de listagem (destino, tipo, faixa de orçamento)
- [ ] **T010** — Criar model `TouristSpot` e relacionamento com `Trip`

### Frontend

- [ ] **T011** — Criar componente `TripCard` para exibição no feed
- [ ] **T012** — Criar página `FeedPage` com listagem de cards e filtros
- [ ] **T013** — Criar página `TripDetailPage` com todos os dados do relato
- [ ] **T014** — Criar componente `CostBreakdown` para exibição detalhada dos custos
- [ ] **T015** — Criar formulário wizard de criação de relato (3 etapas)
- [ ] **T016** — Implementar upload de fotos com preview no formulário
- [ ] **T017** — Implementar infinite scroll ou paginação no feed
- [ ] **T018** — Criar componente de filtros do feed
- [ ] **T019** — Integrar bloco de ofertas de parceiros na página do relato

### Testes

- [ ] **T020** — Testes unitários nos endpoints de criação e listagem
- [ ] **T021** — Teste de fluxo completo: criar relato → visualizar no feed → curtir
- [ ] **T022** — Teste de validação dos campos obrigatórios no formulário
- [ ] **T023** — Teste de performance do feed (tempo de carregamento < 2s)
