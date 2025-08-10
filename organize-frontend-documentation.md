# Documentação do Frontend: organize-frontend

Este documento detalha a arquitetura, tecnologias, dependências e instruções para rodar o projeto `organize-frontend`.

## 1. Visão Geral

O `organize-frontend` é a interface do usuário da aplicação Organize, construída com React e Vite. Ele oferece uma experiência interativa para o gerenciamento de tarefas, consumindo a API RESTful fornecida pelo `organize-backend`.

## 2. Tecnologias e Dependências Principais

O projeto utiliza as seguintes tecnologias e bibliotecas:

*   **React**: Biblioteca JavaScript para construção de interfaces de usuário.
*   **Vite**: Ferramenta de build de frontend que oferece uma experiência de desenvolvimento extremamente rápida.
*   **ESLint**: Ferramenta para identificar e reportar padrões problemáticos encontrados no código JavaScript/TypeScript.
*   **Axios**: Cliente HTTP baseado em Promises para fazer requisições a APIs.
*   **React Router DOM**: Biblioteca para roteamento declarativo no React.
*   **Web Vitals**: Biblioteca para medir e reportar métricas de desempenho web.
*   **@testing-library/react**, **@testing-library/dom**, **@testing-library/jest-dom**, **@testing-library/user-event**: Bibliotecas para facilitar a escrita de testes que simulam o comportamento do usuário.

As dependências completas podem ser encontradas no arquivo `package.json`.

## 3. Estrutura de Pastas

A estrutura do projeto segue o padrão de aplicações React/Vite:

```
.
├── public/             # Arquivos estáticos (imagens, favicon, etc.)
├── src/                # Código-fonte da aplicação
│   ├── assets/         # Ativos como imagens, ícones, etc.
│   ├── components/     # Componentes React reutilizáveis
│   ├── pages/          # Páginas da aplicação (views)
│   ├── services/       # Serviços para interação com a API
│   ├── App.jsx         # Componente principal da aplicação
│   ├── main.jsx        # Ponto de entrada da aplicação
│   └── index.css       # Estilos globais
├── .env.development    # Variáveis de ambiente para desenvolvimento
├── .gitignore          # Arquivos e pastas a serem ignorados pelo Git
├── eslint.config.js    # Configuração do ESLint
├── index.html          # Arquivo HTML principal
├── package.json        # Metadados do projeto e lista de dependências
├── package-lock.json   # Bloqueio de versões das dependências
├── README.md           # Informações gerais do projeto
└── vite.config.js      # Configuração do Vite
```

## 4. Scripts Disponíveis

No arquivo `package.json`, você encontrará os seguintes scripts para gerenciar o projeto:

*   `npm run dev`: Inicia o servidor de desenvolvimento com hot-module reloading (HMR). A aplicação estará disponível em `http://localhost:5173` (ou outra porta disponível).
*   `npm run build`: Compila o projeto para produção, gerando os arquivos otimizados na pasta `dist/`.
*   `npm run lint`: Executa o ESLint para verificar problemas de estilo e qualidade de código.
*   `npm run preview`: Serve a build de produção localmente para pré-visualização.

## 5. Como Rodar o Projeto

Siga os passos abaixo para configurar e rodar o `organize-frontend` em seu ambiente local:

### Pré-requisitos

*   Node.js (versão 18 ou superior recomendada)
*   npm (gerenciador de pacotes do Node.js) ou Yarn

### Passos

1.  **Clone o repositório** (se ainda não o fez):
    ```bash
    git clone <URL_DO_REPOSITORIO_FRONTEND>
    cd organize-frontend
    ```
2.  **Instale as dependências**:
    ```bash
    npm install
    # ou, se preferir Yarn:
    # yarn install
    ```
3.  **Configure as variáveis de ambiente** (se necessário):
    O arquivo `.env.development` pode conter variáveis de ambiente específicas para o desenvolvimento, como a URL da API do backend. Certifique-se de que a URL da API esteja configurada corretamente para apontar para o seu `organize-backend` em execução. Exemplo:
    ```
    VITE_API_BASE_URL=http://localhost:8080
    ```
4.  **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```
    O aplicativo será aberto no seu navegador padrão. Se não abrir automaticamente, acesse `http://localhost:5173` (ou a porta indicada no terminal).

## 6. Considerações de Desenvolvimento

*   **Componentização**: O projeto segue o paradigma de componentes do React, promovendo a reutilização de código e a modularidade.
*   **Gerenciamento de Estado**: O gerenciamento de estado é feito de forma local nos componentes ou utilizando Context API/Hooks do React para estados globais, se aplicável.
*   **Estilização**: A estilização pode ser feita com CSS puro, módulos CSS ou bibliotecas como Tailwind CSS/Styled Components, dependendo das escolhas de design do projeto.
*   **Interação com o Backend**: As requisições HTTP para o backend são realizadas utilizando a biblioteca `axios`, geralmente encapsuladas em arquivos de serviço para manter a lógica de API separada dos componentes.

---
