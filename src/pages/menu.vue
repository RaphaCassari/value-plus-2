<template>
  <q-page>
    <div class="menu-grid q-pa-md">
      <q-btn
        v-for="(menuItem, index) in menuItems"
        :key="index"
        :label="menuItem.label"
        :icon="menuItem.icon"
        class="menu-item"
        @click="goToPage(menuItem.page)"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { label: "Home", icon: "home", page: "/cadastro/" },
        { label: "Parceiros", icon: "group", page: "/parceiros/" },
        { label: "Compras", icon: "shopping_cart", page: "/cadastro_compras/" },
        {
          label: "Aluguel Carro",
          icon: "directions_car",
          page: "/viagens/aluguel_carro",
        },
        { label: "Seguro Viagem", icon: "verified_user", page: "/viagens/seguro_viagem" },
        { label: "Dashboard", icon: "dashboard", page: "/dashboard" },
        { label: "Viagens", icon: "flight", page: "/viagens/" },
        { label: "Milhas", icon: "stars", page: "/viagens/milhas" },
        { label: "Sair", icon: "logout", page: "/" },
      ],
    };
  },
  methods: {
    goToPage(page) {
      this.$router.push(page);
    },
  },
};
</script>
<style scoped>
.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 15px; /* Espaço entre os blocos */
  height: calc(
    100vh - 200px
  ); /* Altura da grid menos a altura do cabeçalho ou espaço adicional */
  align-items: center; /* Alinha verticalmente o conteúdo no centro */
  justify-items: center; /* Alinha horizontalmente o conteúdo no centro */
  padding: 20px; /* Espaçamento interno */
}

.menu-item {
  width: 105px; /* Largura dos blocos */
  height: 105px; /* Altura dos blocos */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
  color: white;
  background-color: #3f51b5;
  border-radius: 8px;
}
</style>
