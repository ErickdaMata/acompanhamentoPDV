<template>
    <div class='relatorio-view'>
        <div id="barra-superior" class="sombra">
            <label>{{ titulo }}</label>
            <img id="icone-sair" @click="sair"
                src="../assets/img/sair.png" alt="[sair]">
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next){
        const autenticado = false
        autenticado? next() : next(false)
    },
    data(){
        return{
            titulo: 'Relatórios',
        }
    },
    methods:{
        sair(){
            this.$router.push( {path: '/'} )
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