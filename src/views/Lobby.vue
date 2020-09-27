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
        :loading="loading"
        :disabled="loading"
        @click="loader = 'loading'"
      >
        {{ globalRoom }}
        <!-- <v-icon size: small>
          mdi-content-copy
        </v-icon> -->

        <template v-slot:loader>
          <span>Copied!</span>
        </template>
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
      loader: null,
      loading: false
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
    goToHome() {
      this.$router.push({ name: "Home" });
    },
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
    quitGame() {
      // Cleanup
      this.$router.push({ name: "Home" });
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
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
    // Need to check if the room actually exists!
    this.$socket.client.emit(
      "checkIfRoomExistsWhenJoinByUrl",
      this.$route.params.room
    );
  }
};
</script>
