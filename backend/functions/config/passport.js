/* Importações necessárias para o Passport controlar a sessão
 * 
 * Auth Secret  : Contém a chava utilizada na criptografia do Token
 * Passport     : Middleware de autenticação
 * Passport JWT : Módulo do Passport para permitir autenticação por JSON Web Token
 *  - Strategy  : Função para estabelecer a estratégia de validaçao do Login
 *  - ExtractJwt: Função para extrair o Token do cabeçalho 'Authentication': Bearer Token
 * 
 *  -------- Arquivo importado pelo Consign  --------
*/
const {authSecret} = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done)=>{
        
        app.db.getUsuarioById( payload.id )
            .then(user => {
                done(null, user? {...payload} : null)})
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', {session: false})
    }
}