/* Arquivo de funcionalidades do Banco
 *
 * Modulo       : Descrição da Funcionalidade
 * 
 *  -------- Arquivo importado pelo Consign  --------
 *  Para possibilitar a conexão com DB durante o desenvolvimento:
 *      const serviceAccount = require("path/to/pdv-estagio-firebase-adminsdk-63t5t-b71bd47143.json")
 *      admin.initializeApp({
 *          credential: admin.credential.cert(serviceAccount),
 *          databaseURL: "https://pdv-estagio.firebaseio.com"
 *      }); 
*/

const admin = require("firebase-admin")

admin.initializeApp(); 

const usuarios = admin.firestore().collection('db')
const relatorios = admin.firestore().collection('rel')

//Implementação da troca de informações com DB.

const getUsuario = (usuarioDigitado) => {
    //Retorna uma Promise que será invocada pelo Auth
    return new Promise(function (resolve, reject) {
        
            //Inicia uma nova consulta com o DB Firestore
            //Query: obter o UID (User ID) '==' ao param usuarioDigitado
            const query = usuarios.where('uid', '==', usuarioDigitado).get()
                            //A quary retorna um objeto snapshot com todos os matches
                            .then(snapshot => {
                                //Caso não haja usuário
                                if (snapshot.empty) {
                                    //Retorna a Promise como 'null'
                                    resolve(null)
                                }
                                //Se houver match na snapshot
                                const resultado = []
                                //Para cada match da lista
                                snapshot.forEach(doc => {
                                    //inclui o usuário no Array 'resultado'
                                    //** Necessário para passagem correta de dados
                                    resultado.push(doc.data())
                                });
                                //Retorna apenas o primeiro elemento
                                return resultado[0]
                            })
                            //O usuário recuperado é passado para Promise final
                            .then(usuarioDB => {
                                //Um novo objeto usuário é criado com os dados retornados
                                const usuario = {
                                    id: usuarioDB.uid,
                                    senha: usuarioDB.key
                                    }
                                //O usuário buscado do DB é retornado
                                resolve(usuario)
                            })
                            .catch(err => {
                                //Qualquer erro é retornado como 'null'
                                console.log('Error getting documents', err);
                                resolve(null)
                            });
        } 
    )   
}

const getRelatorios = (codigoUsuario) => {
    
    return new Promise(function (resolve, reject) {
        relatorios.doc(codigoUsuario).get()
        .then(doc => {
            if(!doc.exists){
                reject('Dados não encontrados')
            }
            else {
                resolve(doc.data())
            }
        })
    })
}

module.exports = {getUsuario, getRelatorios}