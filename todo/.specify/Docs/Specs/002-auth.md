# 002 — Autenticação e Perfil do Usuário

> Prioridade: 🔴 Alta
> Versão: 0.1
> Última atualização: Maio/2026

---

## a. Objetivo

Permitir que usuários se cadastrem, façam login e gerenciem seus perfis públicos no AimTravel. O perfil é a identidade do viajante na plataforma — exibe seu histórico de viagens, nível, ranking e recompensas. Um sistema robusto de autenticação com verificação em duas etapas garante segurança e confiança na plataforma.

### Critérios de Sucesso
- Usuário consegue se cadastrar e verificar o e-mail em menos de 3 minutos
- Login social (Google/Facebook) funciona em até 2 cliques
- Perfil público exibe histórico de viagens, nível e ranking corretamente
- Recuperação de acesso disponível via e-mail, e-mail secundário ou número de telefone
- Autenticação de duas etapas (2FA) disponível e funcional

---

## b. Design

### Telas Envolvidas

**1. Tela de Cadastro**
- Campo: nome completo
- Campo: e-mail principal
- Campo: número de telefone (para recuperação e 2FA)
- Campo: senha (com indicador de força)
- Campo: confirmar senha
- Botão: "Cadastrar com Google"
- Botão: "Cadastrar com Facebook"
- Link: "Já tenho uma conta — fazer login"
- Após cadastro: tela de verificação de e-mail obrigatória antes de acessar o app

**2. Tela de Verificação de E-mail**
- Mensagem informando que um código foi enviado ao e-mail
- Campo: código de verificação (6 dígitos)
- Botão: "Reenviar código"
- O usuário só acessa o app após confirmar o e-mail

**3. Tela de Login**
- Campo: e-mail
- Campo: senha
- Botão: "Entrar"
- Botão: "Entrar com Google"
- Botão: "Entrar com Facebook"
- Link: "Esqueci minha senha"
- Link: "Criar conta"

**4. Recuperação de Acesso**
- Opção 1: envio de link/código para e-mail principal
- Opção 2: envio de código para e-mail secundário de recuperação
- Opção 3: envio de código SMS para número de telefone cadastrado
- Após validação: tela para cadastrar nova senha

**5. Autenticação de Duas Etapas (2FA)**
- Configurável nas configurações do perfil
- Métodos disponíveis: SMS ou e-mail
- Ao fazer login: após senha, solicita código de verificação enviado ao método escolhido

**6. Perfil Público do Usuário**
- Foto de perfil e nome
- Bio (texto curto)
- Nível de viajante (badge visual: Iniciante, Explorador, Viajante, Embaixador)
- Ranking geral (badge visual: Bronze, Prata, Ouro, Diamante)
- Contador: número de relatos publicados, seguidores e seguindo
- Avaliação média (estrelas baseadas nas avaliações recebidas)
- Histórico de viagens publicadas (grid de cards)
- Botão: "Seguir" (para outros usuários)
- Botão: "Editar perfil" (apenas para o próprio usuário)

**7. Edição de Perfil**
- Alterar foto de perfil
- Alterar nome de exibição
- Alterar bio
- Gerenciar e-mail secundário de recuperação
- Gerenciar número de telefone
- Ativar/desativar 2FA
- Alterar senha

**8. Tela de Seguidores / Seguindo**
- Lista de usuários que seguem o perfil
- Lista de usuários que o perfil segue
- Botão de seguir/deixar de seguir em cada item da lista

---

## c. Plano

### Sistema de Níveis — Nível de Viajante
Baseado exclusivamente na quantidade de relatos publicados e aprovados:

**Iniciante** — 0 a 2 relatos
**Explorador** — 3 a 9 relatos
**Viajante** — 10 a 24 relatos
**Embaixador** — 25 ou mais relatos

### Sistema de Ranking Geral
Combina os três critérios abaixo com pesos iguais para calcular o ranking:

- Nível de viajante (quantidade de relatos)
- Avaliação média recebida de outros usuários (estrelas)
- Número de seguidores

**Bronze** — pontuação baixa nos três critérios (ex: Iniciante + menos de 2 estrelas + menos de 30 seguidores)
**Prata** — pontuação média (ex: Explorador + 2 a 3 estrelas + 30 a 100 seguidores)
**Ouro** — pontuação alta (ex: Viajante + 3 a 4 estrelas + 100 a 500 seguidores)
**Diamante** — pontuação máxima (ex: Embaixador + 4+ estrelas + 500+ seguidores)

### Benefícios por Ranking
- **Bronze:** acesso básico à plataforma
- **Prata:** cupons de desconto mensais com parceiros
- **Ouro:** cupons maiores + destaque no feed para os relatos
- **Diamante:** benefícios exclusivos + acesso antecipado a promoções de parceiros

> ⚠️ Valores exatos de pontuação e benefícios a definir com a equipe.

### Fluxo Principal — Cadastro

```
Usuário acessa o AimTravel
  → Clica em "Criar conta"
    → Preenche nome, e-mail, telefone e senha
      → Clica em "Cadastrar"
        → Sistema envia código de verificação por e-mail
          → Usuário insere o código
            → Conta verificada e ativada
              → Usuário redirecionado para o feed
```

### Fluxo Principal — Login Social

```
Usuário clica em "Entrar com Google" ou "Entrar com Facebook"
  → Autenticação OAuth na plataforma escolhida
    → Sistema verifica se já existe conta com aquele e-mail
      → Se sim: faz login direto
      → Se não: cria conta automaticamente e solicita telefone para recuperação
        → Usuário redirecionado para o feed
```

### Fluxo Principal — Recuperação de Acesso

```
Usuário clica em "Esqueci minha senha"
  → Escolhe método: e-mail principal, e-mail secundário ou SMS
    → Sistema envia código de verificação
      → Usuário insere o código
        → Tela para cadastrar nova senha
          → Login realizado automaticamente
```

### Fluxo Principal — 2FA no Login

```
Usuário insere e-mail e senha corretamente
  → Sistema detecta que 2FA está ativo
    → Envia código via SMS ou e-mail (conforme configurado)
      → Usuário insere o código
        → Login concluído
```

### Regras de Negócio
- E-mail verificado é obrigatório para acessar qualquer funcionalidade do app
- Cada e-mail pode estar associado a apenas uma conta
- Senha deve ter no mínimo 8 caracteres, com letras e números
- Sessão expira após 30 dias de inatividade (JWT com refresh token)
- Usuário pode seguir e deixar de seguir qualquer outro usuário
- Nível de viajante e ranking são recalculados automaticamente a cada novo relato publicado ou avaliação recebida
- Usuário pode avaliar um perfil apenas uma vez (pode editar a avaliação depois)

### Integrações
- **OAuth2:** Google e Facebook para login social
- **Serviço de e-mail:** envio de códigos de verificação e recuperação (ex: SendGrid ou Resend)
- **SMS:** envio de códigos via número de telefone (ex: Twilio)
- **Rewards:** ranking Ouro e Diamante acionam benefícios no módulo de recompensas (ver spec `003-rewards.md`)

---

## d. Tasks

### Backend

- [ ] **T001** — Criar model `User` no PostgreSQL com todos os campos definidos em `main.md` + campos de autenticação (senha_hash, email_verificado, telefone, 2fa_ativo, 2fa_metodo)
- [ ] **T002** — Criar endpoint `POST /api/auth/register` para cadastro com e-mail e senha
- [ ] **T003** — Criar endpoint `POST /api/auth/verify-email` para verificação do código de e-mail
- [ ] **T004** — Criar endpoint `POST /api/auth/login` com geração de JWT + refresh token
- [ ] **T005** — Criar endpoint `POST /api/auth/oauth/google` para login com Google
- [ ] **T006** — Criar endpoint `POST /api/auth/oauth/facebook` para login com Facebook
- [ ] **T007** — Criar endpoint `POST /api/auth/forgot-password` para solicitação de recuperação
- [ ] **T008** — Criar endpoint `POST /api/auth/reset-password` para redefinição de senha
- [ ] **T009** — Criar endpoint `POST /api/auth/2fa/enable` para ativar autenticação de duas etapas
- [ ] **T010** — Criar endpoint `POST /api/auth/2fa/verify` para validar código do 2FA no login
- [ ] **T011** — Criar endpoint `GET /api/users/:id` para buscar perfil público
- [ ] **T012** — Criar endpoint `PUT /api/users/:id` para editar perfil (apenas o próprio usuário)
- [ ] **T013** — Criar endpoint `POST /api/users/:id/follow` para seguir/deixar de seguir
- [ ] **T014** — Criar endpoint `GET /api/users/:id/followers` para listar seguidores
- [ ] **T015** — Criar endpoint `GET /api/users/:id/following` para listar seguindo
- [ ] **T016** — Criar endpoint `POST /api/users/:id/rate` para avaliar um perfil
- [ ] **T017** — Implementar lógica de cálculo automático de nível de viajante e ranking geral
- [ ] **T018** — Integrar serviço de envio de e-mail (SendGrid ou Resend)
- [ ] **T019** — Integrar serviço de SMS (Twilio) para 2FA e recuperação por telefone

### Frontend

- [ ] **T020** — Criar tela de cadastro com validação de campos
- [ ] **T021** — Criar tela de verificação de e-mail com campo de código
- [ ] **T022** — Criar tela de login com opções de login social
- [ ] **T023** — Criar fluxo de recuperação de acesso (escolha de método → código → nova senha)
- [ ] **T024** — Criar fluxo de configuração e validação do 2FA
- [ ] **T025** — Criar página de perfil público com badges de nível e ranking
- [ ] **T026** — Criar componente de badge visual para nível de viajante (Iniciante → Embaixador)
- [ ] **T027** — Criar componente de badge visual para ranking (Bronze → Diamante)
- [ ] **T028** — Criar tela de edição de perfil
- [ ] **T029** — Criar tela de seguidores e seguindo
- [ ] **T030** — Implementar botão de seguir/deixar de seguir com atualização em tempo real

### Testes

- [ ] **T031** — Teste de fluxo completo de cadastro e verificação de e-mail
- [ ] **T032** — Teste de login social (Google e Facebook)
- [ ] **T033** — Teste de recuperação de senha pelos três métodos
- [ ] **T034** — Teste de ativação e uso do 2FA
- [ ] **T035** — Teste de cálculo de nível e ranking após publicação de relatos e avaliações
- [ ] **T036** — Teste de segurança: tentativas de login com senha errada (bloqueio após X tentativas)
