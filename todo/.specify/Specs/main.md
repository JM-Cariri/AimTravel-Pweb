# AimTravel — Visão Geral do Projeto (main.md)

> Versão: 0.3
> Última atualização: Maio/2026
> Status: Em andamento

---

## 1. Objetivos

### Objetivo Principal
Criar uma plataforma PWA que mostre ao público que é possível viajar de forma barata e com ótimas experiências, conectando relatos reais de viajantes com a possibilidade de compra de passagens, hospedagens e pacotes diretamente na plataforma.

### Objetivos Específicos
- Permitir que usuários postem relatos de viagens com custos detalhados e pontos turísticos visitados
- Inspirar novos viajantes através de experiências reais e transparentes
- Integrar parceiros comerciais (companhias aéreas, hotéis, restaurantes) para oferecer pacotes e promoções
- Recompensar usuários que contribuem com conteúdo através de cupons de desconto, milhas ou moeda interna
- Criar um ciclo completo de: inspiração → planejamento → compra → relato

---

## 2. Público-Alvo

### Perfil Primário — O Viajante Iniciante
- Pessoas que querem viajar mas acham caro ou não sabem por onde começar
- Faixa etária: 18–35 anos
- Buscam destinos acessíveis com experiências reais de custo
- Tomam decisões baseadas em recomendações de outras pessoas

### Perfil Secundário — O Viajante Experiente
- Pessoas que já viajam com frequência e gostam de compartilhar experiências
- Buscam benefícios e recompensas pelas suas contribuições
- Influenciam a decisão de outros usuários através dos relatos

### Perfil Terciário — Parceiros Comerciais
- Companhias aéreas, hotéis, restaurantes e agências de turismo
- Buscam acesso a uma base qualificada de viajantes
- Interesse em oferecer promoções e pacotes segmentados

---

## 3. Arquitetura Técnica

### Plataforma
**PWA (Progressive Web App)** — escolhido por:
- Menor custo inicial em relação a apps nativos
- SEO orgânico para crescimento sem custo de aquisição
- Experiência mobile sem necessidade de download
- Suporte a notificações push (promoções e novos relatos)

### Stack Tecnológica

**Frontend — React.js**
- Componentização e reaproveitamento de código
- Ecossistema amplo com bibliotecas maduras
- Suporte nativo a PWA

**Backend — Node.js + Express**
- JavaScript full-stack, mesma linguagem no frontend e backend
- Alta performance para operações de I/O
- Vasto ecossistema de pacotes (npm)

**Banco de Dados — PostgreSQL**
- Ideal para dados relacionais (usuários, relatos, parceiros)
- Confiabilidade e suporte a queries complexas
- Suporte a JSON para campos flexíveis quando necessário

**Autenticação — JWT + OAuth2**
- Segurança no controle de sessões
- Login social via Google e Facebook

**Armazenamento de Mídia — AWS S3 ou Cloudinary**
- Upload e entrega otimizada de fotos dos relatos
- CDN para carregamento rápido em qualquer região

**Hospedagem — A definir**
- Candidatos: Vercel (frontend), Railway ou AWS (backend)

### Arquitetura de Alto Nível

```
[Cliente - React PWA]
        ↓ HTTP/REST
[API - Node.js + Express]
        ↓
[PostgreSQL] + [S3/Cloudinary]
        ↓
[Integrações externas - APIs de parceiros]
```

### Principais Módulos do Sistema
- **Auth:** cadastro, login, OAuth social
- **Feed:** criação, listagem e visualização de relatos
- **Rewards:** controle de recompensas e saldo do usuário
- **Integrations:** comunicação com APIs de parceiros
- **Search:** busca e filtragem de destinos e relatos
- **Notifications:** alertas de promoções e engajamento

---

## 4. Identidade Visual

> ⚠️ Identidade visual ainda não definida formalmente. As diretrizes abaixo são uma proposta inicial a ser validada com a equipe.

### Tom e Personalidade
- Moderno, acessível e inspirador
- Transmite leveza, aventura e confiança
- Linguagem próxima, sem ser informal demais

### Cores

**Primárias:**
- Azul-céu — transmite confiança e remete a viagens
- Laranja vibrante — energia, ação e chamada para compra

**Neutras:**
- Branco — fundo limpo para destacar fotos dos relatos
- Cinza claro — separadores e elementos secundários

### Tipografia
- Família: Sans-serif moderna (candidatas: Inter ou Poppins)
- Critério principal: legibilidade em telas mobile

### Estilo de Imagens
- Fotos reais de usuários, sem imagens de banco (stock photo)
- Autenticidade como diferencial visual da plataforma

### Ícones
- Estilo linha fina (thin line), flat
- Consistência visual em toda a plataforma

### Elementos a Definir
- [ ] Logo oficial do AimTravel
- [ ] Paleta de cores definitiva com códigos hex
- [ ] Tipografia oficial
- [ ] Guia de componentes UI (Design System)

---

## 5. Entidades do Sistema

### User (Usuário)
- id
- nome
- email
- senha_hash
- avatar
- bio
- nivel_viajante
- saldo_recompensas
- criado_em

### Trip (Relato de Viagem)
- id
- usuario_id
- titulo
- descricao
- destino
- tipo_viagem (aerea | terrestre | maritima)
- custo_total
- data_inicio
- data_fim
- pontos_turisticos[]
- fotos[]
- curtidas
- status (rascunho | publicado | aprovado)
- criado_em

### TouristSpot (Ponto Turístico)
- id
- nome
- cidade
- pais
- descricao
- categoria
- latitude
- longitude

### Reward (Recompensa)
- id
- usuario_id
- tipo (cupom | milhas | moeda)
- valor
- motivo
- expira_em
- usado
- criado_em

### Partner (Parceiro)
- id
- nome
- tipo (aerea | hotel | restaurante | agencia)
- logo
- api_endpoint
- ativo
- criado_em

### Offer (Oferta)
- id
- parceiro_id
- titulo
- descricao
- destino
- preco
- tipo
- validade
- url_compra

---

## 6. Specs do Projeto

Ordenadas por prioridade — do core do produto para funcionalidades secundárias:

**001 — Feed de Relatos de Viagem** 🔴 Alta
- Arquivo: `specs/001-feed-relatos.md`

**002 — Autenticação e Perfil do Usuário** 🔴 Alta
- Arquivo: `specs/002-auth.md`

**003 — Sistema de Recompensas** 🟡 Média
- Arquivo: `specs/003-rewards.md`

**004 — Busca e Descoberta de Destinos** 🟡 Média
- Arquivo: `specs/004-search.md`

**005 — Integração com Parceiros** 🟡 Média
- Arquivo: `specs/005-integrations.md`

**006 — Notificações e Alertas** 🟢 Baixa
- Arquivo: `specs/006-notifications.md`

---

## 7. Pontos em Aberto

- [ ] Definir modelo final do sistema de recompensas (cupons, milhas ou moeda interna)
- [ ] Levantar e validar APIs dos parceiros (Latam, Azul, Booking, Decolar)
- [ ] Definir critérios de moderação dos relatos (automática ou manual)
- [ ] Definir identidade visual oficial
- [ ] Definir hospedagem e infraestrutura de produção
- [ ] Pesquisar regulamentações para programa de milhas no Brasil

---

*Este documento é a fonte de verdade do projeto. Atualize a cada decisão relevante.*
