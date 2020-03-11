// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
// import '../static/css/main.css';
// import '../static/css/font-awesome-4.7.0/css/font-awesome.min.css';
// import '../static/css/animate.css'

Vue.config.productionTip = false;
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame
               || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.AudioContext = window.AudioContext || window.webkitAudioContext;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
