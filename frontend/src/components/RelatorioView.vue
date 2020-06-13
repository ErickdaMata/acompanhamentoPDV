<template>
    <div class='relatorio-view'>
        <div id="barra-superior" class="sombra">
            <label>{{ titulo }}</label>
            <img id="icone-sair" @click="sair"
                src="../assets/img/sair.png" alt="[sair]">
        </div>
        <v-overlay :value="carregando">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <!-- Será passado para o componente renderizado a lista de empresas -->
        <router-view :empresas="empresasArray" :relatorios="relatoriosArray" />
    </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import {baseURL, userKey} from '@/global'

export default {
    data(){
        return{
            titulo: 'Relatórios',
            empresasArray: [],
            relatoriosArray: [],
            carregando: true
        }
    },
    computed: 
        mapGetters({
            sessao: 'getSessao'
        })
    ,
    methods:{
        sair(){
            //Limpa o armazenamento da sessão no navegador
            localStorage.removeItem(userKey)
            //Redireciona o usuário para a página inicial
            this.$router.push( {path: '/login'} )
        },
        async validateToken(){
        console.log('iniciou validação')
        this.carregando = true

        const json = localStorage.getItem(userKey)
        const userData = JSON.parse(json)
        this.$store.commit('salvarSessao', null)
        console.log('User Data', userData)
        if(!userData) {
            this.carregando = false
            return this.$router.push({path: '/login'})
        }

        const res = await axios.post(`${baseURL}/val`, userData)
        console.log('Response', res.data)
        if(res.data){
            this.$store.commit('salvarSessao', userData)
            console.log('Sessão', this.$store.state.sessao)
            this.recuperarDados()
        } else {
            localStorage.removeItem(userKey)
            this.$router.push({path: '/login'})
        }
        
        },
        recuperarDados(){
            //Requisição para obter os relatórios disponíveis
            axios.post(baseURL + '/relatorios', this.sessao)
                .then(res => res.data)
                .then(dados => dados.empresas.map(empresa => {
                    this.empresasArray.push(empresa.nome)
                    this.relatoriosArray.push(empresa.rel)
                    this.carregando = false
                }))
        }
    },
    beforeMount(){
        //Caso não exista uma sessão ativa, será necessário verificar
        //se o usuário possui uma sessão salva no Local Storage
        if(!this.sessao){
            //Verifica se há um token armazenado e se está válido
            this.validateToken()
        }else{
            //Do contrário, usa o token atual para recuperar os dados
            this.recuperarDados()
        }
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