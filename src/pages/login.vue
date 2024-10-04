<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="width: 400px">
      <q-card>
        <q-card-section>
          <div class="text-h6 q-mb-md">Login</div>
          <q-input
            v-model="email"
            label="Email"
            type="email"
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
            filled
          />
          <q-input
            v-model="password"
            label="Password"
            type="password"
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
            filled
          />
        </q-card-section>

        <q-card-actions>
          <q-btn @click="login" label="Login" color="primary" />
        </q-card-actions>
      </q-card>
    </div>
    <q-footer class="bg-primary text-white">
      <q-toolbar class="q-pt-md q-pb-md">
        <q-toolbar-title> &copy; 2024 Value Plus </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      localStorage.setItem("isLoggedIn", "true");
      this.$router.push("/cadastro");
      /*       if (this.email === "admin" && this.password === "admin") {
        // Salva o estado de login no localStorage
        localStorage.setItem("isLoggedIn", "true");
        this.$router.push("/cadastro");
      } else {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Credenciais inválidas",
          icon: "warning",
        });
      } */
    },
  },
};
</script>

<style scoped>
.q-card {
  max-width: 400px;
  margin: auto;
}
</style>
