import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './config/store'
//import '../public/service-worker'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),

  mounted(){
    if('serviceWorker' in navigator){
      navigator.serviceWorker.register('/service-worker.js')
    }
  }
}).$mount('#app')
