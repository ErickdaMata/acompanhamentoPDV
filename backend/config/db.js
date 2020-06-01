/* Arquivo de funcionalidades do Banco
 *
 * Modulo       : Descrição da Funcionalidade
 * 
 *  -------- Arquivo importado pelo Consign  --------
*/

//Implementação da troca de informações com DB.

//****Mock de funcionalidade: Recuperar Usuário
const getUsuario = (id) => {
    return new Promise(function (resolve, reject) {
        if (id === 'abc'){
            const usuario = {}
                usuario.id = id
                usuario.senha = '123'
    
            resolve(usuario)
        }
        else
            resolve(null)
        }
    )
}
module.exports = {getUsuario}