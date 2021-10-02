// Definicoes do Banco de Dados
const nomeDB = 'pwaStore'
const idbToken = 'token'
const idbRelatorios = 'relatorios'
const versaoDB = '1'

// Abertura da conexao com Banco de Dados
const indexDB = idb.open(nomeDB, versaoDB, (db)=>{

        // Caso nao exita a colecao que armazena o Token
        if(!db.objectStoreNames.contains(idbToken)) {
            // Cria a colecao
            db.createObjectStore(idbToken, {keyPath: 'id'})
        }
        // Caso exista a funcao de sincronizacao em segundo plano
        if('SyncManager' in window){

            // E a colecao para relatórios ainda nao exista
            if(!db.objectStoreNames.contains(idbRelatorios)) {
                // Cria a colecao que sera usada pelo Service Worker para
                // armazenamento dos relatórios no evento 'backsync'
                db.createObjectStore(idbRelatorios, {keyPath: 'apelido'})
            }
        }
    })


// Armazena dados em uma colecao
const armazenarIndexDB = function (idStore, data) {
    // Retorna um objeto IndexedDB para permitir encadeamento de chamadas
    return indexDB
        // Encademaneto da Promise
        .then( (db) =>{
            // Define uma transacao
            const transacao = db.transaction(idStore, 'readwrite')
            // Define a transacao para uma colecao
            const store = transacao.objectStore(idStore)
            // Armazena o dado
            store.put(data)
            // Return somente sera efetuado em caso de sucesso,
            // passando para a Promise o resultado positivo
            // '.complete' para a propriedade do objeto db.transaction
            return transacao.complete
        })    
}

// Leitura da informacao armazenada no IndexedDB
const obterIndexDB = function (idStore) {
    // Retorna um objeto IndexedDB para permitir encadeamento de chamadas
    return indexDB
        // Encademaneto da Promise
        .then( (db) => {
            // Define uma transacao
            const transacao = db.transaction(idStore, 'readonly')
            // Define a transacao para uma colecao
            const store = transacao.objectStore(idStore)
            // Obtem todas as informacões armazenadas na colecao
            return store.getAll()
        })
}


// Liberar o IndexedDB
const limparIndexDB = function (idStore) {
    // Retorna um objeto IndexedDB para permitir encadeamento de chamadas
    return indexDB
        // Encademaneto da Promise
        .then( (db) =>{
            // Define uma transacao
            const transacao = db.transaction(idStore, 'readwrite')
            // Define a transacao para uma colecao
            const store = transacao.objectStore(idStore)
            // Executa a transacao
            store.clear()
            // Return somente sera efetuado em caso de sucesso,
            // passando para a Promise o resultado positivo
            // '.complete' para propriedade do objeto db.transaction
            return transacao.complete
        })    
}