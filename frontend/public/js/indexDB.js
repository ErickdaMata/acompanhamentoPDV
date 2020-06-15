const nomeDB = 'pwaStore'
const dbStoreToken = 'token'
const dbStoreBS = 'relatorios'
const versaoDB = '1'

const indexDB = idb.open(nomeDB, versaoDB, (db)=>{
        
        if(!db.objectStoreNames.contains(dbStoreToken)) {
            console.log('indexDB criou ', dbStoreToken)
            db.createObjectStore(dbStoreToken, {keyPath: 'id'})
        }
        if('SyncManager' in window){
            if(!db.objectStoreNames.contains(dbStoreBS)) {
                console.log('indexDB criou ', dbStoreBS)
                db.createObjectStore(dbStoreBS, {keyPath: 'nome'})
            }
        }
    })

const armazenarIndexDB = function(idStore, data) {
    return indexDB
        .then( (db) =>{
            console.log('indexDB armazenou:', data)
            const transacao = db.transaction(idStore, 'readwrite')
            const store = transacao.objectStore(idStore)
            store.put(data)
            return transacao.complete
        })    
}

const obterIndexDB = function (idStore) {
    return indexDB
        .then( (db) => {
            console.log('[indexDB] leitura dos dados:', idStore)
            const transacao = db.transaction(idStore, 'readonly')
            const store = transacao.objectStore(idStore)
            return store.getAll()
        })
}

const limparIndexDB = function(idStore) {
    return indexDB
        .then( (db) =>{
            console.log('indexDB apagou os dados')
            const transacao = db.transaction(idStore, 'readwrite')
            const store = transacao.objectStore(idStore)
            store.clear()
            return transacao.complete
        })    
}

exports = {armazenarIndexDB, obterIndexDB}