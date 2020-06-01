module.exports = app => {
    const buscarFTP = (req, res)=> {
        res.send('Deu certo')
    }

    return {buscarFTP}
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