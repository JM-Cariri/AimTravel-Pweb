# AimTravel — Design System

> Versão: 0.1
> Última atualização: Maio/2026
> Status: Proposta inicial — validar com a equipe

---

## 1. Princípios de Design

O AimTravel transmite a sensação de liberdade, aventura e bem-estar que uma viagem proporciona. O visual deve ser vibrante sem ser cansativo, simples sem ser vazio, e agradável aos olhos em qualquer momento do dia.

**Vibrante:** cores que remetem a céu, mar, natureza e pôr do sol — elementos universais de viagem.
**Simples:** interfaces limpas com hierarquia clara, sem poluição visual.
**Acolhedor:** cantos arredondados, tipografia amigável e espaçamento generoso que convida o usuário a explorar.
**Inspirador:** fotos reais de usuários como protagonistas — o conteúdo é o design.

---

## 2. Paleta de Cores

### Cores Primárias

**Azul Oceano — #0077B6**
- Uso principal: botões primários, links, ícones ativos, destaques
- Transmite: confiança, profundidade, viagem marítima e aérea

**Laranja Pôr do Sol — #F4A261**
- Uso principal: chamadas para ação secundárias, badges, alertas positivos, recompensas
- Transmite: energia, calor, aventura, entusiasmo

### Cores de Apoio

**Verde Natureza — #2EC4B6**
- Uso: confirmações, status positivo, badges de ranking, elementos de sucesso
- Transmite: bem-estar, natureza, frescor

**Amarelo Areia — #FFD166**
- Uso: estrelas de avaliação, destaques suaves, elementos de gamificação
- Transmite: leveza, sol, praia

### Cores Neutras

**Branco Puro — #FFFFFF**
- Uso: fundo principal de todas as telas
- O fundo branco coloca as fotos dos relatos como protagonistas

**Cinza Claro — #F8F9FA**
- Uso: fundo de cards, seções secundárias, inputs

**Cinza Médio — #6C757D**
- Uso: textos secundários, placeholders, ícones inativos

**Cinza Escuro — #212529**
- Uso: texto principal, títulos, conteúdo de alta importância

### Cores de Status

**Sucesso — #2EC4B6** (Verde Natureza)
**Erro — #E63946**
**Atenção — #FFD166** (Amarelo Areia)
**Informação — #0077B6** (Azul Oceano)

### Cores de Ranking

**Bronze — #CD7F32**
**Prata — #A8A9AD**
**Ouro — #FFD700**
**Diamante — #B9F2FF**

---

## 3. Tipografia

### Família Principal — Inter
- Fonte sans-serif moderna, extremamente legível em telas mobile
- Disponível gratuitamente via Google Fonts
- Import: `https://fonts.google.com/specimen/Inter`

### Escala Tipográfica

**Display — 32px / Bold (700)**
- Uso: títulos de telas principais, hero sections

**Heading 1 — 24px / SemiBold (600)**
- Uso: títulos de seções, nome de destinos em destaque

**Heading 2 — 20px / SemiBold (600)**
- Uso: subtítulos, nome de relatos nos cards

**Heading 3 — 18px / Medium (500)**
- Uso: títulos de cards, labels de seção

**Body Large — 16px / Regular (400)**
- Uso: texto principal, descrições de relatos

**Body — 14px / Regular (400)**
- Uso: texto secundário, metadados (data, localização)

**Caption — 12px / Regular (400)**
- Uso: legendas, informações de rodapé, timestamps

**Label — 12px / SemiBold (600)**
- Uso: labels de botões pequenos, badges, tags

### Altura de Linha (line-height)
- Títulos: 1.2
- Corpo de texto: 1.6
- Captions: 1.4

---

## 4. Espaçamento

Sistema baseado em múltiplos de 4px para consistência em todos os componentes.

**4px** — espaçamento mínimo entre elementos internos
**8px** — espaçamento entre ícone e texto, padding interno pequeno
**12px** — padding de badges e tags
**16px** — padding padrão de cards e botões
**24px** — espaçamento entre componentes na mesma seção
**32px** — espaçamento entre seções diferentes
**48px** — espaçamento de seções maiores e hero areas
**64px** — margem de telas e espaçamentos estruturais

---

## 5. Bordas e Sombras

### Border Radius (cantos arredondados e suaves)

**4px** — inputs, checkboxes
**8px** — botões pequenos, badges, tags
**12px** — botões padrão, cards pequenos
**16px** — cards médios e grandes
**24px** — modais, bottom sheets
**9999px** — botões pill, avatares, chips

### Sombras

**Sombra Suave (cards)**
`box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)`

**Sombra Média (modais, dropdowns)**
`box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12)`

**Sombra Forte (botão flutuante FAB)**
`box-shadow: 0 8px 24px rgba(0, 119, 182, 0.24)`

---

## 6. Componentes

### Botões

**Primário**
- Fundo: Azul Oceano (#0077B6)
- Texto: Branco (#FFFFFF), 14px SemiBold
- Border radius: 12px
- Padding: 12px 24px
- Estado hover: fundo #005F91 (10% mais escuro)
- Estado desabilitado: opacidade 40%

**Secundário**
- Fundo: transparente
- Borda: 1.5px Azul Oceano (#0077B6)
- Texto: Azul Oceano (#0077B6), 14px SemiBold
- Border radius: 12px
- Padding: 12px 24px

**Destaque (CTA)**
- Fundo: Laranja Pôr do Sol (#F4A261)
- Texto: Branco (#FFFFFF), 14px SemiBold
- Border radius: 12px
- Padding: 12px 24px
- Usado em: "Comprar agora", "Ver oferta", "Publicar relato"

**Botão Flutuante (FAB)**
- Fundo: Azul Oceano (#0077B6)
- Ícone: Branco, 24px
- Tamanho: 56px x 56px
- Border radius: 9999px
- Sombra forte
- Usado em: botão "+" do feed para criar relato

### Cards

**Card de Relato**
- Fundo: Branco (#FFFFFF)
- Border radius: 16px
- Sombra suave
- Foto de capa: altura fixa 200px, border radius 16px 16px 0 0
- Padding interno: 16px
- Informações: destino (Heading 3), custo total (Body Large, Azul Oceano), autor (Caption)

**Card de Oferta**
- Fundo: Branco (#FFFFFF)
- Border radius: 16px
- Sombra suave
- Badge de tipo no canto superior: border radius 8px, fundo Laranja Pôr do Sol
- Preço em destaque: Heading 2, Azul Oceano

**Card de Usuário**
- Avatar circular: 48px, border radius 9999px
- Nome: Body Large SemiBold
- Nível: Caption com badge colorido

### Inputs

**Input padrão**
- Fundo: Cinza Claro (#F8F9FA)
- Borda: 1.5px #DEE2E6
- Border radius: 12px
- Padding: 12px 16px
- Texto: Body Large, Cinza Escuro
- Placeholder: Body Large, Cinza Médio
- Estado foco: borda Azul Oceano (#0077B6), sombra `0 0 0 3px rgba(0,119,182,0.15)`
- Estado erro: borda #E63946

### Badges e Tags

**Badge de Nível de Viajante**
- Border radius: 9999px
- Padding: 4px 10px
- Texto: 12px SemiBold, branco
- Iniciante: fundo Cinza Médio
- Explorador: fundo Verde Natureza
- Viajante: fundo Azul Oceano
- Embaixador: fundo gradiente Azul Oceano → Laranja Pôr do Sol

**Badge de Ranking**
- Border radius: 9999px
- Padding: 4px 10px
- Texto: 12px SemiBold
- Bronze: fundo #CD7F32, texto branco
- Prata: fundo #A8A9AD, texto branco
- Ouro: fundo #FFD700, texto Cinza Escuro
- Diamante: fundo #B9F2FF, texto Azul Oceano

### Navegação

**Bottom Navigation Bar (mobile/PWA)**
- 4 itens: Feed, Explore, Wallet, Perfil
- Ícone ativo: Azul Oceano (#0077B6)
- Ícone inativo: Cinza Médio (#6C757D)
- Fundo: Branco com sombra suave no topo
- Altura: 64px

**Top App Bar**
- Fundo: Branco (#FFFFFF)
- Título: Heading 2, Cinza Escuro
- Ícones de ação: Cinza Escuro
- Barra de busca: Cinza Claro com border radius 9999px

---

## 7. Ícones

**Biblioteca recomendada:** Lucide Icons
- Estilo: linha fina (stroke), consistente e moderno
- Tamanho padrão: 24px (navegação e ações), 20px (inline), 16px (captions)
- Cor: herda a cor do contexto (Azul Oceano para ativos, Cinza Médio para inativos)
- Import React: `lucide-react`

---

## 8. Imagens e Mídia

**Fotos de relatos**
- Formato aceito: JPG, PNG, WebP
- Tamanho máximo: 5MB por foto
- Dimensão mínima recomendada: 800x600px
- Exibição no card: object-fit cover, altura 200px
- Exibição na página do relato: carrossel com altura 300px

**Avatares de usuário**
- Formato aceito: JPG, PNG
- Tamanho máximo: 2MB
- Exibição: circular, object-fit cover
- Tamanhos: 32px (lista), 48px (card), 80px (perfil)
- Fallback: inicial do nome em fundo Azul Oceano

**Logos de parceiros**
- Formato aceito: PNG com fundo transparente, SVG
- Exibição: altura fixa 32px, largura automática

---

## 9. Layout e Grid

**Breakpoints**

- Mobile (PWA principal): até 768px
- Tablet: 768px a 1024px
- Desktop: acima de 1024px

**Grid mobile (foco principal)**
- Colunas: 4
- Gutter: 16px
- Margem lateral: 16px

**Grid desktop**
- Colunas: 12
- Gutter: 24px
- Largura máxima do conteúdo: 1200px
- Margem lateral: auto (centralizado)

**Largura máxima do app no desktop:** 480px centralizado (comportamento de app mobile no desktop)

---

## 10. Tom de Voz e Microcopy

**Princípios**
- Amigável e próximo, como uma conversa entre amigos viajantes
- Direto ao ponto — sem jargões ou linguagem corporativa
- Inspirador — cada texto deve despertar vontade de viajar

**Exemplos de microcopy**

- Botão de publicar relato: "Compartilhar minha viagem" (não "Publicar")
- Estado vazio do feed: "Ainda não há relatos aqui — que tal ser o primeiro a compartilhar?" 
- Confirmação de compra: "Boa viagem! Seu pedido está confirmado."
- Erro de login: "E-mail ou senha incorretos. Tente novamente."
- Recompensa recebida: "Você ganhou 50 AimCoins! Use na sua próxima aventura."
- Cupom expirando: "Seu cupom expira em 3 dias — não deixa escapar!"

---

*Este documento deve ser atualizado sempre que uma decisão visual for tomada pela equipe. Após definição do logo e paleta oficial, substituir os valores propostos pelos definitivos.*
