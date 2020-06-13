<template>
<v-app>
  <div id="app">
    <router-view  />
  </div>
</v-app>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
*{
  border: 1x solid white;
}
#app{
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(234,251,255,1) 59%) no-repeat;
}
</style> 