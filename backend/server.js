//Variáveis globais de ambiente
let sessao = {}
const porta = 8080

//Modulos do servidor
const criarSessao = require('./js_modules/util.js')
const v = require('./js_modules/dev.js')
const auth = require('./js_modules/auth')

//Modulos do Node
const bodyParser = require('body-parser')
const path = require('path')
const express = require('express')
const app = express()

//Atribuição do Middleware Express
app.use(express.static(path.join(__dirname, '../') + './frontend'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
//app.use(auth(sessao))

//Rota de Login
app.post('/login', async (req, res) => {
    const usuario = (req.body.usuario)   
    const senha = (req.body.senha)
    sessao = await criarSessao(usuario, senha)
    v('Sessão foi requisitada')
    v(sessao)
    res.send(sessao)
})

app.get()

app.listen(porta, () => console.log(`Executando na porta ${porta}`))