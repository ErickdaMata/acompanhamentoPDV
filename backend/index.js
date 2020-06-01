/* Arquivo principal da aplicação backend
 *
 * Variável Global para Desenvolvimento 
 * porta        : Porta para receber requisições
 * 
 * Módulos do Node
 * Express      : Módulo resposável pelos Middlewares e Rotas
 * Consign      : Carregamento automático de script modularizados
 * 
*/
const porta = 9000

//Modulos do Node
const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
app.db = db

consign()
    .include('./config/passport.js')
    .then('./dev.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/rotas.js')
    .into(app)

app.listen(porta, () => console.log(`Executando na porta ${porta}`))