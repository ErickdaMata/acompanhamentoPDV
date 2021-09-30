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

    const signin = async (req, res) => {
        
        //Caso usuário ou senha não sejam informados
        if(!req.body.user || !req.body.senha)
            //Retorna erro 400 (Bad Request)
            return res.status(400).send('Usuário ou senha não informados')
            
        //Recupera o(s) usuário(s) da coleção 'gerente' com match em 'usuário'
        const users = await app.db.getUsuarios(req.body.user)
            
        // Caso não exista um usuário com este nome do DB
        if(!users) 
            // Retorna erro 400 (Bad Request)
            return res.status(400).send('Usuário não encontrado.')

        // Esta função realiza a validação do usuario e senha digitados,
        // comparando os campos concatenados. Caso coincidam, retorna o
        // 'id' do documento.
        // Esta é uma função autoinvocada, note "()" após as chaves
        const recuperaId = function() {
            
            // Assume que não há ID
            let id = false

            // Concatenha dos campos recebidos para comparação
            const usuarioSenhaDigitado = ''.concat(req.body.user, req.body.senha)
            
            // Compara usuario e senha concatenados para todos os documentos
            users.forEach(gerente => {
                
                // Caso coincidam
                if(usuarioSenhaDigitado == gerente.usuariosenha){
                    // Estabelece que este será o ID retornado
                    id = gerente.id
                    return id
                }
            })
            
            //Caso não haja coincidência dos campos, retorna 'false'   
            return id
        }()
        
        // recuperaId conterá um ID ou 'false'
        if(!recuperaId)
            //Retorna erro 400 (Bad Request)
            return res.status(400).send('Senhas não conferem.')
        
        /* Neste ponto o usuário e senhas foram validados
        Inicia a geração do Token */
        //Tempo atual em segundos
        const now = Math.floor(Date.now()/1000)

        //PAYLOAD
        const payload = {
            id: recuperaId,
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