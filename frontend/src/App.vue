<template>
  <v-app>
        <v-snackbar
            v-model="snackbar.exibir"
            :top="true"
            :color="snackbar.cor"
            :timeout="snackbar.tempo"
        >
            {{snackbar.texto}}
        </v-snackbar>
      <div >
        <router-view  />
      </div>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  computed: 
      mapGetters({
          snackbar: 'getSnackbar'
      })
}
</script>

<style>
*{
  border: 1x solid white;
}
.v-application--wrap{
  background: linear-gradient(0deg, rgba(255,255,255,1) 10%, rgb(6, 174, 230) 59%) no-repeat;
  overflow: scroll;
}
.v-main{
  background: #D6EDFF repeat;
  height: 100%;
  overflow: scroll;
}
</style> 