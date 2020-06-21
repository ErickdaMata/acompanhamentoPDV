import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        appNome: 'Nova Tech PDV!',
        appVersao: 'Versão: 1.0.0',
        sessao: '',
        exibirMensagemSenha: false,
        snackbar: 
            {
                exibir: '',
                texto: '',
                cor: '',
                tempo: 6000,
            },
        fullscreen: false
    },
    getters: {
        getSessao(state){
            return state.sessao
        },
        getExibirMensagemSenha(state){
            //console.log("From STORE:", state.exibirMensagemSenha)
            return state.exibirMensagemSenha
        },
        getSnackbar(state){
            return state.snackbar
        },
        getFullscreen(state){
            return state.fullscreen
        }
    },
    mutations: {
        salvarSessao(state, sessao){
            state.sessao = sessao
            if(sessao)
                axios.defaults.headers.common['Authorization'] = `bearer ${sessao.token}`
            else
                delete axios.defaults.headers.common['Authorization']

            console.log("Salvou Sessao. Axios: ", axios.defaults.headers.common['Authorization'])
        },
        comutarExibirMensagemSenha(state){
            state.exibirMensagemSenha = !state.exibirMensagemSenha
        },
        exibirSnackbar(state, payload){
            state.snackbar.exibir = true,
            state.snackbar.texto = payload.texto,
            state.snackbar.cor = payload.tipo,
            state.snackbar.tempo = payload.tempo? payload.tempo : 6000
        },
        comutarFullscreen(state){
            state.fullscreen = !state.fullscreen
        },
    }
})