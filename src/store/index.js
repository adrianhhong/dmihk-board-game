import Vue from "vue";
import Vuex from "vuex";

import router from "../router/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Used for Home view
    showCreate: false,
    showJoin: false,
    // Global name
    name: "",
    room: ""
  },
  mutations: {
    updateLobby() {
      console.log(this.state.name);
      router.push({ name: "Lobby", params: { room: this.state.room } });
    }
  },
  actions: {
    socket_updateLobby(context, [name, room]) {
      this.state.name = name;
      this.state.room = room;
      context.commit("updateLobby");
    }
  },
  modules: {}
});
