<template>
  <div>
      <ul class="lista">
          <router-link tag="li" to="relatorios/1" 
                class="item-lista">Empresa 1</router-link>

          <router-link tag="li" to="relatorios/2" 
                class="item-lista">Empresa 2</router-link>

      </ul>
  </div>
</template>

<script>
export default {

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