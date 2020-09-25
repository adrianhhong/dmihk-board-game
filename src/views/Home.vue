<template>
  <div>
    <!-- HOME PAGE -->
    <div v-if="!showCreate && !showJoin">
      <v-card>
        <v-btn class="primary" large @click="showCreate = true"
          >Create Game</v-btn
        >
        <v-btn class="primary" large @click="showJoin = true">Join Game</v-btn>
      </v-card>
    </div>

    <!-- CREATE PAGE -->
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
        <v-btn class="primary" large @click="showCreate = showJoin = false"
          >Back
        </v-btn>
      </v-card>
    </div>

    <!-- JOIN PAGE -->
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

        <v-alert
          text
          dense
          dismissible
          type="error"
          :value="showDuplicateNameFound"
        >
          Duplicate name found! Please choose a different name.
        </v-alert>

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

        <v-alert
          text
          dense
          dismissible
          type="error"
          :value="showRoomNotFound"
          transition="slide-y-transition"
        >
          Game not found!
        </v-alert>

        <v-alert text dense dismissible type="error" :value="showRoomIsFull">
          Room is full!
        </v-alert>

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
      // Show and hide views
      showCreate: false,
      showJoin: false,
      // Name and Room variables
      name: "",
      room: "",
      // Input rules
      nameRules: [value => !!value || "Please enter a name."],
      roomRules: [
        value => !!value || "Please enter a Room ID."
        // value => (value && value.length >= 3) || "A Room ID is 4 characters"
      ],
      // Show and hide alerts
      showRoomNotFound: false,
      showDuplicateNameFound: false,
      showRoomIsFull: false
    };
  },
  methods: {
    createGame() {
      if (this.name.trim()) {
        this.$socket.client.emit("createGame", this.name);
      }
    },
    joinGame() {
      if (this.name.trim() && this.room.trim()) {
        this.$socket.client.emit("joinGame", this.name, this.room);
      }
    },
    hide_alert(alertNumber) {
      window.setInterval(() => {
        if (alertNumber == 1) {
          this.showRoomNotFound = false;
        }
        if (alertNumber == 2) {
          this.showDuplicateNameFound = false;
        }
        if (alertNumber == 3) {
          this.showRoomIsFull = false;
        }

        console.log("hide alert after 3 seconds");
      }, 3000);
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
      this.hide_alert(1);
    },
    duplicateNameFound() {
      this.showDuplicateNameFound = true;
      this.hide_alert(2);
    },
    roomIsFull() {
      this.showRoomIsFull = true;
      this.hide_alert(3);
    }
  }
};
</script>
