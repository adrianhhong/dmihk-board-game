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
        <h3 class="text-xs-center mb-3">What's your name?</h3>
        <v-text-field
          v-model="name"
          outlined
          maxlength="20"
          hide-details="auto"
          :rules="nameRules"
          @keydown.enter="createGame"
        >
        </v-text-field>
        <v-btn class="primary" large @click="createGame">Create</v-btn>
        <v-btn class="primary" large @click="gotoHome">Back</v-btn>
      </v-card>
    </div>

    <div v-if="showJoin">
      <v-card class="pl-3 pr-3 pt-5 pb-5 mt-5">
        <h3 class="text-xs-center mb-3">What's your name?</h3>
        <v-text-field
          v-model="name"
          outlined
          maxlength="20"
          hide-details="auto"
          :rules="nameRules"
          @keydown.enter="createGame"
        >
        </v-text-field>
        <h3 class="text-xs-center mb-3">Enter Room ID</h3>
        <v-text-field
          v-model="room"
          outlined
          maxlength="4"
          hide-details="auto"
          :rules="roomRules"
          @keydown.enter="giveRoom"
          v-uppercase="room"
        >
        </v-text-field>
        <v-btn class="primary" large @click="joinGame">Join</v-btn>
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
      room: "",
      nameRules: [value => !!value || "Please enter a name."],
      roomRules: [
        value => !!value || "Please enter a Room ID."
        // value => (value && value.length >= 3) || "A Room ID is 4 characters"
      ]
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
      if (this.name.trim()) {
        this.$socket.client.emit("createGame", this.name);
      } else {
        console.log("non-empty name");
      }
    },
    joinGame() {
      this.$socket.client.emit("joinGame", (this.name, this.room));
    }
  },
  // These two below are used to capitlise the Room ID field.
  filters: {
    uppercase(value) {
      return value.toUpperCase();
    }
  },
  watch: {
    room(val) {
      this.room = this.$options.filters.uppercase(val);
    }
  }
};
</script>
