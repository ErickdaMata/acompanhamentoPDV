import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sessao: '',
    },
    getters: {
        getSessao(state){
            return state.sessao
        }
    },
    mutations: {
        salvarSessao(state, sessao){
            state.sessao = sessao
            if(sessao)
                axios.defaults.headers.common['Authorization'] = `bearer ${sessao.token}`
            else
                delete axios.defaults.headers.common['Authorization']
        }
    }
})