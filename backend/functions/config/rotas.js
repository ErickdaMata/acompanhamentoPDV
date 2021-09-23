/* Arquivo de rotas utilizado pelo Express
 *
 *    Não são necessárias importações neste arquivo, as
 * dependências do Middleware são importadas no arquivo
 * de configuração 'middlewares.js'.
 * 
 *  -------- Arquivo importado pelo Consign  --------
*/

module.exports = app => {
    //Rota Home (Login)
    app.route('/')
        .post(app.api.auth.signin)
    
    //Rota de validação do Token sem passar pelo Passport
    app.route('/val')
        .post(app.api.auth.validateToken)
    
    //Rota de acesso aos relatórios
    app.route('/relatorios')
        .all(app.config.passport.authenticate())
        .post(app.api.relatorio.buscarRelatorios)
}
