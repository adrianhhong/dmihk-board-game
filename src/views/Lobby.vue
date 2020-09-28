<template>
  <div>
    <div v-if="joinedRoomByURL" class="text-center">
      <h1>Joining {{ this.$route.params.room }}</h1>
      <v-card class="pl-3 pr-3 pt-5 pb-5 mt-5">
        <h3 class="text-xs-center mb-3">What's your name?</h3>
        <v-text-field
          v-model="name"
          outlined
          maxlength="20"
          hide-details="auto"
          :rules="nameRules"
          @keydown.enter="joinGame"
        >
        </v-text-field>

        <v-btn class="primary" large @click="joinGame">Join</v-btn>
        <v-btn class="primary" large @click="goToHome">Back</v-btn>

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
      </v-card>
    </div>

    <!-- Actual Lobby -->
    <div v-if="!joinedRoomByURL" class="text-center">
      <h1>waiting for players...</h1>
      <h3>room code:</h3>
      <v-btn
        rounded
        x-large
        color="secondary"
        v-clipboard:copy="globalRoom"
        :loading="copied"
        :disabled="copied"
        @click="watchCopy = 'copied'"
      >
        {{ globalRoom }}
        <template v-slot:watchCopy>
          <span>Copied!</span>
        </template>
        <!-- CHECK WHY THIS DOESNT SHOW Copied! anymore???? -->
      </v-btn>

      <v-card class="mx-auto" max-width="300" tile>
        <v-list disabled>
          <v-subheader>Players</v-subheader>
          <v-list-item-group v-model="indexOfPlayer" color="primary">
            <v-list-item v-for="(player, i) in globalPlayerList" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="player"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>

      <v-card class="mx-auto" max-width="600">
        <v-select :items="items" label="Standard"></v-select>
      </v-card>

      <v-btn class="primary" large @click="startGame">Start</v-btn>
      <v-btn class="primary" large @click="quitGame">Quit</v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store";

export default {
  name: "lobby",
  data() {
    return {
      name: "",
      nameRules: [value => !!value || "Please enter a name."],
      showDuplicateNameFound: false,
      showRoomIsFull: false,
      watchCopy: null,
      copied: false
    };
  },
  computed: {
    ...mapState([
      "globalName",
      "globalRoom",
      "globalPlayerList",
      "joinedRoomByURL"
    ]),
    indexOfPlayer() {
      return this.$store.getters.getIndexOfPlayer;
    }
  },
  methods: {
    // Go back to Home view
    goToHome() {
      this.$router.push({ name: "Home" });
    },
    // Clicking Join Game
    joinGame() {
      if (this.name.trim()) {
        store.commit("setGlobalName", { name: this.name.trim() });
        this.$socket.client.emit(
          "joinGame",
          this.name.trim(),
          this.$route.params.room
        );
      }
    },
    // Clicking Quit Game
    quitGame() {
      // Cleanup remove global variables. Send socket to remove player
      this.$socket.client.emit("leaveGame", this.globalRoom);
      store.commit("resetAllGlobalVariables");
      this.$router.push({ name: "Home" });
    }
  },
  watch: {
    // Used to display Copied after clicking the room id
    watchCopy() {
      const l = this.watchCopy;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.watchCopy = null;
    }
  },
  sockets: {
    duplicateNameFound() {
      this.showDuplicateNameFound = true;
    },
    roomIsFull() {
      this.showRoomIsFull = true;
    }
  },

  beforeCreate() {
    // If you try to join a room using the URL, we need to first check if that room actually exists first.
    this.$socket.client.emit(
      "checkIfRoomExistsWhenJoinByUrl",
      this.$route.params.room
    );
  }
};
</script>
