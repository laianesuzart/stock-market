# Stock Market

## 📖 Visão Geral

O **Stock Market** é uma aplicação web moderna desenvolvida para consultar e visualizar o histórico de preços de fechamento de ativos financeiros. Com uma interface limpa e intuitiva, o projeto permite que o usuário selecione múltiplos ativos e defina um período de tempo específico para gerar gráficos.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com uma stack robusta e moderna:

*   **[React 19](https://react.dev/)**: Biblioteca JavaScript para construção de interfaces reativas.
*   **[Vite](https://vitejs.dev/)**: Build tool que proporciona um ambiente de desenvolvimento extremamente rápido.
*   **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework CSS utilitário para estilização rápida e consistente.
*   **[TanStack Router](https://tanstack.com/router/latest)**: Solução de roteamento type-safe, garantindo navegação segura e previsível.
*   **[Apache ECharts](https://echarts.apache.org/)**: Biblioteca poderosa de visualização de dados para criação de gráficos detalhados.
*   **[Biome](https://biomejs.dev/)**: Toolchain de alta performance para linting e formatação de código.
*   **[pnpm](https://pnpm.io/pt/)**: Gerenciador de pacotes eficiente que economiza espaço em disco e acelera instalações.
*   **[zod](https://zod.dev/)**: Biblioteca de declaração e validação de schemas TypeScript-first.
*   **[ky](https://github.com/sindresorhus/ky)**: Cliente HTTP leve baseado em Fetch API.

## 📋 Pré-requisitos

Para executar este projeto, certifique-se de ter instalado em sua máquina:

*   **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript (versão LTS recomendada).
*   **[pnpm](https://pnpm.io/)**: Gerenciador de pacotes utilizado no projeto.

## 🔧 Instalação e Configuração

Siga os passos abaixo para configurar e executar a aplicação localmente:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/laianesuzart/stock-market.git
    cd stock-market
    ```

2.  **Instale as dependências:**

    ```bash
    pnpm install
    ```

3.  **Configure as Variáveis de Ambiente:**

    Crie um arquivo `.env` na raiz do projeto copiando o exemplo fornecido:

    ```bash
    cp .env.example .env
    ```

    O arquivo `.env` deve conter a URL base da API (ex: `VITE_STOCK_API_BASE_URL`).

4.  **Execute o servidor de desenvolvimento:**

    ```bash
    pnpm dev
    ```

    A aplicação estará acessível em `http://localhost:3000`.

