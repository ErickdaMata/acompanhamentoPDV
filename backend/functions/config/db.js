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

const gerentes = admin.firestore().collection('gerente')
const lojas = admin.firestore().collection('loja')

//Implementação da troca de informações com DB.

const getUsuarios = (usuarioDigitado) => {
    
    //Retorna uma Promise que será invocada pelo Auth
    return new Promise(function (resolve, reject) {
        
            // Inicia uma nova consulta com o DB Firestore
            // Query: obter documentos cuja chave USUARIO contém o valor igual a usuarioDigitado
            // O resultado é um ou mais documentos (ou registros do banco 'gerente')
            const query = gerentes.where('USUARIO', '==', usuarioDigitado).get()
                            //A query retorna um objeto snapshot com todos os matches
                            .then(snapshot => {
                                
                                //Caso não haja documentos no snapshot
                                if (snapshot.empty) {
                                    //Retorna a Promise como 'null'
                                    resolve(null)
                                }

                                // Se houver match na snapshot,
                                // Cria um novo array para acumular os documentos
                                const resultados = []

                                //Para cada documento do match
                                snapshot.forEach(doc => {
                                    // Inclui todos os documentos no Array 'resultados'
                                    //** Necessário para passagem correta de dados
                                    
                                    const usuario = {
                                        id: doc.id,
                                        usuariosenha: ''.concat(doc.data().USUARIO,
                                                                doc.data().SENHA)
                                    }

                                    resultados.push(usuario)
                                });

                                //Retorna o array de documentos
                                return resultados
                            })
                            //O(s) documento(s) recuperado(s) é(são) passado(s) para Promise final
                            .then(recuperados => {
                                
                                // A resposta conterá todos os usuários encontrados nos
                                // documentos que atendem o filtro. 
                                resolve(recuperados)
                            })
                            .catch(err => {
                                //Qualquer erro é retornado como 'null'
                                console.log('Erro ao recuperar documentos: ', err);
                                resolve(null)
                            });
        } 
    )   
}

const getRelatorios = (codigoUsuario) => {
    
    return new Promise(function (resolve, reject) {
        lojas.doc(codigoUsuario).get()
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

module.exports = {getUsuarios, getRelatorios}