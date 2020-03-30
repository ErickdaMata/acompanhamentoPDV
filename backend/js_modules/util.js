const fs = require('fs')

module.exports = async function criarSessao(usuario, senha){
    try {
        const estado = await validarLogin(usuario, senha).then(estado => estado)
        const cliente = await recuperarCliente(usuario).then(cliente => cliente)
        const sessao = {
            estado,
            cliente
        }
        return sessao
    } catch (erro) {
        console.log(erro)
        return {}
    }
}

async function recuperarCliente(codigoCliente) {
    try {
        const relatorio = await recuperarRelatorio(codigoCliente)
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

function recuperarRelatorio(usuario) {
    return new Promise((resolve, reject) => {
        usuario = 'abc'
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