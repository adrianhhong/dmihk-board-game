import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";
import VueClipboard from "vue-clipboard2";

const socket = io("http://localhost:3000");

Vue.use(VueSocketIOExt, socket, { store });
Vue.use(VueClipboard);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
