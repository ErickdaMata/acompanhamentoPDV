<template>
  <div class="d-flex flex-column justify-space-around my-5 pt-5 px-5">
        <v-icon class="align-self-center"
            size='150' color="branco">
            {{iconeOffline}}
        </v-icon>
        <h1 class="align-self-center mx-5 mb-5
            branco--text">
            {{tituloOffline}}
         </h1>
        <div class="align-itens-center mx-5 mb-5 pt-5
                branco--text text-justify">
            {{mensagemOffline}}
        </div>
        <v-btn outlined color="white" class="my-5 mx-5"
            @click="inicio"
        >
            {{textoBotao}}
            </v-btn>
    </div>
</template>

<script>
import { mdiCloudOffOutline } from '@mdi/js'

export default {
    name: 'Offline',
    data(){
        return{
            iconeOffline: mdiCloudOffOutline,
            tituloOffline: 'Você está offline',
            mensagemOffline: 'Não há conexão no momento, verifique o acesso a internet e tente novamente.',
            textoBotao: 'tela inicial'
        }
    },
    methods:{
        inicio(){
            this.$router.push({path: '/'})
        }
    }
}
</script>

<style>

</style>