# 🔮 Age Estimator - Estimador de Idade

Uma aplicação web moderna desenvolvida com **Svelte 5** e **SvelteKit** que consome a API pública [agify.io](https://agify.io/) para estimar a idade com base em um nome informado pelo usuário.

## 📋 Sobre o Projeto

Esta aplicação foi desenvolvida como parte de um teste técnico para demonstrar habilidades em:

- **Svelte 5** com a nova sintaxe de runes (`$state`, `$props`, `$effect`)
- **SvelteKit** para roteamento e server-side rendering
- **TypeScript** para tipagem estática
- **CSS puro** para estilização responsiva
- Consumo de APIs externas
- Debounce para otimização de requisições
- Sincronização de estado com URL

## ✨ Funcionalidades

- 🔍 **Busca em tempo real**: Digite um nome e veja a idade estimada automaticamente
- ⏱️ **Debounce inteligente**: Evita requisições excessivas com delay de 500ms
- 🔗 **URLs compartilháveis**: Acesse diretamente `/?name=Michael` para ver resultados
- 📱 **Design responsivo**: Interface adaptada para desktop e mobile
- 🎨 **Visual moderno**: Gradientes, animações e efeitos visuais
- ⚡ **Performance otimizada**: Carregamento rápido e suave
- 🛡️ **Tratamento de erros**: Feedback claro em caso de problemas

## 🚀 Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- npm, pnpm ou yarn

### Instalação

1. **Clone o repositório** (se aplicável):

   ```bash
   git clone <url-do-repositorio>
   cd voltera-frontend-test
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

   Ou com pnpm:

   ```bash
   pnpm install
   ```

   Ou com yarn:

   ```bash
   yarn install
   ```

### Executando em Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Ou para abrir automaticamente no navegador:

```bash
npm run dev -- --open
```

A aplicação estará disponível em: **http://localhost:5173/**

### Comandos Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run check` - Verifica tipos TypeScript
- `npm run lint` - Executa linting do código
- `npm run format` - Formata o código com Prettier

## 🚀 Deploy em Produção

Para fazer deploy da aplicação:

1. **Gere o build de produção**:

   ```bash
   npm run build
   ```

2. **Teste localmente**:

   ```bash
   npm run preview
   ```

3. **Configure um adaptador** para sua plataforma de deploy (Vercel, Netlify, etc.)

> Para mais informações sobre adapters, consulte a [documentação do SvelteKit](https://svelte.dev/docs/kit/adapters).

## 📄 Licença

Este projeto é de uso educacional e demonstrativo.
