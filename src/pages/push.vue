<template>
  <q-page>
    <div>
      <h1>Bem-vindo à sua PWA com Quasar!</h1>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "App",

  mounted() {
    // Verifica se o navegador suporta notificações
    if ("Notification" in window && "serviceWorker" in navigator) {
      this.requestNotificationPermission();
    }
  },

  methods: {
    requestNotificationPermission() {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // Inicia o timer de 10 segundos
          setTimeout(() => {
            this.showNotification();
          }, 10000);
        }
      });
    },

    showNotification() {
      // Mostra a notificação
      navigator.serviceWorker.getRegistration().then((registration) => {
        console.log(registration);
        if (registration) {
          registration.showNotification("Notificação Quasar", {
            body: "10 segundos se passaram desde que a página foi aberta!",
            icon: "statics/icons/icon-128x128.png", // caminho para o ícone da notificação
            vibrate: [200, 100, 200],
            tag: "tempo-passado",
            renotify: true,
          });
        }
      });
    },
  },
};
</script>

<style>
/* Estilize a página como desejar */
</style>
