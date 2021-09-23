/* Funções Middleware que serão usadas pelo Express
 *
 * Body Parser  : Facilta leitura dos dados enviados via HTML
 * CORS         : Permite respota a outras aplicações
 * 
 *  -------- Arquivo importado pelo Consign  --------
*/

const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => {
    //Importação do Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    //Importação do CORS
    app.use(cors())
}