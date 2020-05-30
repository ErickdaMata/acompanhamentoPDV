import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import ListaRelatorios from './components/ListaRelatorios'
import Relatorio from './components/Relatorio'
import RelatorioView from './components/RelatorioView'

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
        ]
    }, {
        path: '*',
        redirect: '/'
    }]
})