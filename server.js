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
    criarSessao(usuario, senha).then(sessao => res.send(sessao))
})

async function criarSessao(usuario, senha){
    try {
        const estado = await validarLogin(usuario, senha).then(estado => estado)
        const cliente = await retornarCliente(usuario).then(cliente => cliente)
        const sessao = {
            estado,
            cliente
        }
        return sessao
    } catch (erro) {
        console.log(erro)
    }
}

async function retornarCliente(codigoCliente) {
    try {
        const relatorio = await retornarTexto(codigoCliente)
        const atualizacao = 'Posição de saldos às 13:32'
        const saldo = 'R$ 2.708,45'
        const cliente = {
            relatorio,
            atualizacao,
            saldo
        }
        return cliente
    } catch (erro) {
        console.log(erro)
    }
}

function retornarTexto(usuario) {
    return new Promise((resolve, reject) => {
        const caminho = __dirname + `/relatorios/${usuario}.txt`
        
        return fs.readFile(caminho, 'utf-8', (err, conteudo) => {
            if(err) {
                reject(err)
            } else {
                resolve(conteudo)
            }
        })
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