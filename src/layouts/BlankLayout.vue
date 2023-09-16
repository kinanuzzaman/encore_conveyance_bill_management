<template>
  <!-- view="lHh Lpr lFf" -->
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'BlankLayout',
  mounted() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("🚀 ~ file: MainLayout.vue:271 ~ navigator.geolocation.getCurrentPosition ~ position:", position)
    });
  },

  setup() {
    return {
    }
  }
})
</script>
