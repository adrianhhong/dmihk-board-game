<template>
  <div>
    <div v-if="!showCreate && !showJoin">
      <v-card>
        <v-btn class="primary" large @click="gotoCreate">Create Game</v-btn>
        <v-btn class="primary" large @click="gotoJoin">Join Game</v-btn>
      </v-card>
    </div>
    <div v-if="showCreate">
      <v-card class="pl-3 pr-3 pt-5 pb-5 mt-5">
        <h3 class="text-xs-center mb-3">Enter a Username</h3>
        <v-text-field
          v-model="name"
          outline
          single-line
          @keydown.enter="giveName"
        >
        </v-text-field>
        <v-btn class="primary" large @click="giveName">Create</v-btn>
        <v-btn class="primary" large @click="gotoHome">Back</v-btn>
      </v-card>
    </div>
    <div v-if="showJoin">
      <v-card class="pl-3 pr-3 pt-5 pb-5 mt-5">
        <h3 class="text-xs-center mb-3">Enter a Username</h3>
        <v-text-field
          v-model="name"
          outline
          single-line
          @keydown.enter="giveName"
        >
        </v-text-field>
        <h3 class="text-xs-center mb-3">Enter Room ID</h3>
        <v-text-field
          v-model="room"
          outline
          single-line
          @keydown.enter="giveRoom"
        >
        </v-text-field>
        <v-btn class="primary" large @click="giveName">Join</v-btn>
        <v-btn class="primary" large @click="gotoHome">Back</v-btn>
      </v-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import CreateGame from "@/components/CreateGame.vue";

export default {
  name: "home",
  data() {
    return {
      showCreate: false,
      showJoin: false,
      name: "",
      room: ""
    };
  },
  methods: {
    gotoCreate() {
      this.showCreate = true;
    },
    gotoJoin() {
      this.showJoin = true;
    },
    gotoHome() {
      this.showCreate = false;
      this.showJoin = false;
    },
    createGame() {
      this.$socket.client.emit("createGame", this.name);
    },
    joinGame() {
      this.$socket.client.emit("joinGame", (this.name, this.room));
    }
  }
};
</script>
