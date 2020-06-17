<template>
    <div class='relatorio-view'>
        <v-navigation-drawer
            v-model="drawer"
            v-show='!fullscreen'
            app
            >
            <template v-slot:prepend>
                <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>{{nomeApp}}</v-list-item-title>
                    <v-list-item-subtitle>{{versaoApp}}</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>
            </template>
            <v-list dense>
                <v-list-item link @click="home">
                    <v-list-item-action>
                        <v-icon>{{iconeInicio}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{textoInicio}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link @click="sair">
                    <v-list-item-action>
                        <v-icon>{{iconeSair}}</v-icon>
                    </v-list-item-action >
                    <v-list-item-content>
                        <v-list-item-title>{{textoSair}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link @click="pedirPermissaoNotificacoes"
                    v-if="suportaNotificacao">
                    <v-list-item-action>
                        <v-icon>{{notificacao == 'granted'? iconeNotificaoPermitida :
                                        (notificacao === 'denied'? iconeNotificaoNegada : iconeNotificao ) }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{textoNotificacao}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app
            v-show='!fullscreen'
            color="lsegunda"
            class="px-5"
        >   <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-layout class="justify-space-between d-flex
                font-weight-bold branco--text">
                <v-toolbar-title class="text-sm-h5 text-md-h4 text-lg-h3">
                    {{ titulo }}
                </v-toolbar-title>
            </v-layout>
        </v-app-bar>
        <v-main>
            <v-overlay v-model="carregando">
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
            nomeApp: 'Nova Tech PDV',
            versaoApp: '1.0.0',
            drawer: null,
            iconeInicio: mdiHomeOutline,
            iconeSair: mdiLogoutVariant,
            iconeNotificao: mdiBellOutline,
            iconeNotificaoNegada: mdiBellOff,
            iconeNotificaoPermitida: mdiBellCheck,
            textoInicio: 'Tela Inicial',
            textoSair: 'Sair',
            textoNotificacao: 'Quero receber notificações',
            titulo: 'Relatórios',
            empresasArray: ['Padaria e Açougue', 'Farmácia Ltda', 'Pet Shop Cara Nova', 'Supermercado Bom e Barato', 'Loja de Roupas e Calçados'],
            horarioArray: ['15/06/2020 19:20:32', '15/06/2020 19:10:12', '15/06/2020 19:13:27', '15/06/2020 19:14:42', '15/06/2020 19:13:11'],
            relatoriosArray: ['Relatório','Relatorio','Relatorio','Relatorio','Relatorio'],
            carregando: true,
            backSync: ('SyncManager' in window),    
            suportaNotificacao: window.Notification,
            notificacao: Notification.permission,
            permitiuNotificacao: this.notificacao === 'granted'? true:false
        }
    },
    computed: 
        mapGetters({
            sessao: 'getSessao',
            fullscreen: 'getFullscreen'
        })
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
                console.log("[VUE]: ", event.data.msg)
                if(event.data.msg === 'token invalido'){
                    return this.sair('falha')
                }
                if(event.data.msg === 'backsync ok'){
                    return this.obterRelatoriosIndexedDB()
                }
                if(event.data.msg === 'backsync fail'){
                    if(navigator.onLine){
                        this.notificarSnackbar('info', 'Parece haver problemas, estamos tentando novamente.', 2000)
                    }
                }
                this.obterRelatoriosSemSW()
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
        async recuperarSessao(){
            //Recupera os dados da sessão no navegador
            //Verifica se IndexedDB está disponível para uso
            if(window.indexedDB){
                console.log("LEITURA IndexedDB")
                const sessao = await obterIndexDB('token') // eslint-disable-line no-undef
                return sessao[0]
            }
            //Se não estiver, recupera do Local Storage
            else{
                const sessao = localStorage.getItem(userKey)
                return JSON.parse(sessao)
            }
        },
        home(){
            //Redireciona o usuário para a página inicial
            this.$router.push( {path: '/'} )
        },
        sair(motivo){
            if(motivo === 'falha')
                this.notificarSnackbar('alerta', 'Seu acesso não pode ser validado. Por favor, realize novo login.')
            //Apaga os dados armazenados no IndexedDB ou Local Storage
            this.excluirToken()
            //Redireciona o usuário para a página inicial
            this.$router.push( {path: '/login'} )
        },

        async validarSessao(){
            console.log('iniciou validação')
            if(navigator.onLine){
                //Se sessão armazenada é vazia ou undefined
                if(!this.sessao) {
                    //Para de exibir overlay carregando
                    this.carregando = false
                    //Retorna o usuário para tela principal
                    return this.$router.push({path: '/login'})
                }
                //Caso o usuário tenha sessão, o sistema valida o token
                //Retorna true | false
                const res = await axios.post(`${baseURL}/val`, this.sessao)
                
                //Caso a resposta seja 'true'
                if(res.data){
                    this.recuperarRelatorios(true)
                }
                //Caso a resposta seja 'false'    
                else{
                    this.sair('falha')
                }
            } 
            //Caso não esteja online
            else {
                this.recuperarRelatorios(false)
            }

        },
        obterRelatoriosSemSW(){
            console.log('obterRelatoriosSemSW()')
            //Requisição para obter os relatórios disponíveis
            axios.post(baseURL + '/relatorios', this.sessao)
                .then(res => res.data)
                .then(dados => {
                    dados.empresas.map(empresa => {
                        this.empresasArray.push(empresa.nome)
                        this.relatoriosArray.push(empresa.rel)
                    })
                    //Termina a animação
                    this.carregando = false
                })
                .catch(err => {
                    if (!this.sessao){
                        return this.sair()    
                    } else {
                        this.notificarSnackbar('info', 'Não foi possível carregar seus dados, tente novamente.')
                    }
                })
        },
        obterRelatoriosIndexedDB(){
            console.log('obterRelatoriosIndexedDB')
            obterIndexDB('relatorios') // eslint-disable-line no-undef
                .then(empresas => {
                    empresas.map(empresa => {
                        this.empresasArray.push(empresa.nome)
                        this.relatoriosArray.push(empresa.rel)
                    })
                })
                .then(()=> {
                    limparIndexDB('relatorios') // eslint-disable-line no-undef
                })
                .then(() => this.carregando = false)
                .catch((err) => {
                    this.notificarSnackbar('info', 'Não foi possível carregar seus dados, tente novamente.')
                })
        },
        recuperarRelatorios(tokenValidado){
            console.log("recuperarRelatorios("+tokenValidado+")")
            //Inicia verificação para Background Sync
            if('serviceWorker' in navigator && 'SyncManager' in window){
                navigator.serviceWorker.ready.then((sw) => {
                    sw.sync.register(tokenValidado? 'sync-relatorios':'sync-valida-token')
                })
                .then(() => {
                    if (!navigator.onLine){
                        this.notificarSnackbar('info','Você está offline, mas vamos continuar tentando buscar seus dados.')
                    }        
                })
                .catch((err) => {
                    console.log("[RelatorioApp] Erro: ", err)
                    if(navigator.onLine){
                        if(tokenValidado)
                            this.obterRelatoriosSemSW()
                        else
                            this.sair('falha')
                    }
                    else{
                        this.notificarSnackbar('info', 
                                'Verifique sua conexão e tente novamente.')
                    }
                })
            } else {
                this.obterRelatoriosSemSW()
            }
        },
        async gerenciarCarregamento(){
            //Caso não exista uma sessão ativa, será necessário
            //tentar recuperar uma sessão salva no navegador
            if(this.sessao){
                console.log("[Vue] possui sessao")
                //Se já possui uma sessão, usa o token atual para recuperar os dados
                return this.recuperarRelatorios(true)
            }
            console.log("[Vue] NÃO possui sessao")
            //Verifica se há um token armazenado
            const sessaoArmazenada = await this.recuperarSessao()
            this.$store.commit('salvarSessao', sessaoArmazenada) 
            
            //Valida a sessão e recupera os relatórios
            return this.recuperarRelatorios(false)
            /* navigator.serviceWorker.ready.then((sw) => {
                    sw.sync.register('sync-relatorios')
                        this.carregando = false
                }) */
        },
        pedirPermissaoNotificacoes(){
            if(Notification.permission == 'denied'){
                this.notificarSnackbar('info', 'É necessário alterar manualmente a permissão em seu navegador', 8000)
            }
            else {
                Notification.requestPermission((resultado) =>{
                    if(resultado == 'granted'){
                        this.permitiuNotificacao = true
                        this.notificarSnackbar('info', 'Notificações habilitadas', 3000)
                    }
                })
            }
        }
    },
    beforeMount(){
        this.$store.fullscreen = 'false'
        
        this.gerenciarCarregamento()
        this.registrarMessageChannel()

        setTimeout(() => {
            this.obterRelatoriosSemSW()
        }, 6000);
    }
}
</script>

<style scoped>
.relatorio-view{
    margin:0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 95vh;
}

#barra-superior{
    padding: 5px 5px 10px;
    width: 100%;
    display: flex;
    align-self: flex-start;
    align-items: center;
    background-color: #1C77C3;
}

#barra-superior label{
    height: 100%;
    font-size: 8vw;
    text-align: left;
    color: #F6F7EB;
    font-weight: 500;
    flex-grow: 1;
}

#barra-superior img{
    height: 10vw;
    align-self: flex-end;
}

.sombra{
    box-shadow: 2px 0px 5px #000a;
}
</style>