<template>
  <div class="home">
    <HomeDetails />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeDetails from "@/components/HomeDetails.vue";

export default {
  name: "Home",
  components: {
    HomeDetails
  }
};
</script>
