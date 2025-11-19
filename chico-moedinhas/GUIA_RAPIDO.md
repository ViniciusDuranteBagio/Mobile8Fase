# 🚀 Guia Rápido de Execução

## Requisitos

- Node.js v16+ instalado
- npm instalado
- Expo CLI: `npm install -g expo-cli`
- Um dos seguintes:
  - Emulador Android com Android Studio
  - Simulador iOS (apenas em Mac)
  - Expo Go instalado no seu celular

## Passos para Executar

### 1️⃣ Entrar na pasta do projeto

```bash
cd chico-moedinhas
```

### 2️⃣ Instalar dependências

```bash
npm install
```

Isso pode levar alguns minutos na primeira vez.

### 3️⃣ Iniciar o servidor Expo

```bash
npm start
```

Você verá uma tela com QR code e opções de execução.

### 4️⃣ Escolher a plataforma

No terminal que está rodando o Expo, pressione:

- **`a`** para abrir no Android (precisa de emulador rodando)
- **`i`** para abrir no iOS (apenas em Mac)
- **`w`** para abrir no navegador (web version)
- **Escanear QR code** com seu celular usando Expo Go

## 🎮 Controles no Terminal Expo

| Tecla | Ação |
|-------|------|
| `a` | Abre no Android |
| `i` | Abre no iOS |
| `w` | Abre no navegador |
| `r` | Recarrega o app |
| `m` | Abre o menu |
| `q` | Sai do Expo |

## ✅ Verificar se funciona

Ao abrir o app, você verá:

1. ✅ Cabeçalho azul com "💰 Chico Moedas"
2. ✅ Barra de pesquisa com placeholder "Buscar moeda..."
3. ✅ Cards com moedas e seus valores
4. ✅ Botões "← Anterior" e "Próxima →" na base
5. ✅ Indicador de página "Página X de Y"

## 🔍 Testar Funcionalidades

### Teste 1: Ver Moedas Carregarem
- Abra o app
- Você deve ver 8 moedas na primeira página
- Status: "Moedas carregando..." desaparece

### Teste 2: Navegar entre Páginas
- Clique no botão "Próxima →"
- Deve mostrar mais 8 moedas
- Clique em "← Anterior"
- Volta às moedas anteriores

### Teste 3: Buscar Moeda
- Digite "USD" na barra de pesquisa
- Deve filtrar para apenas Dólar
- Página volta para 1
- Mostra "1 moeda encontrada"

### Teste 4: Limpar Busca
- Digite algo na busca
- Clique no botão "✕" (X) ao lado
- Volta a mostrar todas as moedas

### Teste 5: Recarregar Dados
- Puxe a lista para baixo (pull to refresh)
- Spinner deve aparecer
- Dados são recarregados

### Teste 6: Erro de Conexão
- Desconecte da internet
- Clique em "Tentar Novamente"
- Deve aparecer mensagem de erro
- Reconecte e tente novamente

## 📱 Rodar em Emulador Android

### Se não tem emulador:

1. Baixe Android Studio: https://developer.android.com/studio
2. Abra Android Studio
3. Vá em: AVD Manager (ícone de celular)
4. Clique em "Create Virtual Device"
5. Escolha um dispositivo (ex: Pixel 4)
6. Escolha uma Android versão (ex: API 31)
7. Clique em Play para iniciar

### Após ter emulador:

1. Tenha o emulador aberto
2. No terminal Expo, pressione `a`
3. Expo vai detectar o emulador e abrir o app

## 🍎 Rodar em Simulador iOS (apenas Mac)

1. Tenha o Xcode instalado
2. No terminal Expo, pressione `i`
3. Simulador abre automaticamente

## 📱 Rodar no Seu Celular

### Opção 1: Expo Go (Recomendado)

1. Baixe **Expo Go** na App Store ou Play Store
2. No terminal Expo, você verá um QR code
3. Abra Expo Go no seu celular
4. Escaneie o QR code (botão azul no Expo Go)
5. App abre automaticamente

### Opção 2: Build Standalone

```bash
expo build:android    # Cria APK
expo build:ios        # Cria IPA
```

Leva bastante tempo (10-30 minutos).

## 🆘 Problemas Comuns

### "expo: command not found"
```bash
npm install -g expo-cli
```

### "Cannot find module"
```bash
npm install
npm cache clean --force
```

### App não carrega dados
- Verifique conexão com internet
- Teste se API está ok: https://economia.awesomeapi.com.br/json/all
- Clique "Tentar Novamente" na tela de erro

### Emulador não abre
- Garanta que Android Studio está instalado
- Garanta que a AVD está criada
- Reinicie o emulador

### Aplicativo travado
- No terminal: pressione `r` para recarregar
- Ou: `npm start -- --clear`

## 📚 Arquivos Importantes

```
chico-moedinhas/
├── src/
│   ├── screens/CurrenciesScreen.tsx     ← Tela principal
│   ├── components/                      ← Componentes UI
│   ├── services/currencyService.ts      ← Requisições HTTP
│   ├── hooks/useCurrencies.ts           ← Lógica e estado
│   ├── types/currency.ts                ← Tipos TypeScript
│   └── constants/                       ← Configurações
├── app/
│   ├── index.tsx                        ← Entry point
│   └── _layout.tsx                      ← Rotas
├── README_PROJETO.md                    ← Documentação completa
└── PAGINACAO_EXPLICADA.md              ← Explicação de paginação
```

## 🎯 Próximos Passos (Opcionais)

1. **Customize as cores** em `src/constants/theme.ts`
2. **Mude itens por página** em `src/constants/api.ts` (ITEMS_PER_PAGE)
3. **Adicione mais endpoints** em `src/constants/api.ts` (API_ENDPOINTS)
4. **Modifique o layout** em `src/screens/CurrenciesScreen.tsx`

## ✨ Sucesso!

Se você vê o app com moedas, cards e botões de paginação funcionando, parabéns! 🎉

Qualquer dúvida, leia:
- `README_PROJETO.md` - Documentação completa
- `PAGINACAO_EXPLICADA.md` - Como funciona a paginação

---

**Happy coding!** 💻✨
