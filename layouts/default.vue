<!-- Please remove this file from your project -->
<template>
  <div>
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
    <TheSidenav :show="displaySidenav" @close="displaySidenav = false" />

    <nuxt />
  </div>
</template>

<script>
import TheHeader from "~/components/Navigation/TheHeader.vue";
import TheSidenav from "~/components/Navigation/TheSidenav.vue";
import { ref } from "@nuxtjs/composition-api";
export default {
  name: "NuxtTutorial",
  components: { TheHeader, TheSidenav },
  setup() {
    let displaySidenav = ref(false);
    return { displaySidenav };
  },
};
</script>
<style>
html {
  font-family: "Open Sans", "sans-serif";
}

body {
  margin: 0;
}
</style>
