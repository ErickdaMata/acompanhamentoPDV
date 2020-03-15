const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.get('/teste', (req, res) => {res.send('Ok')})

/* app.get('/relatorio', (req, res) => {
    console.log('recebi')
    res.send('texto')
    })  */

const porta = 8080
app.listen(porta, () => console.log(`Executando na porta ${porta}`))

function retornarTexto() {
    const fs = require('fs')

    caminho = __dirname + '/relatorio.txt'

    fs.readFile(caminho, 'utf-8', (err, conteudo) => {
    const texto = conteudo
    return texto
})
}