import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import ListaRelatorios from './components/ListaRelatorios'
import Relatorio from './components/Relatorio'
import RelatorioView from './components/RelatorioView'
import store from './config/store'

Vue.use(Router)

export default new Router({ 
    mode: 'hash',
    routes: [{
        path: '/',
        component: Login,
        name: 'home'
    },{
        path: '/relatorios',
        component: RelatorioView,
        props: true,
        children: [
            { path: '', component: ListaRelatorios, props: true },
            { path: ':id', component: Relatorio, props: true}
        ],
        //SEGURANÇA: Função ocorre antes da chamada do componente
        //Verificação feita pelo Vue Router para evitar renderização sem credenciais
        beforeEnter: (to, from, next) => {
            const token = store.state.sessao.token
            token? next() : next('/')
        }
    }, {
        path: '*',
        redirect: '/'
    }]
})