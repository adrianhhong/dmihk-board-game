import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {
    NEW_MESSAGE(message) {
      console.log("peep this homie: ");
      console.log(message);
      // state.messages[message.id] = message;
      // state.messagesOrder.push(message.id);
    }
  },
  actions: {
    socket_userMessage(context, message) {
      // <-- this action is triggered when `user_message` is emmited on the server
      context.commit("NEW_MESSAGE", message);
    }
  },
  modules: {}
});
