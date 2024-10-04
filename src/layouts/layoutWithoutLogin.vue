<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const isLocalhost = window.location.hostname === "localhost";
console.log("isLocalhost", isLocalhost);
const baseUrl = isLocalhost
  ? "http://localhost:8080"
  : "https://raphacassari.github.io/value-plus";

export default {
  name: "layoutWithoutLogin",
  components: {
    EssentialLink,
  },
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
};
</script>
