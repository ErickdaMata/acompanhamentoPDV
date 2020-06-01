<template>
    <div id="body-relatorio">
        <div id="bloco-relatorio">
            <pre id="relatorio">
            </pre>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            titulo: 'Relatório de Caixas',
        }
    }
}
</script>

<style scoped>
#bloco-relatorio{
    font-size: 4vw;
    font-family: monospace;
    font-weight: 600;
    color: #222;
    padding: 10px;
    flex-grow: 1;
    overflow: scroll;
    background-color: rgb(255, 248, 239);
}
</style>