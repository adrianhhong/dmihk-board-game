import Vue from "vue";
import Vuex from "vuex";

import router from "../router/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Global variables
    globalName: "",
    globalRoom: "",
    globalPlayerList: [],
    joinedRoomByURL: true
  },
  getters: {
    getIndexOfPlayer(state) {
      return state.globalPlayerList.findIndex(x => x == state.globalName);
    }
  },
  mutations: {
    SOCKET_UPDATELOBBY(state, [playerList, room]) {
      this.state.globalPlayerList = playerList;
      this.state.globalRoom = room;
      this.state.joinedRoomByURL = false;
      router.push({ name: "Lobby", params: { room: this.state.globalRoom } });
    },
    SOCKET_DOESROOMEXIST(state, exists) {
      if (!exists) {
        router.push({ name: "Home" });
      }
    },
    setGlobalName(state, payload) {
      state.globalName = payload.name;
    },
    resetAllGlobalVariables(state) {
      state.globalName = "";
      state.globalRoom = "";
      state.globalPlayerList = [];
    }
  },
  actions: {},
  modules: {}
});
