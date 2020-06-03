//const servidor = require('serverFTP')

module.exports = app => {
    const buscarRelatorios = (req, res)=> {
        const lista = {
            empresas : [
                {nome: 'XPTO', rel: 'texto do relatorio da empresa XPTO'},
                {nome: 'Acme Ltda.', rel: 'texto do relatorio da empresa Acme'}
            ]
        }
        res.send(lista)
    } 

    return {buscarRelatorios}
}

/* const fs = require('fs')
const _path = require('path')

module.exports = async function recuperarRelatorio(usuario) {
    return new Promise((resolve, reject) => {
        //usuario = 'abc'
        const caminho = _path.join(__dirname, '../') + `/relatorios/${usuario}.txt`
        
        return fs.readFile(caminho, 'utf-8', (err, conteudo) => {
            if(err) {
                reject(err)
            } else {
                resolve(conteudo)
            }
        })
    })
} */