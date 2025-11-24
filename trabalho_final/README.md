📱 Rick and Morty Characters — App React Native (Expo)

Este projeto foi desenvolvido como Trabalho Final de React Native com Expo, seguindo os requisitos do material fornecido.
O aplicativo consome a Rick and Morty API para exibir personagens, com paginação, busca e tratamento de estados de carregamento e erro.

🚀 Funcionalidades

✔️ Consumo real da API Rick and Morty

✔️ Listagem de personagens com imagem, nome, espécie, status e localização

✔️ Paginação (Próxima Página / Página Anterior)

✔️ Busca por nome (ponto extra)

✔️ Tratamento de carregamento (Carregando...)

✔️ Tratamento de erros (Erro ao carregar dados...)

✔️ Componentização (cards + paginação)

✔️ Interface simples, limpa e organizada

📚 Tecnologias utilizadas

React Native

Expo

JavaScript

Hooks: useState, useEffect

Fetch API (requisição real)

FlatList para exibição da lista

Componentes funcionais

📂 Estrutura do Projeto
/
├─ App.js
├─ package.json
├─ README.md
├─ components/
│  ├─ CharacterCard.js
│  └─ PaginationControls.js
└─ assets/ (opcional)

🛠️ Instalação e execução
1. Instale o Expo CLI (caso ainda não tenha)
npm install -g expo-cli

2. Instale as dependências do projeto
npm install

3. Inicie o projeto
npm start

4. Abra no dispositivo

Pelo QR code (app Expo Go)

Ou em emulador Android/iOS

🔌 API Utilizada

Rick and Morty API
Endpoint base:

https://rickandmortyapi.com/api/character


O app usa:

?page=N para paginação

?name=Rick para busca por nome

🧩 Principais Arquivos
App.js

Gerencia estado global do app

Faz requisições HTTP usando fetch

Controla loading, erro, busca e paginação

Renderiza a lista com FlatList

components/CharacterCard.js

Exibe cada personagem em um card estilizado

components/PaginationControls.js

Controla navegação entre páginas

✔️ Requisitos do Trabalho Atendidos
Requisito	Status
Consumo de API real	✔️
Uso de useState	✔️
Uso de useEffect	✔️
Uso de fetch/axios	✔️ (fetch)
Listagem de dados	✔️
Tratamento de carregamento	✔️
Tratamento de erro	✔️
Botões de navegação	✔️
Interface organizada	✔️
Ponto extra (filtro/busca)	✔️ Incluído!
📦 Download do Projeto Completo

Você pode baixar o projeto final aqui:

👉 Download rick_and_morty_app.zip

👤 Autor

Desenvolvido por Paulo Vitor Matheus Jung
Trabalho Final — React Native (Expo)