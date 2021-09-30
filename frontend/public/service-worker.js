/* eslint-disable no-unused-vars, no-console */
self.importScripts('./js/idb.js')
self.importScripts('./js/indexDB.js')

const baseURL = 'http://localhost:5001/pdv-estagio/us-central1/api/relatorios'
//const baseURL = 'https://us-central1-pdv-estagio.cloudfunctions.net/api/relatorios'

// TROCAR O NOME OU VERSÃO EM CASO DE ATUALIZAÇÃO DO CACHE
const NOME_CACHE_ESTATICO = 'precache-v1'
const NOME_CACHE_DINAMICO = 'dinamico-v1'

const CACHE_REQUISICOES = [
    '/',
    '/js/app.js',
    '/js/idb.js',
    '/js/indexDB.js',
    '/js/promise.js',
    '/js/fetch.js',
    'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
]

self.addEventListener('install', function (event) {
    //Adiciona uma espera a instalação, para que o conteúdo não seja
    //buscado em cache antes de ser alocado corretamente
    event.waitUntil(
        //Abre ou inica o cache com o nome passado
        caches.open(NOME_CACHE_ESTATICO)
            //No cache específico passado
            .then((cache) => {
                //Adiciona todos os itens por Array, cada elemento será uma Promise
                cache.addAll(CACHE_REQUISICOES)
            })
    )
})

//Chamado no momento de ativação do Service Worker
self.addEventListener('activate', function (event) {
    
    //Inicia uma nova espera, para limpar o cache antigo da aplicação
    event.waitUntil(
        //Obtém todas as identificações de cache atuais
        caches.keys()
            //Passa o retorno Array para a Promise
            .then((keyList)=> {
                //Retorna uma Promise para cada elemento que atender o critério
                return Promise.all(keyList.map( (key) => {
                    //Se a identificação corresponde a qualquer cache que não é a atual
                    if(key !== NOME_CACHE_ESTATICO && key !== NOME_CACHE_DINAMICO){
                        //A cache registrada é excluída
                        return caches.delete(key)
                    }
                }))
            })
    )
    //Retorna ao cliente para evitar comportamento impevisível
    return self.clients.claim();
})

//Interceptando eventos de busca de conteúdo
self.addEventListener('fetch', (event) => {

    //Cria o 'proxy' para alterar a resposta
    event.respondWith(
        //Procura o conteúdo buscado no cache
        caches.match(event.request)
            //Inicia uma Promise para tratar a resposta
            .then((response) => {
                //Caso o conteúdo buscado esteja em cache
                if(response){
                    //Devolve o conteúdo em cache
                    return response
                } else {
                    //Caso o conteúdo não esteja no cache
                    return fetch(event.request)
                        //Inicia uma Promise pra incluir o conteúdo em cache
                        .then((res) => {
                            //Abre o cache ou cria um novo com o nome passado
                            return caches.open(NOME_CACHE_DINAMICO)
                                .then((cache) => {
                                    //Adiciona o conteúdo no cache
                                    //res.clone() cria uma cópia do conteúdo
                                    //Pois a resposta, uma vez consumida, é perdida
                                    cache.put(event.request.url, res.clone())
                                    //Retorna o resultado da solicitação
                                    return res
                                })
                        })
                        //Caso o fetch não seja possível haverá um retorno 'reject'
                        //Como o cache já foi consultado e o conteúdo não está lá,
                        //é resta exibir ao usuário que ele está offline
                        .catch((e) => {
                            return caches.open(NOME_CACHE_ESTATICO)
                                .then(cache => {
                                    cache.match('/offline')
                                })
                        })
                }
                
            })
    )
})

// Função para troca de mensagens entre o SW e a aplicação
function informar(mensagem) {
    // Broadcast para clientes do SW no navegador.
    self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage({msg: mensagem}))
    })
}

// Evento SYNC é registrado no SW e invocado pela aplicação
self.addEventListener('sync', (event) => {
    // Utilidades para o console
    const prefix = "[SW:Sync]"
    console.log(prefix)

    // Abre a conexão com o Indexed DB por Promise
    obterIndexDB(dbStoreToken)
    // encadeamento da recuperação do token
    .then((dados)=> {
        return  dados[0]
    })
    // recuperaçao da sessão
    .then((sessao)=> {

        // Caso não haja token
        if (!sessao) {
            // dispara o erro
            throw 'token invalido'
        }

        // Cria um novo cabeçalho para requisição HTTP
        const cabecalho = new Headers({
            "Authorization": `bearer ${sessao.token}`,
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json, text/plain, */*"
        })
        // Parametriza requisição HTTP
        const init = {
            method: 'POST',
            headers: cabecalho,
            mode: 'cors',
            body: JSON.stringify(sessao)
        }
        // Retorna para o encadeamento
        return init
    })
    // Recebe a configuração do cabeçalho HTTP
    .then((config) => {
        // Verifica a tag da chamada
        if (event.tag === 'sync-relatorios') {
            // fetch para chamada HTTP em Promise
            fetch(baseURL, config)
                // Retorno é modificao para JSON
                .then((response) => {
                    return response.json()
                })
                // Formato JSON é armazenado no Indexed DB
                .then((relatorios)=> {
                    console.log(prefix + "Dados recuperados", relatorios)
                    relatorios.map(relatorio => {
                        armazenarIndexDB(dbStoreBS, relatorio)
                    })
                })
                // Comunica sucesso para aplicação
                .then(()=> {
                    informar('backsync ok')
                })
                // Em caso de ERRO
                .catch((err) => {
                    console.log(prefix + "Erro na recuperação", err)
                    informar('backsync fail')
                })
        }
    })
    .catch((err) => {
        console.log('[SW]: erro', err)
        informar(err)
    })  
})