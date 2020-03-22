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
    const sessao = criarSessao(usuario, senha).then(s => s)
    console.log("SESSAO", sessao, Date.now())
    res.send(sessao)
})

async function criarSessao(usuario, senha){
    const estado = await validarLogin(usuario, senha).then(e => e)
    const cliente = "await retornarCliente(usuario)"
    console.log('criou o cliente', Date.now())
    const sessao = {
        estado,
        cliente
    }
    console.log('retornou retornou sessão', Date.now())
    console.log('sessao', sessao)
    return sessao
}

function retornarCliente(codigoCliente) {
    const relatorio = retornarTexto('abc')
    console.log('inseriu texto no objeto', Date.now())
    const sincronizacao = ''
    const total = ''
    const cliente = {
        relatorio,
        sincronizacao,
        total
    }
    console.log('retornou retornou cliente', Date.now())
    return cliente
}

function retornarTexto(usuario) {
    
    const caminho = __dirname + `/relatorios/${usuario}.txt`
    
    return fs.readFile(caminho, 'utf-8', (err, conteudo) => {
        if(err) {
            console.log(err)
        } else {
            console.log('LEU O TEXTO', Date.now())
            return conteudo
        }
    })
}

function validarLogin(usuario, senha){
    return new Promise((resolve, reject) => {
        if((usuario === '123') && (senha === 'abc')){
            resolve('true')
            console.log("usuario ok")
        }
        else {
            resolve('!user')
            console.log("usuario negado")
        }
    })
}

const porta = 8080
app.listen(porta, () => console.log(`Executando na porta ${porta}`))