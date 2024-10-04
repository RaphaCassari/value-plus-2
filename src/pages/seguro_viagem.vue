<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Consultor de Benefícios de Seguro Viagem</div>
        <q-separator />
        <q-form @submit.prevent="checkBenefits">
          <q-input
            v-model="travelDate"
            label="Data da Viagem"
            type="date"
            :rules="[(val) => (val && val.length > 0) || 'Data é obrigatória']"
            class="q-mb-md"
          />
          <q-input
            v-model="arrivalTime"
            label="Horário de Chegada"
            type="time"
            :rules="[(val) => (val && val.length > 0) || 'Horário é obrigatória']"
            class="q-mb-md"
          />
          <q-input
            v-model="destination"
            label="Destino da Viagem"
            :rules="[(val) => (val && val.length > 0) || 'Destino é obrigatório']"
            class="q-mb-md"
          />
          <q-btn type="submit" label="Consultar Benefícios" color="primary" />
        </q-form>
        <q-separator />
        <q-card-section>
          <div v-if="benefits.length">
            <q-list>
              <q-item
                v-for="benefit in benefits"
                :key="benefit.title"
                clickable
                class="benefit-item"
              >
                <q-item-section>
                  <q-item-label class="benefit-title">{{ benefit.title }}</q-item-label>
                  <q-item-label class="benefit-details">{{
                    benefit.details
                  }}</q-item-label>
                  <q-item-label class="benefit-conditions">{{
                    benefit.conditions
                  }}</q-item-label>
                  <q-item-label class="benefit-notification">{{
                    benefit.notification
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div v-else>
            <q-banner class="bg-grey-2 text-grey-8">
              <q-icon name="info" />
              <span>Preencha os campos para ver os benefícios.</span>
            </q-banner>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-banner class="concierge-banner">
            <q-icon name="info" />
            <span
              >Benefício de Concierge: Podemos ajudar a reservar hotéis, criar roteiros e
              muito mais!</span
            >
          </q-banner>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      travelDate: "",
      arrivalTime: "",
      destination: "",
      benefits: [],
    };
  },
  methods: {
    checkBenefits() {
      this.benefits = this.getBenefits(
        this.travelDate,
        this.arrivalTime,
        this.destination
      );
      this.scheduleNotification();
    },
    getBenefits(date, arrivalTime, destination) {
      return [
        {
          title: "Cobertura de Emergência Médica",
          details:
            "Ideal para qualquer viagem internacional para cobrir emergências médicas.",
          conditions: "Válido para viagens de mais de 3 dias.",
          notification: `Você deve acionar este benefício se ocorrerem emergências médicas durante a viagem. Caso precise, entre em contato imediatamente.`,
        },
        {
          title: "Assistência em Caso de Cancelamento de Viagem",
          details:
            "Recomendado para viagens que podem ser canceladas devido a imprevistos.",
          conditions:
            "Aplicável se o cancelamento for notificado com 48 horas de antecedência.",
          notification: `Você será notificado 48 horas antes da data de viagem caso precise cancelar. Garanta que notifique com antecedência se necessário.`,
        },
        {
          title: "Assistência Jurídica",
          details:
            "Cobertura para assistência jurídica em caso de problemas legais no destino.",
          conditions: "Disponível em países selecionados.",
          notification: `Se você encontrar problemas legais, acione este benefício imediatamente. Tenha os detalhes da assistência disponíveis.`,
        },
        {
          title: "Seguro de Bagagem Perdida",
          details: "Cobertura para bagagem perdida ou atrasada durante a viagem.",
          conditions: "Cobertura de até $1.000 por bagagem.",
          notification: `Se sua bagagem não chegar a tempo ou for perdida, este benefício cobre até $1.000. Notifique a companhia aérea e acione o seguro.`,
        },
        {
          title: "Seguro Contra Atraso de Voo",
          details: "Cobertura para compensação em caso de atraso significativo do voo.",
          conditions: "Aplica-se a atrasos superiores a 4 horas.",
          notification: `Você receberá uma notificação se o seu voo estiver atrasado por mais de 4 horas. Certifique-se de acionar o seguro para obter compensação.`,
        },
        {
          title: "Benefício de Concierge",
          details: "Ajudamos a reservar hotéis, criar roteiros e muito mais!",
          conditions: "Disponível para viagens acima de 7 dias.",
          notification: `Você pode usar o benefício de concierge para planejar sua viagem. Entre em contato com o serviço de concierge para assistência.`,
        },
      ];
    },
    scheduleNotification() {
      if ("Notification" in window && "serviceWorker" in navigator) {
        const travelDateTime = new Date(
          `${this.travelDate}T${this.arrivalTime}:00`
        ).getTime();
        const now = Date.now();
        const delay = travelDateTime - now;

        if (delay > 0) {
          setTimeout(() => {
            this.showNotification();
          }, delay);
        }
      }
    },
    showNotification() {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          registration.showNotification("Lembrete de Viagem", {
            body: "Chegou a hora de sua viagem! Verifique seus benefícios de seguro.",
            icon: "statics/icons/icon-128x128.png",
            vibrate: [200, 100, 200],
            tag: "viagem-notificacao",
            renotify: true,
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.q-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.my-card {
  max-width: 900px;
  margin: auto;
  border-radius: 12px;
  overflow: hidden;
}

.q-card-section {
  padding: 20px;
}

.benefit-item {
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.benefit-title {
  font-weight: bold;
  color: #333;
}

.benefit-details {
  margin-top: 5px;
  color: #555;
}

.benefit-conditions {
  margin-top: 5px;
  color: #888;
}

.benefit-notification {
  margin-top: 5px;
  color: #007bff;
}

.concierge-banner {
  background-color: #e9ecef;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
}
</style>
