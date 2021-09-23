# acompanhamentoPDV

*Progressive Web Application* para múltiplos dispositivos para acesso via HTTPS a visão resumida de relatórios de caixa.

Projeto *Full Stack* utilizando a plataforma **Firebase**:

O *Frontend* construído em Vue com controle de estados via Vuex, rotas pelo Vue Router e plugin Vuetify para interface baseada em *material design*. Aplicação web hospedada via **Firabase Storage**, contruída para utilzação em múltiplas plataformas, com implementação de *polyfills* via Babel, ES6-Promise, idb.

*Backend* em arquitetura *serverless* via **Firebase Cloud Functions**; padrão *middleware* via Express; utilização de Passport e estratégia JWT para gerenciamento de *token*; banco de dados NoSQL **Firestore** gerenciado diretamente pelo servidor Node.js.

[Documentação completa do projeto](https://drive.google.com/open?id=1ZRPDh-EalHZZwp_FXcJ08iOmdKjaar2cFFuIVSOOrWI)

----------------------------------------------------------------
# Referências Básicas

## Para FRONTEND:
Utilizar **NPM** para NodeJS

Recomendado controle de versão via **NVM**.
[NVM para Windows](https://github.com/coreybutler/nvm-windows)

`
Executar prompt de comando a partir da pasta /frontend
`

### Baixar dependências
```
npm install
```

### Compilação durante desenvolvimento (hot-reloads)
```
npm run serve
```

### Compilação para produção
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


----------------------------------------------------------------


## Para BACKEND:
Utilizar NPM para NodeJS e Firebase Tools

`
Executar prompt de comando a partir da pasta /backend/functions
`

### Instalar Firebase Tools e inicializar o projeto
```
npm install -g firebase-tools
```
```
firebase init
```

### Compilação durante desenvolvimento (hot-reloads)
```
npm run serve
```

### Compilação para produção
```
npm run deploy
```

## Para informações detalhadas, acesse a [documentação completa do projeto](https://drive.google.com/open?id=1ZRPDh-EalHZZwp_FXcJ08iOmdKjaar2cFFuIVSOOrWI)
