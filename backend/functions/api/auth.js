/* Interface de Autenticação
 * 
 * Auth Secret  : Contém a chava utilizada na criptografia do Token
 * JWT Simple   : Módulo para encode e decode de JWT
 * 
 *  -------- Arquivo importado pelo Consign  --------
*/
const {authSecret, expTime} = require ('../.env')
const jwt = require('jwt-simple')

module.exports = app => {
    //DEV: Simplificação do console.log

    const signin = async (req, res) => {
        
        //Caso usuário ou senha não sejam informados
        if(!req.body.user || !req.body.senha)
            //Retorna erro 400 (Bad Request)
            return res.status(400).send('Usuário ou senha não informados')
            
        //Recupera o usuário a partir do DB apartir do nome de usuário
        const user = await app.db.getUsuario(req.body.user)
            
        //Caso não exista um usuário com este nome do DB
        if(!user) 
            //Retorna erro 400 (Bad Request)
            return res.status(400).send('Usuário não encontrado.')

        //Após recuperar a senha do DB, valida comparando com a recebida
        const validouSenha = function() {
            return (req.body.senha == user.senha)? true : false
        }()

        //Caso a senha não seja válida
        if(!validouSenha)
            //Retorna erro 400 (Bad Request)
            return res.status(400).send('Senhas não conferem.')
        
        /* Neste ponto o usuário e senhas foram validados
        Inicia a geração do Token */
        //Tempo atual em segundos
        const now = Math.floor(Date.now()/1000)

        //PAYLOAD
        const payload = {
            id: user.id,
            iat: now,
            exp: now + (expTime)
        }
        
        //Responde ao usuário com o Payload e Token
        //Status 201 (Success: Created)
        res.status(201).json({
            ...payload,
            //Gera o JWT utilizando o authSecret como chave
            token: jwt.encode(payload, authSecret)
        })
    }

    //Função para validação do Token sem passar pelo Passport
    const validateToken = async (req, res) =>{
        //Dados enviados são recuperados, ou é atribuído null
        const userData = req.body || null
        try {
            //Nenhum tratamento é feito se não houver dados na requisição
            if(userData){
                //PAYLOAD será obtido decodificando o Token com a Auth Secret
                const token = jwt.decode(userData.token, authSecret)
                //Somente se o tempo(millis) de expiração for maior que a tempo atual
                if((token.exp * 1000) > Date.now()){
                    //Valida respondendo 'true' a solicitação
                    return res.send(true)
                }
            }
        } catch (error) {
            //Problemas com a validação do Token           
        }
        //Qualquer outra possibilidade é respondida como 'false'
        res.send(false)
    }

    return {signin, validateToken}
}