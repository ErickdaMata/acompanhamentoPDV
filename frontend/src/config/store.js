import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sessao: '',
        exibirMensagemSenha: false
    },
    getters: {
        getSessao(state){
            return state.sessao
        },
        getExibirMensagemSenha(state){
            //console.log("From STORE:", state.exibirMensagemSenha)
            return state.exibirMensagemSenha
        }
    },
    mutations: {
        salvarSessao(state, sessao){
            state.sessao = sessao
            if(sessao)
                axios.defaults.headers.common['Authorization'] = `bearer ${sessao.token}`
            else
                delete axios.defaults.headers.common['Authorization']
        },
        comutarExibirMensagemSenha(state){
            state.exibirMensagemSenha = !state.exibirMensagemSenha
        }
    }
})