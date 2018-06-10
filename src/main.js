import '@/assets/scss/main.scss';
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import components from './components/index';

// 自動載入全局的 components
Object.keys(components).forEach((key) => {
  Vue.component(key, components[key]);
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
