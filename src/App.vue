<template>
  <v-app>
    <v-main>
      <HomeDetails />
    </v-main>
  </v-app>
</template>

<script>
import HomeDetails from "./components/HomeDetails";

export default {
  name: "App",

  components: {
    HomeDetails
  },

  data: () => ({
    //
  })
};
</script>
