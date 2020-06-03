<template>
    <div class='relatorio-view'>
        <div id="barra-superior" class="sombra">
            <label>{{ titulo }}</label>
            <img id="icone-sair" @click="sair"
                src="../assets/img/sair.png" alt="[sair]">
        </div>
        <!-- Será passado para o componente renderizado a lista de empresas -->
        <router-view :empresas="empresasArray" :relatorios="relatoriosArray" />
    </div>
</template>

<script>
import {baseURL, userKey} from '@/global'
import {mapGetters} from 'vuex'
import axios from 'axios'

export default {
    data(){
        return{
            titulo: 'Relatórios',
            empresasArray: [],
            relatoriosArray: []
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
            this.$router.push( {path: '/'} )
        }
    },
    //Método invocado antes da renderização pelo Vue
    beforeMount(){
        //Requisição para obter os relatórios disponíveis
        axios.post(baseURL + '/relatorios', this.sessao)
            .then(res => res.data)
            .then(dados => dados.empresas.map(empresa => {
                this.empresasArray.push(empresa.nome)
                this.relatoriosArray.push(empresa.rel)
            }))
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