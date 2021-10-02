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
            const query = gerentes
                            .where('USUARIO', '==', usuarioDigitado)
                            .get()
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
                                resolve(null)
                            });
        } 
    )   
}

const getUsuarioById = (id) => {
    
    //Retorna uma Promise que será invocada pelo Auth
    return new Promise(function (resolve, reject) {
        
        // inicia uma direta na coleção, utilizando o Id
        const docId = gerentes.doc(id).get()
                        .then(doc => {
                            // Caso o documento seja encontrado
                            if(doc.exists) {
                                // Extrai os dados do documento
                                return(doc.data())    
                            }
                            // Caso não haja correspondência, o erro é
                            // lançado e a Promise finalizada.
                            throw new Error('Id não encontrado.')
                        })
                        .then(gerente => {
                            //Um novo objeto usuário é criado com os dados retornados
                            const usuario = {
                                id: gerente.USUARIO,
                                senha: gerente.SENHA
                                }
                                
                            //O gerente buscado do DB é retornado como 'usuario'
                            resolve(usuario)
                        })
                        .catch( erro => {
                            //Qualquer erro é retornado como 'null'
                            resolve(null)
                        })
        } 
    )   
}

const getRelatorios = (gerenteAutorizado) => {
    
    return new Promise(function (resolve, reject) {
       
        const query = lojas.where('GERENTE_ID', 'array-contains', gerenteAutorizado)
                            .get()
                            .then(snapshot => {
                                
                                //Caso não haja documentos no snapshot
                                if (snapshot.empty) {
                                    throw new Error('Não há relatórios para este ID.')
                                }

                                // Se houver match na snapshot,
                                // Cria um novo array para acumular os documentos
                                const relatorios = []

                                //Para cada documento do match
                                snapshot.forEach(doc => {
                                    // Inclui todos os documentos no Array 'resultados'
                                    //** Necessário para passagem correta de dados
                                    const relatorio = {
                                        apelido: doc.data().APELIDO,
                                        dth: doc.data().DTH_UPLOAD,
                                        rel: doc.data().REL,
                                    }
                                    
                                    relatorios.push(relatorio)
                                });
                                
                                //Retorna o array de documentos
                                return relatorios
                            })
                            .then(resposta => resolve(resposta))
                            .catch( erro => {
                                //Qualquer erro é retornado como 'null'
                                resolve(null)
                            })
    })
}

module.exports = {getUsuarios, getUsuarioById, getRelatorios}