import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from './axios-instance';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
