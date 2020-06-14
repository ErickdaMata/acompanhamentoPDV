/* eslint-disable no-unused-vars, no-console */
self.importScripts('./js/idb.js')
self.importScripts('./js/indexDB.js')

const NOME_CACHE_ESTATICO = 'precache-v1'
const NOME_CACHE_DINAMICO = 'dinamico-v1'

const ARQUIVOS = [
    '/',
    '/index.html',
    '/offline',
    '/js/idb.js',
    '/js/indexDB.js',
    'chunk-vendors.js',
    '/js/app.js',
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
                cache.addAll(ARQUIVOS)
            })
    )
})

//Chamado no momento de ativação do Service Worker
self.addEventListener('activate', function (event) {
    console.log('[sw.js]: Ativando...', event)
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