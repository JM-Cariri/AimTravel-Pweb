# 004 — Busca e Descoberta de Destinos

> Prioridade: 🟡 Média
> Versão: 0.1
> Última atualização: Maio/2026

---

## a. Objetivo

Permitir que usuários encontrem destinos, relatos, parceiros e outros viajantes de forma rápida e intuitiva. Além da busca tradicional, o app contará com uma tela de descoberta (Explore) com destinos em alta e sugestões personalizadas, incentivando o usuário a se inspirar mesmo sem saber exatamente o que procura.

### Critérios de Sucesso
- Resultados de busca aparecem em menos de 1 segundo
- Busca retorna resultados relevantes para destinos, relatos, parceiros e usuários
- Tela Explore exibe destinos em alta e sugestões baseadas no histórico do usuário
- Usuário consegue salvar buscas recentes e favoritar destinos
- Filtros de tipo de viagem e faixa de orçamento funcionam corretamente em conjunto

---

## b. Design

### Telas Envolvidas

**1. Barra de Busca Global**
- Acessível no topo do feed e da tela Explore
- Campo de texto com ícone de lupa
- Ao clicar: exibe buscas recentes e destinos favoritados antes de digitar
- Ao digitar: exibe sugestões em tempo real separadas por categoria (destinos, relatos, parceiros, usuários)

**2. Tela de Resultados da Busca**
- Abas para filtrar por categoria: Tudo, Destinos, Relatos, Parceiros, Usuários
- Filtros no topo: tipo de viagem (aérea | terrestre | marítima) e faixa de orçamento (slider)
- Cards de resultado adaptados por categoria:
  - Destino: foto, nome, cidade/país, número de relatos
  - Relato: foto de capa, título, destino, custo total, autor
  - Parceiro: logo, nome, tipo (hotel | aérea | restaurante | agência)
  - Usuário: avatar, nome, nível de viajante, número de relatos
- Mensagem amigável quando não há resultados: "Nenhum resultado encontrado — que tal explorar destinos em alta?"

**3. Tela Explore (Descoberta)**
- Seção: Destinos em Alta — baseado nos relatos mais recentes e curtidos
- Seção: Sugestões para Você — baseado no histórico de buscas e relatos visualizados
- Seção: Relatos Recentes — últimos relatos publicados na plataforma
- Seção: Parceiros em Destaque — ofertas e promoções ativas de parceiros
- Layout visual com cards grandes e fotos em destaque

**4. Página de Destino**
- Foto de capa do destino
- Nome, cidade e país
- Resumo gerado a partir dos relatos (média de custo, tipos de viagem mais usados)
- Lista de relatos sobre aquele destino
- Ofertas de parceiros relacionadas ao destino
- Botão: "Favoritar destino"

**5. Buscas Recentes e Favoritos**
- Acessível ao clicar na barra de busca antes de digitar
- Seção: Buscas recentes (últimas 10, com botão de limpar)
- Seção: Destinos favoritados (com botão de remover favorito)

---

## c. Plano

### Fluxo Principal — Busca

```
Usuário clica na barra de busca
  → Exibe buscas recentes e destinos favoritados
    → Usuário digita termo
      → Sugestões aparecem em tempo real por categoria
        → Usuário seleciona sugestão ou pressiona buscar
          → Tela de resultados exibe resultados por categoria
            → Usuário aplica filtros (opcional)
              → Usuário clica em um resultado
                → Abre página do destino, relato, parceiro ou perfil do usuário
```

### Fluxo Principal — Explore

```
Usuário acessa a tela Explore
  → Exibe destinos em alta, sugestões personalizadas e relatos recentes
    → Usuário clica em um destino em alta
      → Abre página do destino com relatos e ofertas relacionadas
        → Usuário favorita o destino (opcional)
          → Destino salvo na seção de favoritos
```

### Fluxo Principal — Favoritar Destino

```
Usuário acessa página de um destino
  → Clica em "Favoritar destino"
    → Destino salvo na wallet de favoritos do usuário
      → Ícone de coração preenchido confirma o favoritamento
        → Destino aparece na seção de favoritos da busca
```

### Lógica de Sugestões Personalizadas
- Baseada no histórico de destinos visualizados e buscados pelo usuário
- Baseada no tipo de viagem mais presente nos relatos curtidos pelo usuário
- Destinos em alta: calculados com base no número de relatos publicados nos últimos 7 dias
- Para usuários novos sem histórico: exibe os destinos mais populares da plataforma

### Regras de Negócio
- Busca recentes salva as últimas 10 pesquisas do usuário
- Usuário pode limpar o histórico de buscas recentes
- Destinos favoritados não têm limite de quantidade
- Busca retorna apenas relatos com status "publicado" e "aprovado"
- Parceiros exibidos na busca devem estar ativos na plataforma
- Filtros de tipo de viagem e faixa de orçamento podem ser combinados
- Busca por usuário retorna apenas perfis públicos

### Integrações
- **Feed:** relatos buscados redirecionam para a página do relato (ver spec `001-feed-relatos.md`)
- **Auth:** busca por usuários exibe perfil público (ver spec `002-auth.md`)
- **Parceiros:** resultados de parceiros e ofertas relacionadas ao destino (ver spec `005-integrations.md`)

---

## d. Tasks

### Backend

- [ ] **T001** — Criar endpoint `GET /api/search?q=&type=&trip_type=&budget_min=&budget_max=` para busca global com filtros
- [ ] **T002** — Implementar busca full-text no PostgreSQL para destinos, relatos, parceiros e usuários
- [ ] **T003** — Criar endpoint `GET /api/explore/trending` para destinos em alta (últimos 7 dias)
- [ ] **T004** — Criar endpoint `GET /api/explore/suggestions` para sugestões personalizadas por usuário
- [ ] **T005** — Criar endpoint `GET /api/explore/recent` para relatos recentes
- [ ] **T006** — Criar endpoint `POST /api/favorites` para favoritar destino
- [ ] **T007** — Criar endpoint `DELETE /api/favorites/:id` para remover destino dos favoritos
- [ ] **T008** — Criar endpoint `GET /api/favorites` para listar destinos favoritados do usuário
- [ ] **T009** — Criar endpoint `GET /api/search/recent` para retornar buscas recentes do usuário
- [ ] **T010** — Criar endpoint `DELETE /api/search/recent` para limpar histórico de buscas
- [ ] **T011** — Criar lógica de cálculo de destinos em alta baseada em relatos dos últimos 7 dias
- [ ] **T012** — Criar lógica de sugestões personalizadas baseada no histórico do usuário

### Frontend

- [ ] **T013** — Criar componente de barra de busca global com sugestões em tempo real
- [ ] **T014** — Criar tela de resultados com abas por categoria e filtros
- [ ] **T015** — Criar componente de card adaptado por categoria de resultado (destino, relato, parceiro, usuário)
- [ ] **T016** — Criar tela Explore com seções de destinos em alta, sugestões e relatos recentes
- [ ] **T017** — Criar página de destino com relatos e ofertas relacionadas
- [ ] **T018** — Criar seção de buscas recentes e favoritos ao abrir a barra de busca
- [ ] **T019** — Implementar botão de favoritar destino com feedback visual (ícone de coração)
- [ ] **T020** — Implementar slider de faixa de orçamento nos filtros da busca
- [ ] **T021** — Criar mensagem de estado vazio amigável quando não houver resultados

### Testes

- [ ] **T022** — Teste de busca retornando resultados corretos por categoria
- [ ] **T023** — Teste de filtros combinados (tipo de viagem + faixa de orçamento)
- [ ] **T024** — Teste de sugestões em tempo real ao digitar
- [ ] **T025** — Teste de salvar e limpar buscas recentes
- [ ] **T026** — Teste de favoritar e desfavoritar destino
- [ ] **T027** — Teste de performance da busca (resultado em menos de 1 segundo)
- [ ] **T028** — Teste da lógica de destinos em alta com relatos dos últimos 7 dias