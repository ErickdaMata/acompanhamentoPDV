<template>
    <div class='relatorio-view'>
        <v-navigation-drawer
            v-model="drawer"
            v-show='!fullscreen'
            app
            
            >
            <template v-slot:prepend 
                class="pt-4">
                <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>{{appNome}}</v-list-item-title>
                    <v-list-item-subtitle>{{appVersao}}</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>
            </template>
            <v-divider
                class="my-4"
            ></v-divider>
            <v-list dense>
                <v-list-item link @click="home">
                    <v-list-item-action>
                        <v-icon>{{navIconeInicio}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{textoInicio}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link @click="sair">
                    <v-list-item-action>
                        <v-icon>{{navIconeSair}}</v-icon>
                    </v-list-item-action >
                    <v-list-item-content>
                        <v-list-item-title>{{textoSair}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
 
        <v-app-bar
            app
            v-show='!fullscreen'
            color="lsegunda"
            class="px-5"
        >   <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-layout class="justify-space-between d-flex
                font-weight-bold branco--text">
                <v-toolbar-title class="text-sm-h5 text-md-h4 text-lg-h3">
                    {{ titulo }}
                </v-toolbar-title>
            </v-layout>
        </v-app-bar>
        <v-main>
            <v-overlay v-model="carregando" >
                <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
            <!-- Será passado para o componente renderizado a lista de empresas -->
            <router-view :empresas="empresasArray" :horarios="horarioArray" :relatorios="relatoriosArray"/>
        </v-main>
        <v-footer
            v-show='!fullscreen'
            color="lsegunda"
            app
        >
            <span class="branco--text">&copy; 2020</span>
        </v-footer>

    </div>
</template>

<script>
/* eslint-disable no-unused-vars, no-console */
import axios from 'axios'
import {mapGetters} from 'vuex'
import {baseURL, userKey} from '@/global'
import { mdiLogoutVariant, mdiHomeOutline } from '@mdi/js'
import { mdiBellOutline, mdiBellOff, mdiBellCheck } from '@mdi/js'

export default {
    data(){
        return{
            titulo: 'Relatórios',

            carregando: true,
            sessao: this.$store.state.sessao,
            appNome: this.$store.state.appNome,
            appVersao: this.$store.state.appVersao,
            
            drawer: null,
            navIconeInicio: mdiHomeOutline,
            navIconeSair: mdiLogoutVariant,
            
            textoInicio: 'Tela Inicial',
            textoSair: 'Sair',

            empresasArray: [],
            horarioArray: [],
            relatoriosArray: [],
            
        }
    },
    computed: {
        ...mapGetters({
            fullscreen: 'getFullscreen'
        })
    }
    ,
    methods:{
        notificarSnackbar(tipo, mensagem, tempo){
            this.$store.commit('exibirSnackbar', {
                            texto: mensagem,
                            tipo: tipo,
                            tempo: tempo? tempo : null
                        })
        },
        registrarMessageChannel(){
            navigator.serviceWorker.onmessage = (event) => {
                console.log("[VUE] Message Channel: ", event.data.msg)
                // Caso não existam relatórios para este ID,
                // 'null' será a mensagem padrão do Service Worker
                if(event.data.msg === 'null'){
                    // Nesse caso o usuário é orientado a buscar o suporte técnico.
                    this.notificarSnackbar('info'
                                                , 'Procure nosso suporte técnico:'
                                                + '\n Não há autorização para consultar relatórios.'
                                                , 10000)                         
                    return this.sair()
                } else {
                    if(event.data.msg === 'token invalido'){
                        return this.sair('falha')
                    }
                    if(event.data.msg === 'backsync ok'){
                        return this.consumirIndexedDB()
                    }
                    if(event.data.msg === 'backsync fail'){
                        if(navigator.onLine){
                            this.notificarSnackbar('info'
                                                    , 'Parece haver problemas, estamos tentando novamente.'
                                                    , 2000)
                        }
                    }
                    this.obterRelatoriosSemSW()
                }
                
            }
        },
        excluirToken(){
            //Limpa o armazenamento da sessão no navegador
            //Verifica se IndexedDB está disponível para uso
            if(window.indexedDB)
                limparIndexDB('token') // eslint-disable-line no-undef
            //Se não estiver, limpa o Local Storage
            else
                localStorage.removeItem(userKey)
        },
        home(){
            //Redireciona o usuário para a página inicial
            //a tela imediatamente anterior ao relatório
            if(this.$route.name === 'Relatorio')
                this.$router.go( -1 )
            else
                this.drawer = null
        },
        sair(motivo){
            if(motivo === 'falha'){
                this.notificarSnackbar('alerta'
                    , 'Seu acesso não pode ser validado. Por favor, realize novo login.')
            }
            //Apaga os dados armazenados no IndexedDB ou Local Storage
            this.excluirToken()
            //Redireciona o usuário para a página inicial
            this.$router.go(-1)
        },
        obterRelatoriosSemSW(){
            console.log('obterRelatoriosSemSW()')
            //Requisição para obter os relatórios disponíveis
            axios.post(baseURL + '/relatorios', this.sessao)
                .then(res => res.data)
                .then(dados => {
                    console.log("FRONT>obterRelatoriosSemSW:")
                    if(dados){
                        dados.map(empresa => {
                            console.log("empresa:", empresa)
                            this.empresasArray.push(empresa.apelido)
                            this.relatoriosArray.push(this.formatarRelatorio(empresa.rel))
                            this.horarioArray.push(empresa.dth)
                        })
                    }
                    else {
                        this.notificarSnackbar('info'
                                                , 'Procure nosso suporte técnico:'
                                                + '\n Não há autorização para consultar relatórios.'
                                                , 10000) 
                        return this.sair()   
                    }
                    //Termina a animação
                    this.carregando = false
                })
                .catch(err => {
                    if (!this.sessao){
                        return this.sair()
                    } else {
                        console.log(err)
                        this.notificarSnackbar('info'
                                                ,'Não foi possível carregar seus dados, tente novamente.')
                    }
                })
        },
        consumirIndexedDB(){
            console.log('consumirIndexedDB')
            obterIndexDB('relatorios') // eslint-disable-line no-undef
                .then(dados => {
                    console.log("FRONT>consumirIndexedDB:")
                    dados.map(empresa => {
                        console.log("empresa:", empresa)
                        this.empresasArray.push(empresa.apelido)
                        this.relatoriosArray.push(this.formatarRelatorio(empresa.rel))
                        this.horarioArray.push(empresa.dth)
                    })
                    //Termina a animação
                    this.carregando = false
                })
                .then(()=> {
                    limparIndexDB('relatorios') // eslint-disable-line no-undef
                })
                .then(() => this.carregando = false)
                .catch((err) => {
                    this.notificarSnackbar('info'
                                            , 'Não foi possível carregar seus dados, tente novamente.')
                })
        },
        recuperarRelatorios(){
            //Inicia verificação para Background Sync
            if('serviceWorker' in navigator && 'SyncManager' in window){
                navigator.serviceWorker.ready.then((sw) => {
                    sw.sync.register('sync-relatorios')
                })
                .then(() => {
                    if (!navigator.onLine){
                        this.notificarSnackbar('info'
                                                ,'Você está offline, mas vamos continuar tentando buscar seus dados.')
                    }        
                })
                .catch((err) => {
                    console.log("[RelatorioApp] Erro: ", err)
                    if(navigator.onLine){
                        this.obterRelatoriosSemSW()
                    }
                    else{
                        this.notificarSnackbar('info' 
                                                ,'Verifique sua conexão e tente novamente.')
                    }
                })
            } else {
                this.obterRelatoriosSemSW()
            }
        },
        formatarRelatorio(texto){
            texto = texto.replace(/#/g, '\n')
            return texto
        }
       
    },
    created(){
        this.$store.fullscreen = 'false'
        this.registrarMessageChannel()
        this.recuperarRelatorios()
    }
}
</script>

<style scoped>
.v-main{
    margin:0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-x: hidden;
    height: 95vh;
}

.v-main::-webkit-scrollbar {
    width: 0 !important
}

.v-main {
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
}

</style>