// main.js
import Vue from 'vue';
import App from './index.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app');
