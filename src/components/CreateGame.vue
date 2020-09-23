<template lang="html">
  <v-card class="pl-3 pr-3 pt-5 pb-5 mt-5">
    <h3 class="text-xs-center mb-3">Enter a Username</h3>
    <v-text-field
      label="Solo"
      placeholder="Username..."
      v-model="name"
      outline
      single-line
      ref="message"
      @keydown.enter="giveName"
    >
    </v-text-field>
    <v-btn class="primary" large @click="giveName">Start</v-btn>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    giveName() {
      console.log("THe naem is: " + this.name);
      this.$socket.client.emit("createGame", this.name);
    }
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
    customEmit(val) {
      console.log("does it even come here?");
      console.log(val);
    }
  }
};
</script>

<style lang="css"></style>
