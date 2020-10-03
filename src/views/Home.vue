<template>
  <div>
    <!-- HOME PAGE -->
    <v-container
      v-if="!showCreate && !showJoin"
      class="text-center"
      max-width="425"
      fluid
    >
      <h1>deception: murder in hong kong</h1>

      <v-btn class="primary" large @click="showCreate = true"
        >Create Game</v-btn
      >
      <v-btn class="primary" large @click="showJoin = true">Join Game</v-btn>
    </v-container>

    <!-- CREATE PAGE -->
    <v-container v-if="showCreate" class="text-center" max-width="425" fluid>
      <h3 class="text-xs-center mb-3">What's your name?</h3>
      <v-text-field
        v-model="name"
        outlined
        maxlength="15"
        hide-details="auto"
        :rules="nameRules"
        @keydown.enter="createGame"
      >
      </v-text-field>
      <v-btn class="primary" large @click="createGame">Create</v-btn>
      <v-btn class="primary" large @click="showCreate = showJoin = false"
        >Back
      </v-btn>
    </v-container>

    <!-- JOIN PAGE -->
    <v-container v-if="showJoin" class="text-center" max-width="425">
      <h3 class="text-xs-center mb-3">What's your name?</h3>
      <v-text-field
        v-model="name"
        outlined
        maxlength="15"
        hide-details="auto"
        :rules="nameRules"
        @keydown.enter="joinGame"
      >
      </v-text-field>

      <h3 class="text-xs-center mb-3">Enter Room ID</h3>
      <v-text-field
        v-model="room"
        outlined
        maxlength="4"
        hide-details="auto"
        :rules="roomRules"
        @keydown.enter="joinGame"
        v-uppercase="room"
      >
      </v-text-field>

      <v-btn class="primary" large @click="joinGame">Join</v-btn>
      <v-btn class="primary" large @click="showCreate = showJoin = false"
        >Back</v-btn
      >

      <!-- Snackbar Warnings -->
      <v-snackbar v-model="showDuplicateNameFound" :timeout="3000">
        Duplicate name found. Please choose a different name.
        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="showDuplicateNameFound = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <v-snackbar v-model="showRoomNotFound" :timeout="3000">
        Room not found!
        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="showRoomNotFound = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <v-snackbar v-model="showRoomIsFull" :timeout="3000">
        Room is full!
        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="showRoomIsFull = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import CreateGame from "@/components/CreateGame.vue";
import store from "../store";

export default {
  name: "home",
  data() {
    return {
      // Show and hide views
      showCreate: false,
      showJoin: false,
      // Name and Room variables
      name: "",
      room: "",
      // Input rules
      nameRules: [value => !!value || "Please enter a name."],
      roomRules: [value => !!value || "Please enter a Room ID."],
      // Show and hide alerts
      showRoomNotFound: false,
      showDuplicateNameFound: false,
      showRoomIsFull: false
    };
  },

  methods: {
    createGame() {
      if (this.name.trim()) {
        store.commit("setGlobalName", { name: this.name.trim() });
        this.$socket.client.emit("createGame", this.name.trim());
      }
    },
    joinGame() {
      if (this.name.trim() && this.room.trim()) {
        store.commit("setGlobalName", { name: this.name.trim() });
        this.$socket.client.emit(
          "joinGame",
          this.name.trim(),
          this.room.trim()
        );
      }
    }
  },

  filters: {
    // Used to capitlise the Room ID field.
    uppercase(value) {
      return value.toUpperCase();
    }
  },

  watch: {
    // Used to capitlise the Room ID field.
    room(val) {
      this.room = this.$options.filters.uppercase(val);
    }
  },

  sockets: {
    roomNotFound() {
      this.showRoomNotFound = true;
    },
    duplicateNameFound() {
      this.showDuplicateNameFound = true;
    },
    roomIsFull() {
      this.showRoomIsFull = true;
    }
  }
};
</script>
