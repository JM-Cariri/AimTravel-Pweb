# 003 — Sistema de Recompensas

> Prioridade: 🟡 Média
> Versão: 0.1
> Última atualização: Maio/2026

---

## a. Objetivo

Incentivar os usuários a publicarem relatos de viagens e manterem engajamento na plataforma através de um sistema de recompensas composto por AimCoins (moeda interna) e cupons de desconto. As recompensas podem ser usadas para abater valores em pacotes e passagens dentro do app ou trocadas por cupons de parceiros. O sistema é gerenciado por uma carteira (wallet) dedicada, onde o usuário acompanha saldo, histórico e oportunidades de uso.

### Critérios de Sucesso
- Usuário recebe recompensa automaticamente ao publicar um relato aprovado
- Usuário consegue visualizar saldo, histórico e validade das recompensas na wallet
- Cupons gerais do app ficam disponíveis de forma permanente ou com prazo longo
- Cupons de parceiros respeitam o prazo definido pela parceria
- Recompensas de ranking são concedidas automaticamente ao atingir novo nível

---

## b. Design

### Telas Envolvidas

**1. Wallet (Carteira de Recompensas)**
- Saldo atual de AimCoins em destaque
- Seção de cupons disponíveis dividida em dois tipos:
  - Cupom Geral do AimTravel (slot único, sem acúmulo, prazo longo ou permanente)
  - Cupons de Parceiros (slots por parceiro, prazo definido pela parceria)
- Histórico de recompensas recebidas e usadas (data, motivo, valor)
- Botão "Ver onde usar" — redireciona para ofertas e pacotes disponíveis

**2. Card de Cupom**
- Nome do cupom e logo do parceiro (ou logo do AimTravel para cupons gerais)
- Valor do desconto (percentual ou valor fixo)
- Prazo de validade (ou "Sem validade" para cupons gerais permanentes)
- Botão "Usar agora"
- Status: disponível, utilizado ou expirado

**3. Notificação de Recompensa**
- Pop-up ou banner ao publicar relato: "Parabéns! Você ganhou X AimCoins"
- Notificação ao subir de ranking: "Você atingiu o nível Ouro! Confira seus novos benefícios"
- Alerta de cupom prestes a expirar: "Seu cupom expira em 3 dias — use agora!"

**4. Tela de Uso de Recompensa no Checkout**
- Campo para aplicar cupom (código ou seleção direto da wallet)
- Exibição do desconto aplicado antes de confirmar a compra
- Saldo de AimCoins disponível com opção de abater no valor total

---

## c. Plano

### Tipos de Recompensa

**AimCoins — Moeda Interna**
- Moeda virtual do app acumulável
- Usada para abater valores em pacotes e passagens dentro do AimTravel
- Não expira
- Exemplo: 100 AimCoins = R$ 10 de desconto (valor a definir com a equipe)

**Cupom Geral do AimTravel**
- Emitido diretamente pelo app como presente ao usuário
- Apenas um slot disponível por vez — não acumulativo (igual modelo Shopee)
- Prazo longo ou permanente (a definir: 180 dias ou sem validade)
- Quando um novo cupom geral é disponibilizado, substitui o anterior não utilizado
- Pode ser usado em qualquer compra dentro do app

**Cupom de Parceiro**
- Emitido por parceiros comerciais (hotéis, companhias aéreas, restaurantes)
- Prazo de validade definido pelo parceiro
- Pode ter restrições de uso (ex: válido apenas para voos da Latam ou hotéis Booking)
- Slots separados por parceiro na wallet

### O que Gera Recompensa

**Por publicar relatos:**
- Relato publicado e aprovado: X AimCoins (valor a definir)
- Quanto mais completo o relato (fotos, custos detalhados, pontos turísticos), maior o bônus

**Por nível de ranking (benefícios automáticos ao atingir novo ranking):**
- Bronze: acesso básico à plataforma
- Prata: cupom geral mensal do AimTravel
- Ouro: cupom geral maior + destaque no feed para os relatos
- Diamante: cupons exclusivos de parceiros + acesso antecipado a promoções

### Validade das Recompensas

**AimCoins:** não expiram

**Cupom Geral do AimTravel:**
- Prazo longo (sugestão: 180 dias) ou permanente — a definir com a equipe
- Não acumulativo: só um ativo por vez

**Cupom de Parceiro:**
- Prazo definido pelo parceiro no momento da emissão
- Alerta automático ao usuário quando faltarem 3 dias para expirar

### Fluxo Principal — Recebimento de Recompensa por Relato

```
Usuário publica relato
  → Sistema aprova o relato
    → Sistema calcula AimCoins com base na completude do relato
      → AimCoins creditados na wallet do usuário
        → Notificação exibida ao usuário
          → Histórico atualizado na wallet
```

### Fluxo Principal — Recebimento de Recompensa por Ranking

```
Usuário atinge novo nível de ranking
  → Sistema detecta mudança de ranking automaticamente
    → Benefício correspondente é creditado na wallet
      → Notificação enviada ao usuário
        → Badge de ranking atualizado no perfil
```

### Fluxo Principal — Uso de Recompensa no Checkout

```
Usuário seleciona um pacote ou passagem
  → Tela de checkout exibe opção de usar recompensas
    → Usuário seleciona cupom ou informa quantidade de AimCoins a abater
      → Sistema valida disponibilidade e prazo do cupom
        → Desconto aplicado no valor total
          → Usuário confirma a compra
            → Recompensa marcada como utilizada no histórico
```

### Regras de Negócio
- AimCoins não expiram e são acumulativos
- Apenas um cupom geral ativo por vez — novo cupom substitui o anterior não utilizado
- Cupons de parceiros têm prazo e restrições definidos pelo parceiro
- Recompensas de ranking são concedidas automaticamente pelo sistema ao atingir novo nível
- Usuário não pode transferir AimCoins ou cupons para outro usuário
- AimCoins e cupons não são convertíveis em dinheiro
- Relato precisa ser aprovado para gerar recompensa (evita spam)
- Sistema envia alerta quando cupom de parceiro estiver a 3 dias de expirar

### Integrações
- **Feed:** aprovação de relato aciona crédito de AimCoins (ver spec `001-feed-relatos.md`)
- **Auth/Ranking:** mudança de ranking aciona benefícios automáticos (ver spec `002-auth.md`)
- **Parceiros:** cupons de parceiros são emitidos via integração com APIs dos parceiros (ver spec `005-integrations.md`)
- **Notifications:** alertas de recompensa e expiração de cupom (ver spec `006-notifications.md`)

---

## d. Tasks

### Backend

- [ ] **T001** — Criar model `Reward` no PostgreSQL com campos: id, usuario_id, tipo (aimcoins | cupom_geral | cupom_parceiro), valor, motivo, expira_em, usado, parceiro_id, criado_em
- [ ] **T002** — Criar model `Wallet` com saldo atual de AimCoins por usuário
- [ ] **T003** — Criar endpoint `GET /api/wallet` para retornar saldo, cupons ativos e histórico do usuário autenticado
- [ ] **T004** — Criar endpoint `POST /api/wallet/use-coupon` para aplicar cupom no checkout
- [ ] **T005** — Criar endpoint `POST /api/wallet/use-coins` para abater AimCoins no checkout
- [ ] **T006** — Criar serviço de crédito automático de AimCoins ao aprovar relato
- [ ] **T007** — Criar serviço de concessão automática de benefícios ao atingir novo ranking
- [ ] **T008** — Criar job agendado para verificar cupons próximos de expirar e disparar alertas
- [ ] **T009** — Criar lógica de slot único para cupom geral (substituição ao receber novo cupom)
- [ ] **T010** — Criar endpoint `GET /api/wallet/history` para histórico detalhado de recompensas

### Frontend

- [ ] **T011** — Criar tela de Wallet com saldo de AimCoins, cupons ativos e histórico
- [ ] **T012** — Criar componente de card de cupom com status, validade e botão de uso
- [ ] **T013** — Criar separação visual entre cupom geral e cupons de parceiros na wallet
- [ ] **T014** — Criar pop-up/banner de notificação ao receber recompensa
- [ ] **T015** — Integrar seleção de recompensas na tela de checkout
- [ ] **T016** — Exibir saldo de AimCoins no perfil do usuário e na wallet
- [ ] **T017** — Criar tela de detalhes do cupom com restrições e instruções de uso

### Testes

- [ ] **T018** — Teste de crédito automático de AimCoins ao publicar relato aprovado
- [ ] **T019** — Teste de concessão de benefício ao atingir novo ranking
- [ ] **T020** — Teste de slot único do cupom geral (novo cupom substitui anterior)
- [ ] **T021** — Teste de aplicação de cupom no checkout com validação de prazo
- [ ] **T022** — Teste de alerta de expiração de cupom de parceiro
- [ ] **T023** — Teste de tentativa de uso de cupom já utilizado ou expirado
