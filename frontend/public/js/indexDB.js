// Defini��es do Banco de Dados
const nomeDB = 'pwaStore'
const dbStoreToken = 'token'
const dbStoreBS = 'relatorios'
const versaoDB = '1'

// Abertura da conex�o com Banco de Dados
const indexDB = idb.open(nomeDB, versaoDB, (db)=>{

        // Caso n�o exita a cole��o que armazena o Token
        if(!db.objectStoreNames.contains(dbStoreToken)) {
            // Cria a cole��o
            db.createObjectStore(dbStoreToken, {keyPath: 'id'})
        }
        // Caso exista a fun��o de sincroniza��o em segundo plano
        if('SyncManager' in window){

            // E a cole��o para relat�rios ainda n�o exista
            if(!db.objectStoreNames.contains(dbStoreBS)) {
                // Cria a cole��o que ser� usada pelo Service Worker para
                // armazenamento dos relat�rios no evento 'backsync'
                db.createObjectStore(dbStoreBS, {keyPath: 'nome'})
            }
        }
    })


// Armazena dados em uma cole��o
const armazenarIndexDB = function (idStore, data) {
    // Retorna um objeto IndexedDB para permitir encadeamento de chamadas
    return indexDB
        // Encademaneto da Promise
        .then( (db) =>{
            // Define uma transa��o
            const transacao = db.transaction(idStore, 'readwrite')
            // Define a transa��o para uma cole��o
            const store = transacao.objectStore(idStore)
            // Armazena o dado
            store.put(data)
            // Return somente ser� efetuado em caso de sucesso,
            // passando para a Promise o resultado positivo
            // '.complete' � propriedade do objeto db.transaction
            return transacao.complete
        })    
}

// Leitura da informa��o armazenada no IndexedDB
const obterIndexDB = function (idStore) {
    // Retorna um objeto IndexedDB para permitir encadeamento de chamadas
    return indexDB
        // Encademaneto da Promise
        .then( (db) => {
            // Define uma transa��o
            const transacao = db.transaction(idStore, 'readonly')
            // Define a transa��o para uma cole��o
            const store = transacao.objectStore(idStore)
            // Obt�m todas as informa��es armazenadas na cole��o
            return store.getAll()
        })
}


// Liberar o IndexedDB
const limparIndexDB = function (idStore) {
    // Retorna um objeto IndexedDB para permitir encadeamento de chamadas
    return indexDB
        // Encademaneto da Promise
        .then( (db) =>{
            // Define uma transa��o
            const transacao = db.transaction(idStore, 'readwrite')
            // Define a transa��o para uma cole��o
            const store = transacao.objectStore(idStore)
            // Executa a transa��o
            store.clear()
            // Return somente ser� efetuado em caso de sucesso,
            // passando para a Promise o resultado positivo
            // '.complete' � propriedade do objeto db.transaction
            return transacao.complete
        })    
}