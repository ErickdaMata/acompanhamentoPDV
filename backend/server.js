const criarSessao = require('./js_modules/util.js')
const v = require('./js_modules/dev.js')

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
let sessao = {}

app.use(express.static('./app'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.post('/login', async (req, res) => {
    const usuario = (req.body.usuario)   
    const senha = (req.body.senha)
    sessao = await criarSessao(usuario, senha)
    v('Sessão foi requisitada')
    v(sessao)
})

//app.get()

const porta = 8080
app.listen(porta, () => console.log(`Executando na porta ${porta}`))