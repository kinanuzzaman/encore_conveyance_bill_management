<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';
// import { showNotification } from "src/helpers/notification"
export default defineComponent({
  name: 'App',
  mounted() {
    // this.$socket.on("NEW_NOTIFICATION", () => {
    //   showNotification("You have new notification")
    // });
    // this.$socket.on("NEW_GENERAL_NOTIFICATION", () => {
    //   showNotification("You have new notification")
    // });
  }
});
</script>
