# 006 — Notificações e Alertas

> Prioridade: 🟢 Baixa
> Versão: 0.1
> Última atualização: Maio/2026

---

## a. Objetivo

Manter o usuário informado e engajado através de notificações por push (navegador) e e-mail. As notificações são divididas em obrigatórias — relacionadas a compras e segurança, que não podem ser desativadas — e opcionais, que o usuário configura conforme sua preferência. O sistema cobre eventos sociais, recompensas, ofertas de parceiros e atualizações de pedidos.

### Critérios de Sucesso
- Notificações obrigatórias são entregues em todos os casos sem exceção
- Usuário consegue configurar preferências de notificação em menos de 1 minuto
- Push notifications funcionam corretamente no navegador (PWA)
- E-mails são entregues em menos de 2 minutos após o evento
- Notificações de cupom expirado são enviadas com 3 dias de antecedência

---

## b. Design

### Telas Envolvidas

**1. Central de Notificações (sino no topo do app)**
- Lista de notificações recentes em ordem cronológica
- Indicador de não lidas (badge com número)
- Ícone e texto descritivo por tipo de notificação
- Ao clicar: redireciona para o conteúdo relacionado (relato, oferta, perfil, etc.)
- Botão "Marcar todas como lidas"

**2. Configurações de Notificação**
- Acessível em Configurações do perfil
- Seção: Notificações Obrigatórias (exibidas como ativas e bloqueadas para edição)
  - Confirmação de compra
  - Atualização de status do pedido
  - Alertas de segurança (novo login, alteração de senha, 2FA)
- Seção: Notificações Opcionais (toggle individual para push e e-mail)
  - Novos seguidores
  - Curtidas nos relatos
  - Comentários nos relatos
  - Novo relato de alguém que você segue
  - Recompensa recebida
  - Cupom prestes a expirar
  - Promoções e ofertas de parceiros
  - Você subiu de ranking
  - Seu relato foi aprovado

**3. E-mails Transacionais**
- Layout com identidade visual do AimTravel
- Cabeçalho com logo e nome do usuário
- Conteúdo claro e objetivo
- Botão de ação (CTA) quando aplicável
- Link de cancelamento de inscrição no rodapé (apenas para e-mails opcionais)

---

## c. Plano

### Categorias de Notificação

**Obrigatórias — não podem ser desativadas:**

- Confirmação de compra: enviada imediatamente após pagamento confirmado, por push e e-mail
- Atualização de status do pedido: enviada a cada mudança de status (confirmado | em andamento | concluído | cancelado), por push e e-mail
- Alerta de novo login: enviado por e-mail quando login é detectado em dispositivo novo
- Alerta de alteração de senha: enviado por e-mail ao trocar a senha
- Código de verificação (cadastro, 2FA, recuperação): enviado por e-mail e/ou SMS

**Opcionais — configuráveis pelo usuário (push e/ou e-mail separadamente):**

- Novo seguidor: alguém começou a seguir o perfil do usuário
- Curtida no relato: alguém curtiu um relato publicado pelo usuário
- Comentário no relato: alguém comentou em um relato publicado pelo usuário
- Novo relato de seguido: alguém que o usuário segue publicou um novo relato
- Recompensa recebida: AimCoins creditados ou cupom disponível na wallet
- Cupom prestes a expirar: alerta 3 dias antes do vencimento de cupom de parceiro
- Promoções e ofertas: novas ofertas de parceiros relacionadas a destinos de interesse
- Subiu de ranking: usuário atingiu novo nível de ranking (Bronze → Prata → Ouro → Diamante)
- Relato aprovado: relato publicado foi aprovado pela moderação

### Canais de Entrega

**Push Notification (navegador — PWA)**
- Usando Web Push API com service worker
- Requer permissão explícita do usuário no navegador
- Ideal para notificações em tempo real (curtidas, comentários, novo seguidor)
- Exibido mesmo com o app fechado, desde que o navegador esteja aberto

**E-mail**
- Usando serviço de envio transacional (sugestão: SendGrid ou Resend)
- Ideal para notificações importantes e resumos (compras, segurança, cupons)
- E-mails opcionais têm link de cancelamento no rodapé
- E-mails obrigatórios não têm opção de cancelamento

### Fluxo Principal — Envio de Notificação

```
Evento ocorre no sistema (ex: usuário recebe curtida)
  → Sistema verifica preferências de notificação do usuário
    → Se push ativo: envia push notification via Web Push API
    → Se e-mail ativo: envia e-mail via serviço transacional
    → Notificação registrada na central de notificações do app
      → Usuário clica na notificação
        → Redirecionado para o conteúdo relacionado
```

### Fluxo Principal — Configuração de Preferências

```
Usuário acessa Configurações → Notificações
  → Visualiza notificações obrigatórias (bloqueadas)
    → Para cada notificação opcional:
      → Toggle de push (ativar/desativar)
      → Toggle de e-mail (ativar/desativar)
        → Preferências salvas automaticamente
```

### Fluxo Principal — Alerta de Cupom Expirando

```
Job agendado roda diariamente
  → Verifica cupons de parceiros com vencimento em 3 dias
    → Para cada cupom encontrado:
      → Envia push e/ou e-mail conforme preferência do usuário
        → Notificação registrada na central
          → Usuário clica e é redirecionado para a wallet
```

### Regras de Negócio
- Notificações obrigatórias são sempre enviadas por push e e-mail, independente das preferências
- Usuário pode desativar push e e-mail separadamente para cada notificação opcional
- Se usuário não concedeu permissão de push no navegador, apenas e-mail é enviado para notificações opcionais
- Notificações sociais (curtidas, comentários) são agrupadas quando há muitas em sequência — ex: "João e mais 5 pessoas curtiram seu relato"
- Central de notificações armazena as últimas 100 notificações por usuário
- Notificações lidas são marcadas automaticamente ao abrir o conteúdo relacionado
- E-mails de promoções e ofertas têm frequência máxima de 1 por dia para não gerar spam

### Integrações
- **Auth:** alertas de segurança (novo login, alteração de senha, 2FA) (ver spec `002-auth.md`)
- **Feed:** notificações de curtidas, comentários e novo relato de seguido (ver spec `001-feed-relatos.md`)
- **Rewards:** notificações de recompensa recebida e cupom expirando (ver spec `003-rewards.md`)
- **Parceiros:** notificações de compra e atualização de pedido (ver spec `005-integrations.md`)

---

## d. Tasks

### Backend

- [ ] **T001** — Criar model `Notification` no PostgreSQL com campos: id, usuario_id, tipo, titulo, mensagem, lida, url_destino, criado_em
- [ ] **T002** — Criar model `NotificationPreference` com preferências de push e e-mail por tipo de notificação por usuário
- [ ] **T003** — Criar endpoint `GET /api/notifications` para listar notificações do usuário autenticado
- [ ] **T004** — Criar endpoint `PATCH /api/notifications/read-all` para marcar todas como lidas
- [ ] **T005** — Criar endpoint `GET /api/notifications/preferences` para buscar preferências do usuário
- [ ] **T006** — Criar endpoint `PUT /api/notifications/preferences` para salvar preferências
- [ ] **T007** — Criar serviço de envio de push notification via Web Push API com service worker
- [ ] **T008** — Criar serviço de envio de e-mail transacional (SendGrid ou Resend)
- [ ] **T009** — Criar serviço central de disparo de notificações que verifica preferências antes de enviar
- [ ] **T010** — Criar job agendado diário para verificar cupons expirando em 3 dias e disparar alertas
- [ ] **T011** — Implementar agrupamento de notificações sociais em sequência (ex: "X e mais N pessoas curtiram")
- [ ] **T012** — Criar templates de e-mail para cada tipo de notificação com identidade visual do AimTravel

### Frontend

- [ ] **T013** — Criar central de notificações (sino no topo) com badge de não lidas
- [ ] **T014** — Criar lista de notificações com ícone e texto por tipo
- [ ] **T015** — Implementar redirecionamento ao clicar em cada notificação
- [ ] **T016** — Criar tela de configurações de notificação com toggles por tipo e canal
- [ ] **T017** — Implementar solicitação de permissão de push notification ao usuário (PWA)
- [ ] **T018** — Registrar service worker para recebimento de push notifications com app fechado
- [ ] **T019** — Exibir notificações obrigatórias como bloqueadas na tela de configurações

### Testes

- [ ] **T020** — Teste de entrega de notificação obrigatória independente das preferências
- [ ] **T021** — Teste de respeito às preferências do usuário para notificações opcionais
- [ ] **T022** — Teste de push notification com app aberto e fechado
- [ ] **T023** — Teste de envio de e-mail em menos de 2 minutos após o evento
- [ ] **T024** — Teste do job de alerta de cupom expirando (3 dias antes)
- [ ] **T025** — Teste de agrupamento de notificações sociais em sequência
- [ ] **T026** — Teste de redirecionamento correto ao clicar em cada tipo de notificação
