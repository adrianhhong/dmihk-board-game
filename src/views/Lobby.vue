<template>
  <div>
    <h1>Yep.</h1>
    <div class="text-center">
      <v-btn rounded color="primary" dark> {{ globalRoom }}</v-btn>
    </div>

    <v-card class="mx-auto" max-width="300" tile>
      <v-list disabled>
        <v-subheader>Players</v-subheader>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <!-- <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon> -->
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "lobby",
  data() {
    return {
      item: 0,
      items: [
        { text: "me", icon: "mdi-clock" },
        { text: "Audience", icon: "mdi-account" },
        { text: "Conversions", icon: "mdi-flag" }
      ]
    };
  },
  computed: mapState(["globalName", "globalRoom", "globalPlayerList"])
};
</script>
