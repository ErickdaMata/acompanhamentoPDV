import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import store from './config/store'
import { userKey, baseURL } from '@/global'
import Login from './components/Login'
import Offline from './components/Offline'
import Relatorio from './components/Relatorio'
import RelatorioApp from './components/RelatorioApp'
import ListaRelatorios from './components/ListaRelatorios'
import { Promise } from 'es6-promise'

// Inicializaçaõ do Vue Router
Vue.use(Router)

// Declaração do objeto Router
export default new Router({
    // Navegação com '#'
    mode: 'hash',
    // Rotas da navegação
    routes: [
        {
            // Rota principal
            path: '/',

            // Checa o roteamento antes de entrar na rota
            beforeEnter: (to, from, next) => {

                // Caso o navegado naõ esteja online,
                // redireciona para rota '/offline'
                if(!navigator.onLine){
                    next('/offline')
                    return
                }

                // Caso a rota venha do componente Login ou Relatorio
                if (from.name == 'Login' || from.name == 'Relatorio') {
                    // Encaminha o fluxo para próxima rota
                    next()
                }
                // Se não, o usuário ainda não fez login
                else{

                    // Declara uma constante que contém uma Promise
                    // A Promise busca por um token de sessão.
                    const obterSessao = new Promise((resolve) => {
                        // Verifica se há indexedDB no navegador
                        if(window.indexedDB){
                            // Obtém o token do banco    
                            obterIndexDB('token') // eslint-disable-line no-undef
                                .then((dados) => {
                                    // Se dados foram retornados do banco, há token
                                    if (dados) {
                                        // Obtém os dados da Promise retornada
                                        resolve(dados[0])
                                    }
                                })
                                
                        }else {
                            //Se não possui IndexedDB, recupera do Local Storage
                            resolve(JSON.parse(localStorage.getItem(userKey)))
                        }
                    })

                    // Executa a Promise armazenada, que retorna um token
                    obterSessao
                        // encadeia chamada para encaminhar rota
                        .then((sessao) => {
                            // 'token' se torna 'sessao' nesse contexto
                            // se não houver uma sessao
                            if (!sessao) {
                                // encaminha para Login
                                next('/login')
                            }
                            // Caso contrário
                            else {
                                // salva a sessão atual no navegador
                                store.commit('salvarSessao', sessao)
                                // retorna para encadeamento da chamada
                                return sessao
                            }
                        }).then((token) => {
                            // nesse contexto 'sessao' volta a ser chamar 'token'
                            // realiza uma requisição para validar o token
                            axios.post(`${baseURL}/val`, token)
                                // o Axios retorna uma Promise
                                .then((res) => {
                                    // O 'result' da chamada HTTP é verificado
                                    // Ele será True para token válido; ou False
                                    // (Este é padrão de resposta do backend)
                                    if (res.data)
                                        // Se o token foi validade, prossegue para relatorios
                                        next('/relatorios')
                                    else
                                        // Caso contrário, pede novo login
                                        next('/login')
                                })
                            
                        })
                        .catch((err) => {
                            console.log(err)
                            // Em caso de erro, redireciona para novo login
                            next('login')
                        })
                }
            }
        },
        // Definição das Rotas
        // Use rota e componente Vue
        {                     // PADRAO
            name: 'Login',    // Identificação da rota para o Vue Router
            path: '/login',   // rota da aplicação
            component: Login, // nome do componente Vue
        },
        {
            name: 'Main',
            path: '/relatorios',
            component: RelatorioApp,
            props: true,              // para troca de informações entre componentes
            children:                 // componentes aninhados a RelatorioApp
                [
                    // Integra o componente ao principal
                    { path: '', component: ListaRelatorios, props: true },

                    // :id permite passagem de paramentros por URL
                    // Ex.: app.com/#/relatorio/:1
                    { path: ':id', name: 'Relatorio', component: Relatorio, props: true}
                ]
        },
        {
            path: '/offline',
            component: Offline
        },

        // Redirecionamento de rotas
        // Para qualquer rota, ir para Relatorios
        {
            path: '*',
            redirect: '/relatorios' 
        }
]

})