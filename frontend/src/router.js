import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import Offline from './components/Offline'
import Relatorio from './components/Relatorio'
import RelatorioApp from './components/RelatorioApp'
import ListaRelatorios from './components/ListaRelatorios'

Vue.use(Router)

export default new Router({ 
    mode: 'hash',
    routes: [{
        path: '/login',
        component: Login,
        name: 'home'
    },
    {
        path: '/relatorios',
        component: RelatorioApp,
        props: true, 
        children: [
            { path: '', component: ListaRelatorios, props: true },
            { path: ':id', component: Relatorio, props: true}
        ],
    }, {
        path: '/offline',
        component: Offline
    },{
        path: '*',
        redirect: '/relatorios' 
    }]
})