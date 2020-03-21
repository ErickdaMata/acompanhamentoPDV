const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.static('./app'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

//app.get('/teste', (req, res) => {res.send('Ok')})

app.post('/login', (req, res) => {
    const usuario = (req.body.usuario)   
    const senha = (req.body.senha)
    const sessao = {}
    sessao.estado = validarLogin (usuario, senha)
    res.send(sessao)
})

function validarLogin(usuario, senha){
    if((usuario === '123') && (senha === 'abc')){
        console.log("usuario ok")
        return 'true'
    }
    else {
        console.log("usuario negado")
        return '!user'
    }
}

function retornarTexto() {

    caminho = __dirname + '/relatorios/relatorio.txt'

    fs.readFile(caminho, 'utf-8', (err, conteudo) => {
    const texto = conteudo
    return texto
})
}


const porta = 8080
app.listen(porta, () => console.log(`Executando na porta ${porta}`))