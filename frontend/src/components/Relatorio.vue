<template>
    <div id="body-relatorio"
        class="pt-sm-2 pt-md-5 d-flex justify-center">
        <v-card id="bloco-relatorio" class="mx-5 my-5" max-width='800'
            @dblclick="fullscreen = !fullscreen">
            <pre id="relatorio">{{ relatorios[id] }}</pre>
        </v-card>
    </div>
</template>

<script>
export default {
    props: {
        relatorios : {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    data(){
        return{
            fullscreen: false,
            titulo: 'Relatório de Caixas',
            id: this.$route.params.id
        }
    },
    methods: {
        exibirFullscreen(){
          this.$store.commit('comutarFullscreen')
        }
    }
}
</script>

<style scoped>
#bloco-relatorio{
    font-size: 3.5vw;
    font-family: monospace;
    font-weight: 600;
    color: #222;
    padding: 10px;
    flex-grow: 1;
    overflow: scroll;
    background-color: rgb(255, 248, 239);
}
</style>