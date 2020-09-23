<template>
  <div>
    <CreateGame />
  </div>
</template>

<script>
// @ is an alias to /src
import CreateGame from "@/components/CreateGame.vue";

export default {
  name: "create",
  components: {
    CreateGame
  }
};
</script>
