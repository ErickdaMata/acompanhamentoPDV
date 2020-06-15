<template>
    <div class='relatorio-view'>
        <div id="barra-superior" class="sombra">
            <label>{{ titulo }}</label>
            <img id="icone-sair" @click="sair"
                src="../assets/img/sair.png" alt="[sair]">
        </div>
        <v-overlay v-model="carregando">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <!-- Será passado para o componente renderizado a lista de empresas -->
        <router-view :empresas="empresasArray" :relatorios="relatoriosArray" />
    </div>
</template>

<script>
/* eslint-disable no-unused-vars, no-console */
import axios from 'axios'
import {mapGetters} from 'vuex'
import {baseURL, userKey} from '@/global'

export default {
    data(){
        return{
            titulo: 'Relatórios',
            empresasArray: [],
            relatoriosArray: [],
            carregando: true,
            backSync: ('SyncManager' in window)
        }
    },
    computed: 
        mapGetters({
            sessao: 'getSessao'
        })
    ,
    methods:{
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
        sair(){
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
                console.log('[validar:] AXIOS:', axios.post(`${baseURL}/val`, this.sessao))
                console.log('[validar:] URL:', `${baseURL}/val`)
                console.log('[validar:] sessao:', this.sessao)
                console.log('Response', res.data)
                
                //Caso a resposta seja 'true'
                if(res.data){
                    this.recuperarRelatorios(true)
                }
                //Caso a resposta seja 'false'    
                else{
                    this.sair()
                }
            } 
            //Caso não esteja online
            else {
                this.recuperarRelatorios(false)
            }

        },
        obterRelatoriosAgora(){
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
        },
        obterRelatoriosIndexedDB(){
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
        },
        recuperarRelatorios(tokenValidado){
            //Inicia verificação para Background Sync
            if('serviceWorker' in navigator && 'SyncManager' in window){
                navigator.serviceWorker.ready.then((sw) => {
                    sw.sync.register(tokenValidado? 'sync-relatorios':'sync-valida-token')
                })
                .then(() => {
                    if (!navigator.onLine)        
                        alert("Back Sync")
                })
                .catch((err) => {
                    console.log(err)
                    if (tokenValidado && navigator.onLine)
                        this.obterRelatoriosAgora()
                    else
                        this.sair()
                })
            } else {
                this.obterRelatoriosAgora()
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
    },
    beforeMount(){
        this.gerenciarCarregamento()
        navigator.serviceWorker.addEventListener('message', event => {
            if(event.data.msg === 'token invalido')
                this.sair()
            if(event.data.msg === 'backsync ok')
                this.obterRelatoriosIndexedDB()
        });
        //this.obterRelatoriosIndexedDB()
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