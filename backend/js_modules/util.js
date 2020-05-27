const recuperarRelatorio = require('./recuperarRelatorio')

module.exports = async function criarSessao(usuario, senha){
    try {
        const estado = await validarLogin(usuario, senha).then(estado => estado)
        let relatorio = ''
        if(estado === 'true'){
            relatorio = await recuperarRelatorio(usuario).then(relatorio => relatorio)
        }
        const sessao = {
            estado,
            relatorio
        }
        return sessao
    } catch (erro) {
        console.log(erro)
        return {}
    }
}

function validarLogin(usuario, senha){
    return new Promise((resolve, reject) => {
        console.log(`Usuario ${usuario} | senha ${senha}`)
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