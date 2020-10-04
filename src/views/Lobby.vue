<template>
  <div>
    <div v-if="joinedRoomByURL" class="text-center" max-width="425">
      <h1>Joining {{ this.$route.params.room }}</h1>
      <v-card class="pl-3 pr-3 pt-5 pb-5 mt-5">
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

        <v-btn class="primary" large @click="joinGame">Join</v-btn>
        <v-btn class="primary" large @click="goToHome">Back</v-btn>

        <!-- Snackbar Warnings -->
        <v-snackbar v-model="showDuplicateNameFound" :timeout="3000">
          Duplicate name found. Please choose a different name.
          <template v-slot:action="{ attrs }">
            <v-btn color="red" text v-bind="attrs" @click="showDuplicateNameFound = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>

        <v-snackbar v-model="showRoomIsFull" :timeout="3000">
          Room is full!
          <template v-slot:action="{ attrs }">
            <v-btn color="red" text v-bind="attrs" @click="showRoomIsFull = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-card>
    </div>

    <!-- Actual Lobby -->
    <div v-if="!joinedRoomByURL" class="text-center">
      <h1>deception: murder in hong kong</h1>
      <h2 v-if="globalPlayerList.length < 4">
        game requires a minimum of 4 players
      </h2>
      <h2 v-if="globalPlayerList.length >= 4">
        game has a maximum capacity of 12 players
      </h2>
      <h3>room code:</h3>
      <v-btn
        rounded
        x-large
        color="secondary"
        v-clipboard:copy="globalRoom"
        :loading="copied"
        :disabled="copied"
        @click="loader = 'copied'"
      >
        {{ globalRoom }}
        <template v-slot:loader>
          <span>Copied!</span>
        </template>
      </v-btn>

      <v-card class="mx-auto" max-width="300" tile>
        <v-list disabled>
          <v-subheader>Players</v-subheader>
          <v-list-item-group v-model="indexOfPlayer" color="primary">
            <v-list-item v-for="(player, i) in globalPlayerList" :key="i">
              <v-list-item-title v-text="player" style="text-align:left"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-if="i == 0" color="blue" right>
                  mdi-crown
                </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>

      <v-card class="mx-auto" max-width="300">
        <v-checkbox
          v-model="randomiseForensicScientist"
          label="Randomise Forensic Scientist?"
          :disabled="indexOfPlayer != 0"
        ></v-checkbox>
        <v-select
          v-show="!randomiseForensicScientist"
          outlined
          :items="globalPlayerList"
          label="Pick Forensic Scientist"
          :disabled="indexOfPlayer != 0"
          v-model="currentForensicScientist"
        ></v-select>
        <h4>Additional Roles (optional for > 6 players)</h4>
        <v-checkbox
          v-model="addAccomplice"
          label="Add Accomplice"
          :disabled="globalPlayerList.length < 6 || indexOfPlayer != 0"
        ></v-checkbox>
        <v-checkbox
          v-model="addWitness"
          label="Add Witness"
          :disabled="globalPlayerList.length < 6 || indexOfPlayer != 0"
        ></v-checkbox>

        <h4>Number of Cards Per Player</h4>
        <v-subheader>Means Cards</v-subheader>
        <v-card-text>
          <v-slider
            :disabled="indexOfPlayer != 0"
            v-model="numberOfCards"
            :tick-labels="cardLabels"
            :max="6"
            step="1"
            ticks="always"
            tick-size="3"
            persistent-hint
            :hint="
              numberOfCards < 3
                ? 'Easier for Investigators'
                : numberOfCards > 3
                ? 'Harder for Investigators'
                : 'Default'
            "
          >
          </v-slider>
        </v-card-text>
        <v-subheader>Clue Cards</v-subheader>
        <v-card-text>
          <v-slider
            :disabled="indexOfPlayer != 0"
            v-model="numberOfCards"
            :tick-labels="cardLabels"
            :max="6"
            step="1"
            ticks="always"
            tick-size="3"
            persistent-hint
            :hint="
              numberOfCards < 3
                ? 'Easier for Investigators'
                : numberOfCards > 3
                ? 'Harder for Investigators'
                : 'Default'
            "
          >
          </v-slider>
        </v-card-text>
      </v-card>

      <v-btn class="primary" large :disabled="globalPlayerList.length < 4 || indexOfPlayer != 0" @click="startGame"
        >Start</v-btn
      >
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
      copied: false,

      randomiseForensicScientist: false,
      currentForensicScientist: "",
      addAccomplice: false,
      addWitness: false,
      numberOfCards: 3, // This refers to the index
      cardLabels: ["1", "2", "3", "4", "5", "6", "7"]
    };
  },
  computed: {
    // Get all global states from the vuex store
    ...mapState(["globalName", "globalRoom", "globalPlayerList", "joinedRoomByURL"]),
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
        this.$socket.client.emit("joinGame", this.name.trim(), this.$route.params.room);
      }
    },
    // Clicking Start Game
    startGame() {
      this.$socket.client.emit("startGame", this.globalRoom);
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
    // When we join the lobby from URL, we want to get the current lobby states
    joinedRoomByURL(newVal) {
      if (newVal == false) {
        this.$socket.client.emit("getLobbyState", this.globalRoom);
      }
    },
    // Used to display Copied after clicking the room id
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    },
    // When each lobby state changes, change it for all clients in room
    randomiseForensicScientist() {
      if (this.indexOfPlayer == 0) {
        this.$socket.client.emit("setLobbyState", {
          room: this.globalRoom,
          type: "randomiseForensicScientist",
          state: this.randomiseForensicScientist
        });
      }
    },
    currentForensicScientist() {
      if (this.indexOfPlayer == 0) {
        this.$socket.client.emit("setLobbyState", {
          room: this.globalRoom,
          type: "currentForensicScientist",
          state: this.currentForensicScientist
        });
      }
    },
    addAccomplice() {
      if (this.indexOfPlayer == 0) {
        this.$socket.client.emit("setLobbyState", {
          room: this.globalRoom,
          type: "addAccomplice",
          state: this.addAccomplice
        });
      }
    },
    addWitness() {
      if (this.indexOfPlayer == 0) {
        this.$socket.client.emit("setLobbyState", {
          room: this.globalRoom,
          type: "addWitness",
          state: this.addWitness
        });
      }
    },
    numberOfCards() {
      if (this.indexOfPlayer == 0) {
        this.$socket.client.emit("setLobbyState", {
          room: this.globalRoom,
          type: "numberOfCards",
          state: this.numberOfCards
        });
      }
    }
  },
  sockets: {
    // Snackbar warnings
    duplicateNameFound() {
      this.showDuplicateNameFound = true;
    },
    // Snackbar warnings
    roomIsFull() {
      this.showRoomIsFull = true;
    },
    // Update the lobby states
    newLobbyState(data) {
      this.randomiseForensicScientist = data.randomiseForensicScientist;
      this.currentForensicScientist = data.currentForensicScientist;
      this.addAccomplice = data.addAccomplice;
      this.addWitness = data.addWitness;
      this.numberOfCards = data.numberOfCards;
    }
  },

  beforeCreate() {
    // If you try to join a room using the URL, we need to first check if that room actually exists
    this.$socket.client.emit("checkIfRoomExistsWhenJoinByUrl", this.$route.params.room);
  },

  mounted() {
    // When you create a game, or join a game from the home page it calls mounted since we are creating this lobby view for the first time.
    // When we come from the home view, we need to update the lobby states. When you create a game, you want to ensure select forensic scientist
    // is set to the room creator, when you join a game from home view, you want to update these lobby states.
    if (this.joinedRoomByURL == false) {
      this.$socket.client.emit("getLobbyState", this.globalRoom);
    }
  }
};
</script>
