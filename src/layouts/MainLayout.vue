<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="new-color">
        <!--         <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->
        <q-toolbar-title> Value Plus </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-2 q-py-none">
      <div class="footer-menu q-mx-lg q-py-md">
        <q-tabs
          align="justify"
          class="text-grey-8"
          active-color="primary"
          indicator-color="transparent"
        >
          <q-tab
            v-for="link in essentialLinks"
            :key="link.title"
            :icon="link.icon"
            @click="navigateTo(link.link)"
            class="menu-tab"
          />
        </q-tabs>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const isLocalhost = window.location.hostname === "localhost";
const baseUrl = isLocalhost
  ? "http://localhost:8080"
  : "https://raphacassari.github.io/value-plus";

const linksData = [
  {
    title: "Cadastro",
    icon: "home",
    link: `/cadastro`,
  },
  {
    title: "Rede de Parceiros",
    icon: "chat",
    link: `/parceiros`,
  },
  {
    title: "Seguro Proteção de Preço",
    icon: "credit_card",
    link: `/cadastro_compras`,
  },
  {
    title: "Dashboard",
    icon: "notebook",
    link: `/menu`,
  },
];

export default {
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      baseUrl,
    };
  },
  methods: {
    navigateTo(link) {
      this.$router.push(link);
    },
  },
};
</script>

<style scoped>
.new-color {
  background-color: #00d09e;
}

.q-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #00d09e;
}

.footer-menu {
  display: flex;
  justify-content: space-around;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
  padding: 20px 0;
}

.menu-tab {
  padding: 15px;
  font-size: 28px;
  color: #00d09e;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-tab .q-icon {
  font-size: 40px;
}

.menu-tab.q-tab--active {
  color: #00d09e;
}
</style>
