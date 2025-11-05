# Organize Frontend - Visão Geral

O banco de dados do projeto Organize foi projetado para oferecer uma estrutura relacional clara e escalável, permitindo o gerenciamento eficiente de usuários, estabelecimentos, serviços, agendamentos, pagamentos e relatórios.
O objetivo é garantir integridade referencial e flexibilidade para futuras expansões, como módulos de notificações, lista de espera e feedbacks.

A modelagem utiliza UUIDs como chaves primárias, assegurando unicidade e compatibilidade em ambientes distribuídos.
Todas as tabelas incluem campos de auditoria, como created_at, para rastrear o momento da criação dos registros.

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
.
├── public/                     # Arquivos estáticos (favicon, imagens públicas, etc.)
├── src/                        # Código-fonte principal da aplicação
│   ├── components/             # Componentes React reutilizáveis (botões, inputs, cards, etc.)
│   ├── features/               # Funcionalidades específicas (ex: login, cadastro, agendamento)
│   ├── hooks/                  # Hooks personalizados (ex: useAuth, useFetch)
│   ├── layouts/                # Estruturas de layout compartilhadas (ex: layout do painel)
│   ├── routes/                 # Definição e controle das rotas da aplicação
│   ├── services/               # Comunicação com a API (axios, endpoints, etc.)
│   ├── styles/                 # Estilos globais e temas
│   ├── App.jsx                 # Componente principal da aplicação
│   ├── main.jsx                # Ponto de entrada da aplicação React
│   ├── index.js                # Inicialização e renderização do app
│   └── index.css               # Estilos globais padrão
│
├── .env.development            # Variáveis de ambiente para o ambiente de desenvolvimento
├── .gitignore                  # Arquivos e pastas ignorados pelo Git
├── .gitattributes              # Configurações adicionais de versionamento
├── eslint.config.js            # Regras e padrões do ESLint
├── index.html                  # Template HTML principal
├── package.json                # Dependências e scripts do projeto
├── package-lock.json           # Controle de versões exatas das dependências
├── LICENSE                     # Licença do projeto
├── README.md                   # Documentação do projeto (este arquivo)
└── vite.config.js              # Configuração do Vite
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
    git clone https://github.com/vieiradg/Organize_Front
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

## 6. Como Contribuir

 Para contribuir com o projeto `organize-frontend`, siga os passos abaixo:

1.  **Faça um Fork do Repositório**:
    Acesse o repositório original no GitHub e clique no botão "Fork" no canto superior direito. Isso criará uma cópia do repositório em sua conta.

2.  **Clone o seu Fork**:
    ```bash
    git clone https://github.com/SEU_USUARIO/organize-frontend.git
    cd organize-frontend
    ```

3.  **Crie uma Branch para sua Feature/Correção**:
    É uma boa prática criar uma nova branch para cada alteração que você for fazer. Use um nome descritivo:
    ```bash
    git checkout -b feature/minha-nova-funcionalidade
    # ou
    git checkout -b bugfix/correcao-de-erro
    ```

4.  **Faça suas Alterações**:
    Implemente suas mudanças, adicione novos recursos ou corrija bugs. Certifique-se de seguir as convenções de código existentes no projeto.

5.  **Teste suas Alterações**:
    Antes de enviar suas alterações, execute os testes existentes e, se aplicável, crie novos testes para cobrir seu código.
    ```bash
    npm test # ou o comando de teste específico do projeto
    ```

6.  **Commit suas Alterações**:
    Escreva mensagens de commit claras e concisas, descrevendo o que foi alterado. Use o padrão de Conventional Commits se o projeto o seguir (ex: `feat: adiciona nova funcionalidade`, `fix: corrige bug de login`).
    ```bash
    git add .
    git commit -m "feat: adiciona nova funcionalidade de tarefas"
    ```

7.  **Envie suas Alterações para o seu Fork**:
    ```bash
    git push origin feature/minha-nova-funcionalidade
    ```

8.  **Abra um Pull Request (PR)**:
    Vá para o seu repositório no GitHub, você verá um botão para criar um Pull Request. Preencha o template do PR (se houver) e descreva suas alterações em detalhes. Um dos mantenedores do projeto revisará seu código e poderá solicitar alterações antes de mesclar.

## 7. Considerações de Desenvolvimento

*   **Componentização**: O projeto segue o paradigma de componentes do React, promovendo a reutilização de código e a modularidade.
*   **Gerenciamento de Estado**: O gerenciamento de estado é feito de forma local nos componentes ou utilizando Context API/Hooks do React para estados globais, se aplicável.
*   **Estilização**: A estilização pode ser feita com CSS puro, módulos CSS ou bibliotecas como Tailwind CSS/Styled Components, dependendo das escolhas de design do projeto.
*   **Interação com o Backend**: As requisições HTTP para o backend são realizadas utilizando a biblioteca `axios`, geralmente encapsuladas em arquivos de serviço para manter a lógica de API separada dos componentes.

---
