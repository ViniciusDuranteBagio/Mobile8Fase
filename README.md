# 🎮 Aplicativo Mobile de Jogos Grátis

Aplicativo desenvolvido em React Native que consome a API FreeToGame para exibir uma lista de jogos gratuitos disponíveis.

## 📱 Stack Tecnológica

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Superset JavaScript com tipagem estática
- **Hooks**: `useState` e `useEffect` - Gerenciamento de estado
- **fetch** - Requisições HTTP (prioritário conforme requisitos)

## 🎯 Funcionalidades Implementadas

### ✅ Requisitos Obrigatórios

1. **Consumo da API FreeToGame** usando requisição HTTP real com `fetch`
2. **Listagem de jogos** em cards com:
   - Imagem (thumbnail)
   - Título do jogo
   - Descrição curta
   - Gênero
   - Plataforma
   - Publisher
   - Data de lançamento

3. **Paginação funcional** com:
   - Botão "Próxima Página"
   - Botão "Página Anterior"
   - Indicador de página atual
   - 10 jogos por página

4. **Tratamento de estados**:
   - ✨ Estado de carregamento → "Carregando..."
   - ❌ Estado de erro → "Erro ao carregar dados..."
   - Botão "Tentar Novamente" em caso de erro

5. **Uso correto de Hooks**:
   - `useState` para estados internos (jogos, filtros, paginação)
   - `useEffect` para chamada à API no carregamento

### 🌟 Ponto Extra Implementado

- **Filtro de busca** por nome do jogo
- Campo de busca em tempo real
- Busca case-insensitive
- Reset automático da paginação ao filtrar

### 🎨 Recursos Adicionais

- ✅ Layout simples e organizado
- ✅ Suporte a modo escuro (Dark Mode)
- ✅ Interface responsiva
- ✅ Cards com sombras e bordas arredondadas
- ✅ Badges para gênero e plataforma
- ✅ Ícones SF Symbols/Material Icons

## 🌐 API Utilizada

- **API**: FreeToGame – Jogos grátis
- **Endpoint**: `https://www.freetogame.com/api/games`
- **Documentação**: [FreeToGame API Docs](https://www.freetogame.com/api-doc)

### Dados retornados pela API:

```typescript
interface Game {
  id: number;
  title: string;
  short_description: string;
  thumbnail: string;
  genre: string;
  platform: string;
  publisher: string;
  release_date: string;
}
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado
- npm ou yarn
- Expo Go app (para testar em dispositivo físico)

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start
```

### Executar em diferentes plataformas

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

Ou após `npm start`, pressione:
- `a` - para abrir no Android
- `i` - para abrir no iOS
- `w` - para abrir no navegador web

## 📂 Estrutura do Projeto

```
projeto-final/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Layout das tabs
│   │   ├── index.tsx         # 🎮 Tela principal (Jogos)
│   │   └── explore.tsx       # 📖 Tela sobre o projeto
│   ├── _layout.tsx
│   └── modal.tsx
├── components/               # Componentes reutilizáveis
├── constants/               # Constantes e temas
├── hooks/                   # Custom hooks
├── assets/                  # Imagens e recursos
└── package.json
```

## 💻 Código Principal

A tela principal (`app/(tabs)/index.tsx`) implementa:

- **Estados com useState**:
  - `games` - Lista completa de jogos
  - `filteredGames` - Jogos filtrados pela busca
  - `loading` - Estado de carregamento
  - `error` - Mensagem de erro
  - `searchQuery` - Texto da busca
  - `currentPage` - Página atual

- **Effects com useEffect**:
  - Busca inicial da API ao montar o componente
  - Filtro automático quando a busca muda

- **Funções**:
  - `fetchGames()` - Requisição fetch à API
  - `goToNextPage()` - Avançar página
  - `goToPreviousPage()` - Voltar página
  - `renderGameCard()` - Renderizar card de jogo

## 🎨 Interface

- **Header**: Título e contador de jogos
- **Campo de busca**: Filtro por nome
- **Lista de jogos**: Cards com scroll vertical
- **Paginação**: Botões fixos na parte inferior

### Dark Mode

O app detecta automaticamente o tema do sistema e ajusta:
- Cores de fundo
- Cores de texto
- Bordas e sombras

## 📝 Observações

- ✅ Usa **fetch** prioritariamente (conforme requisitos)
- ✅ Todos os requisitos obrigatórios implementados
- ✅ Ponto extra (filtro de busca) implementado
- ✅ Código limpo e organizado
- ✅ TypeScript para type safety
- ✅ Layout responsivo e profissional

## 👨‍💻 Desenvolvimento

Este projeto foi desenvolvido como trabalho de Desenvolvimento Mobile, utilizando as melhores práticas de React Native e seguindo todos os requisitos especificados.

---

**API Credits**: [FreeToGame](https://www.freetogame.com/)
