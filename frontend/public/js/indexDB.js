const nomeDB = 'pwaStore'
const dbStoreBS = 'token'
const versaoDB = '1'

const indexDB = idb.open(nomeDB, versaoDB, (db)=>{
        console.log('indexDB criou')
        if(!db.objectStoreNames.contains(dbStoreBS)) {
            db.createObjectStore(dbStoreBS, {keyPath: 'id'})
        }
    })

const armazenarIndexDB = function(store, data) {
    return indexDB
        .then( (db) =>{
            console.log('indexDB armazenou')
            const transacao = db.transaction(store, 'readwrite')
            const tabela = transacao.objectStore(store)
            tabela.put(data)
            return transacao.complete
        })    
}

const obterIndexDB = function (store) {
    return indexDB
        .then( (db) => {
            console.log('[indexDB] leitura dos dados')
            const transacao = db.transaction(store, 'readonly')
            const tabela = transacao.objectStore(store)
            return tabela.getAll()
        })
}

const limparIndexDB = function(store) {
    return indexDB
        .then( (db) =>{
            console.log('indexDB apagou os dados')
            const transacao = db.transaction(store, 'readwrite')
            const tabela = transacao.objectStore(store)
            tabela.clear()
            return transacao.complete
        })    
}

exports = {armazenarIndexDB, obterIndexDB}