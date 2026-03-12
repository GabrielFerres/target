# 🎯 Target - Gerenciador de Metas Financeiras

![React Native](https://img.shields.io/badge/React_Native-0.81.5-61DAFB?logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-SDK_54-000020?logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

O **Target** é um aplicativo móvel desenvolvido para ajudar usuários a definirem metas financeiras claras e acompanharem o progresso de suas economias através de transações de entrada e saída, com foco em **privacidade** e **persistência local**.

---

# 📱 Funcionalidades

- **Gerenciamento de Metas**  
  Crie metas personalizadas (ex: *"Viagem para a praia"*, *"Comprar um carro"*) definindo um valor alvo.

- **Acompanhamento de Progresso**  
  Visualize quanto falta para atingir sua meta com barras de progresso dinâmicas e porcentagens.

- **Transações Flexíveis**  
  Adicione depósitos ou registre retiradas de cada meta específica.

- **Dashboard Inteligente**  
  Visão geral na tela inicial com o total acumulado, somatória de entradas e saídas.

- **Offline First**  
  Todos os dados são salvos localmente no dispositivo utilizando **SQLite**, garantindo que seus dados financeiros nunca saiam do seu aparelho.

---

# 🛠️ Tecnologias Utilizadas

- **React Native (0.81.5)**  
  https://reactnative.dev/

- **Expo (SDK 54)**  
  https://expo.dev/

- **Expo Router**  
  Roteamento nativo baseado em arquivos  
  https://docs.expo.dev/router/introduction/

- **TypeScript**  
  Desenvolvimento com tipagem estática e segura  
  https://www.typescriptlang.org/

- **Expo SQLite**  
  Persistência de dados local robusta  
  https://docs.expo.dev/versions/latest/sdk/sqlite/

- **Day.js**  
  Manipulação eficiente de datas e históricos  
  https://day.js.org/

- **React Native Currency Input**  
  Experiência de usuário aprimorada para inputs monetários.

---

# 📂 Estrutura do Projeto

A estrutura de pastas segue o padrão moderno do **Expo Router** para escalabilidade:

```bash
src/
├── app/                # Rotas e telas (File-based Routing)
│   ├── index.tsx       # Dashboard: Lista de metas e resumo financeiro
│   ├── target.tsx      # Modal/Tela de criação e edição de metas
│   ├── in-progress/    # Detalhes específicos de cada meta
│   │   └── [id].tsx
│   └── transaction/    # Registro de novas movimentações
│       └── [id].tsx
├── components/         # UI Components (Buttons, Inputs, Cards)
├── database/           # Configurações do SQLite e Hooks de acesso aos dados
└── utils/              # Helpers de formatação e constantes
```

## 🚀 Como executar o projeto

### Pré-requisitos
Certifique-se de ter instalado:
* **Node.js**
* **Expo CLI**
* **Expo Go** no celular (opcional)

### 🛠️ Instalação

1. **Clone o repositório:**
```bash
git clone [https://github.com/GabrielFerres/target.git](https://github.com/GabrielFerres/target.git)
cd target
```
2. **Instale as dependências:**
```
npm install
# ou
yarn install
```
3. **Inicie o ambiente:**
```
npx expo start
```
4. **Acesso**
Use o aplicativo Expo Go no seu celular para escanear o QR Code ou pressione a para Android / i para iOS se tiver os emuladores configurados.
