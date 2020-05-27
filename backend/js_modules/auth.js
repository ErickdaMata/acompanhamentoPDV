module.exports = function (sessao) {
    return function (req, res, next){
        sessao.usuario = (req.body.usuario)   
        sessao.senha = (req.body.senha)
        console.log("AUTH - Dados: ", sessao.usuario, sessao.senha)
        if (sessao.estado !== true){
            req.body.estado = validarLogin(sessao.usuario, sessao.senha)
            sessao.estado = validarLogin(sessao.usuario, sessao.senha)
        }
        next()
    }
}

function validarLogin(usuario, senha){
        if (!usuario && !senha) {
            console.log('AUTH - sessao não iniciada')
            return
        }
        if((usuario === '123') && (senha === 'abc')){
            console.log("AUTH - usuario ok")
            return 'true'
        }
        else {
            console.log("AUTH - usuario negado")
            return '!user'
        }
}