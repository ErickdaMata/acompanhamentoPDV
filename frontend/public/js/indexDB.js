// Definições do Banco de Dados
const nomeDB = 'pwaStore'
const dbStoreToken = 'token'
const dbStoreBS = 'relatorios'
const versaoDB = '1'

// Abertura da conexão com Banco de Dados
const indexDB = idb.open(nomeDB, versaoDB, (db)=>{

        // Caso não exita a coleção que armazena o Token
        if(!db.objectStoreNames.contains(dbStoreToken)) {
            // Cria a coleção
            db.createObjectStore(dbStoreToken, {keyPath: 'id'})
        }
        // Caso exista a função de sincronização em segundo plano
        if('SyncManager' in window){

            // E a coleção para relatórios ainda não exista
            if(!db.objectStoreNames.contains(dbStoreBS)) {
                // Cria a coleção que será usada pelo Service Worker para
                // armazenamento dos relatórios no evento 'backsync'
                db.createObjectStore(dbStoreBS, {keyPath: 'nome'})
            }
        }
    })


// Armazena dados em uma coleção
const armazenarIndexDB = function (idStore, data) {
    // Retorna um objeto IndexedDB para permitir encadeamento de chamadas
    return indexDB
        // Encademaneto da Promise
        .then( (db) =>{
            // Define uma transação
            const transacao = db.transaction(idStore, 'readwrite')
            // Define a transação para uma coleção
            const store = transacao.objectStore(idStore)
            // Armazena o dado
            store.put(data)
            // Return somente será efetuado em caso de sucesso,
            // passando para a Promise o resultado positivo
            // '.complete' é propriedade do objeto db.transaction
            return transacao.complete
        })    
}

// Leitura da informação armazenada no IndexedDB
const obterIndexDB = function (idStore) {
    // Retorna um objeto IndexedDB para permitir encadeamento de chamadas
    return indexDB
        // Encademaneto da Promise
        .then( (db) => {
            // Define uma transação
            const transacao = db.transaction(idStore, 'readonly')
            // Define a transação para uma coleção
            const store = transacao.objectStore(idStore)
            // Obtém todas as informações armazenadas na coleção
            return store.getAll()
        })
}


// Liberar o IndexedDB
const limparIndexDB = function (idStore) {
    // Retorna um objeto IndexedDB para permitir encadeamento de chamadas
    return indexDB
        // Encademaneto da Promise
        .then( (db) =>{
            // Define uma transação
            const transacao = db.transaction(idStore, 'readwrite')
            // Define a transação para uma coleção
            const store = transacao.objectStore(idStore)
            // Executa a transação
            store.clear()
            // Return somente será efetuado em caso de sucesso,
            // passando para a Promise o resultado positivo
            // '.complete' é propriedade do objeto db.transaction
            return transacao.complete
        })    
}