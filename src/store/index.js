import Vue from "vue";
import Vuex from "vuex";

import router from "../router/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Global variables
    globalName: "",
    globalRoom: "",
    globalPlayerList: []
  },
  mutations: {
    SOCKET_UPDATELOBBY(state, [playerList, room]) {
      this.state.globalPlayerList = playerList;
      this.state.globalRoom = room;
      router.push({ name: "Lobby", params: { room: this.state.globalRoom } });
    },
    setGlobalName(state, payload) {
      state.globalName = payload.name;
    }
  },
  actions: {},
  modules: {}
});
