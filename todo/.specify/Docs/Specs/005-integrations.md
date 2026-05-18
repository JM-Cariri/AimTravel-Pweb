# 005 — Integração com Parceiros

> Prioridade: 🟡 Média
> Versão: 0.1
> Última atualização: Maio/2026

---

## a. Objetivo

Integrar companhias aéreas, hotéis, restaurantes e agências de turismo ao AimTravel, permitindo que usuários comprem pacotes e passagens diretamente no app via checkout integrado. Parceiros gerenciam suas próprias ofertas através de um painel dedicado, e a equipe do AimTravel também pode lançar ofertas diretas. O AimTravel retém um percentual fixo sobre cada venda realizada pela plataforma.

### Critérios de Sucesso
- Parceiro consegue cadastrar e gerenciar ofertas pelo painel em menos de 5 minutos
- Usuário finaliza uma compra sem sair do app
- Taxa do AimTravel é calculada e registrada automaticamente em cada venda
- Ofertas aparecem corretamente relacionadas aos destinos nos relatos e na busca
- Equipe AimTravel consegue lançar ofertas próprias pelo painel administrativo

---

## b. Design

### Telas Envolvidas — Usuário

**1. Card de Oferta (exibido no feed, relatos e busca)**
- Logo e nome do parceiro
- Título da oferta
- Destino
- Preço em destaque
- Tipo (passagem | hospedagem | restaurante | pacote completo)
- Validade da oferta
- Botão "Ver oferta"

**2. Página da Oferta**
- Foto do destino ou produto
- Detalhes completos da oferta (itinerário, diárias, refeições inclusas, etc.)
- Preço total com breakdown (valor base + taxas)
- Avaliações de outros usuários que compraram
- Botão "Comprar agora"
- Bloco de uso de recompensas (AimCoins e cupons aplicáveis)

**3. Checkout Integrado**
- Resumo do pedido
- Dados do viajante (nome, CPF, e-mail, telefone)
- Dados de pagamento (cartão de crédito, PIX)
- Aplicação de AimCoins ou cupons de desconto
- Resumo de valores: subtotal, desconto, taxa e total
- Botão "Confirmar compra"
- Tela de confirmação com código do pedido e próximos passos

**4. Histórico de Compras do Usuário**
- Lista de pedidos realizados com status (confirmado | em andamento | concluído | cancelado)
- Detalhes de cada compra
- Botão de suporte para cada pedido

### Telas Envolvidas — Painel do Parceiro

**1. Dashboard do Parceiro**
- Resumo de vendas do período (quantidade e valor total)
- Valor retido pelo AimTravel (taxa percentual)
- Valor líquido a receber
- Gráfico de vendas por oferta
- Ofertas ativas e encerradas

**2. Cadastro e Gestão de Ofertas**
- Campo: título da oferta
- Campo: tipo (passagem | hospedagem | restaurante | pacote)
- Campo: destino
- Campo: descrição detalhada
- Campo: preço base
- Campo: validade da oferta
- Upload de fotos
- Toggle: ativar/desativar oferta
- Visualização da taxa do AimTravel sobre o preço cadastrado

**3. Histórico de Vendas do Parceiro**
- Lista de vendas com data, valor bruto, taxa AimTravel e valor líquido
- Exportação de relatório (CSV)

### Telas Envolvidas — Painel Administrativo AimTravel

**1. Gestão de Parceiros**
- Lista de parceiros cadastrados com status (ativo | inativo | pendente aprovação)
- Aprovação de novos parceiros
- Configuração da taxa percentual por parceiro (padrão ou personalizada)

**2. Lançamento de Ofertas Próprias**
- Mesmo formulário do painel do parceiro
- Identificadas como "Oferta AimTravel" para o usuário

**3. Relatório Financeiro**
- Total arrecadado em taxas por período
- Vendas por parceiro e por categoria

---

## c. Plano

### Modelo de Negócio

O AimTravel retém um percentual fixo sobre cada venda realizada na plataforma:

- Percentual padrão: a definir com a equipe (sugestão: 10%)
- Percentual pode ser personalizado por parceiro no painel administrativo
- Cálculo automático: o sistema aplica a taxa no momento da compra e registra os valores bruto, taxa e líquido

Exemplo com taxa de 10%:
- Preço da oferta: R$ 500,00
- Taxa AimTravel (10%): R$ 50,00
- Valor líquido ao parceiro: R$ 450,00

### Tipos de Parceiros no MVP

**Companhias Aéreas**
- Ofertas de passagens (ida, volta ou pacote)
- Campos específicos: origem, destino, data, classe, companhia

**Hotéis**
- Ofertas de hospedagem por diária
- Campos específicos: nome do hotel, número de diárias, tipo de quarto, café incluso

**Restaurantes**
- Ofertas de experiências gastronômicas (jantar especial, menu degustação, etc.)
- Campos específicos: nome do restaurante, tipo de culinária, número de pessoas

**Agências de Turismo**
- Pacotes completos combinando transporte + hospedagem + passeios
- Campos específicos: destino, duração, itinerário, o que está incluso

### Fluxo Principal — Compra pelo Usuário

```
Usuário visualiza oferta no feed, relato ou busca
  → Clica em "Ver oferta"
    → Página da oferta exibe detalhes completos
      → Usuário clica em "Comprar agora"
        → Checkout exibe resumo e campos de pagamento
          → Usuário aplica AimCoins ou cupom (opcional)
            → Usuário insere dados de pagamento
              → Sistema processa pagamento
                → Taxa AimTravel calculada e registrada automaticamente
                  → Parceiro notificado da venda
                    → Usuário recebe confirmação com código do pedido
```

### Fluxo Principal — Cadastro de Oferta pelo Parceiro

```
Parceiro acessa o painel
  → Clica em "Nova oferta"
    → Preenche formulário com detalhes e preço
      → Sistema exibe preview com taxa AimTravel aplicada
        → Parceiro confirma e publica a oferta
          → Oferta entra em revisão pela equipe AimTravel (opcional)
            → Oferta aprovada e publicada na plataforma
```

### Fluxo Principal — Oferta Própria da Equipe AimTravel

```
Equipe AimTravel acessa o painel administrativo
  → Acessa "Lançar oferta própria"
    → Preenche formulário igual ao do parceiro
      → Oferta identificada como "Oferta AimTravel"
        → Publicada diretamente sem revisão
```

### Regras de Negócio
- Parceiro precisa ser aprovado pela equipe AimTravel antes de publicar ofertas
- Taxa percentual é calculada sobre o valor bruto da venda
- Oferta só aparece para usuários se estiver ativa e dentro do prazo de validade
- Parceiro pode desativar uma oferta a qualquer momento
- Compras canceladas dentro de 24h são estornadas integralmente (política padrão — a definir)
- AimCoins e cupons são descontados antes do cálculo da taxa do AimTravel
- Cada venda gera um registro financeiro com valor bruto, taxa e valor líquido
- Parceiro visualiza apenas suas próprias vendas — nunca dados de outros parceiros

### Integrações
- **Feed:** ofertas relacionadas ao destino do relato (ver spec `001-feed-relatos.md`)
- **Busca:** parceiros e ofertas aparecem nos resultados (ver spec `004-search.md`)
- **Rewards:** AimCoins e cupons aplicados no checkout (ver spec `003-rewards.md`)
- **Notifications:** confirmação de compra e notificação ao parceiro (ver spec `006-notifications.md`)

---

## d. Tasks

### Backend

- [ ] **T001** — Criar model `Partner` no PostgreSQL com campos: id, nome, tipo, email, logo, taxa_percentual, status (pendente | ativo | inativo), criado_em
- [ ] **T002** — Criar model `Offer` com campos: id, parceiro_id, titulo, tipo, destino, descricao, preco, validade, fotos[], ativo, criado_em
- [ ] **T003** — Criar model `Order` com campos: id, usuario_id, oferta_id, valor_bruto, taxa_aimtravel, valor_liquido, status, dados_pagamento, criado_em
- [ ] **T004** — Criar endpoint `POST /api/partners` para cadastro de novo parceiro
- [ ] **T005** — Criar endpoint `GET /api/partners/:id/offers` para listar ofertas do parceiro
- [ ] **T006** — Criar endpoint `POST /api/offers` para cadastro de oferta pelo parceiro ou equipe AimTravel
- [ ] **T007** — Criar endpoint `PUT /api/offers/:id` para editar ou ativar/desativar oferta
- [ ] **T008** — Criar endpoint `GET /api/offers?destination=&type=` para buscar ofertas por destino e tipo
- [ ] **T009** — Criar endpoint `POST /api/orders` para processar compra com cálculo automático da taxa
- [ ] **T010** — Criar endpoint `GET /api/orders` para histórico de compras do usuário
- [ ] **T011** — Criar endpoint `GET /api/partners/:id/orders` para histórico de vendas do parceiro
- [ ] **T012** — Integrar gateway de pagamento (sugestão: Stripe ou Mercado Pago) para cartão e PIX
- [ ] **T013** — Criar lógica de cálculo automático de taxa AimTravel por venda
- [ ] **T014** — Criar endpoint `GET /api/admin/partners` para gestão de parceiros no painel admin
- [ ] **T015** — Criar endpoint `PATCH /api/admin/partners/:id/approve` para aprovar parceiro
- [ ] **T016** — Criar endpoint `GET /api/admin/financials` para relatório financeiro da equipe AimTravel

### Frontend — App do Usuário

- [ ] **T017** — Criar componente de card de oferta para exibição no feed, relatos e busca
- [ ] **T018** — Criar página de detalhes da oferta
- [ ] **T019** — Criar fluxo de checkout integrado com dados do viajante e pagamento
- [ ] **T020** — Integrar aplicação de AimCoins e cupons no checkout
- [ ] **T021** — Criar tela de confirmação de compra com código do pedido
- [ ] **T022** — Criar tela de histórico de compras do usuário

### Frontend — Painel do Parceiro

- [ ] **T023** — Criar dashboard do parceiro com resumo de vendas e taxa
- [ ] **T024** — Criar formulário de cadastro e edição de ofertas com preview da taxa
- [ ] **T025** — Criar tela de histórico de vendas com exportação CSV

### Frontend — Painel Administrativo AimTravel

- [ ] **T026** — Criar tela de gestão e aprovação de parceiros
- [ ] **T027** — Criar formulário de lançamento de ofertas próprias da equipe AimTravel
- [ ] **T028** — Criar tela de relatório financeiro por período e por parceiro

### Testes

- [ ] **T029** — Teste de fluxo completo de compra com cálculo correto da taxa
- [ ] **T030** — Teste de aplicação de AimCoins e cupons no checkout
- [ ] **T031** — Teste de cadastro e publicação de oferta pelo parceiro
- [ ] **T032** — Teste de aprovação de parceiro pelo painel administrativo
- [ ] **T033** — Teste de cancelamento e estorno de compra
- [ ] **T034** — Teste de exibição de ofertas relacionadas ao destino no relato
- [ ] **T035** — Teste de segurança: parceiro não acessa dados de outro parceiro
