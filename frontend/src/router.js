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


Vue.use(Router)

export default new Router({ 
    mode: 'hash',
    routes: [
        {
            path: '/',
            beforeEnter: (to, from, next) => {
                console.log("TO", to === from)
                console.log("FROM", from)
                console.log("NEXT", next)
                if(from.name == 'Login' || from.name == 'Relatorio'){
                    next()
                }
                else{
                    console.log("Não fez login antes")
        
                    const obterSessao = new Promise ((resolve) => {
                        if(window.indexedDB){
                            console.log("LEITURA IndexedDB")
    
                            obterIndexDB('token') // eslint-disable-line no-undef
                                .then((dados) => {
                                    if(dados){
                                        resolve(dados[0])
                                    }
                                })
                                
                        }else {
                            //Se não estiver, recupera do Local Storage
                            resolve(JSON.parse(localStorage.getItem(userKey)))
                        }
                    })

                    obterSessao
                        .then( (sessao) => {
                            if(!sessao){
                                next('/login')
                            }
                            else{
                                store.commit('salvarSessao', sessao)
                                return sessao
                            }
                        }).then((token) => {
                            axios.post(`${baseURL}/val`, token)
                                .then((res)=> {
                                    if(res.data)
                                        next('/relatorios')
                                    else
                                        next('/login')
                                })
                            
                        })
                        .catch((err) => {
                            console.log("ERRO ao obter IndexedDB:", err)
                            next('login')
                        })

                    
                }

            }
        },
        {
            name: 'Login',
            path: '/login',
            component: Login,
        },
        {
            name: 'Main',
            path: '/relatorios',
            component: RelatorioApp,
            props: true, 
            children: 
                [
                    { path: '', component: ListaRelatorios, props: true },
                    { path: ':id', name: 'Relatorio', component: Relatorio, props: true}
                ]
        },
        {
            path: '/offline',
            component: Offline
        },
        {
            path: '*',
            redirect: '/relatorios' 
        }
]

})