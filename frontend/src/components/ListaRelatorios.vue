<template>
  <div>
        <ul class="lista">
            <!-- Lista de empresas disponíveis -->
            <router-link  v-for="(empresa, id) in empresas" :to="{path: 'relatorios/' + id}"
                :key="empresa" tag="li" class="item-lista" >
                {{ empresa }}
            </router-link>

        </ul>
  </div>
</template>

<script>
export default {
    props: {
        empresas : {
            type: Array,
            default: function() {
                return []
            }
        }
    },
}
</script>

<style scoped>
.lista {
    list-style: none;
    padding: 0px;
    border: 1px solid #FFF;
    border-radius: 8px;
    overflow: hidden;
}

.lista .item-lista {
    padding: 15px 25px;
    cursor: pointer;
}

.lista .item-lista:hover {
    background-color: #FFF3;
}

.lista .item-lista:nth-child(n + 2) {
    border-top: 1px solid #FFF;
}
</style>