<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <q-form @submit.prevent="handleSubmit">
          <div class="q-gutter-md">
            <q-input
              v-model="flightDetails.flightNumber"
              label="Número do Voo"
              required
            />
            <q-input
              v-model="flightDetails.departureDate"
              label="Data e Hora de Partida"
              type="datetime-local"
              required
            />
            <q-input
              v-model="flightDetails.expectedArrivalDate"
              label="Data e Hora de Chegada Esperada"
              type="datetime-local"
              required
            />
            <q-input
              v-model="flightDetails.distance"
              label="Distância (km)"
              type="number"
              required
            />
          </div>
          <q-btn type="submit" label="Salvar" color="primary" />
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-table :rows="flights" :columns="columns" row-key="flightNumber" />
      </q-card-section>
    </q-card>

    <q-dialog v-model="showInsuranceDialog">
      <q-card>
        <q-card-section>
          <p>Seu voo atrasou? Aqui está como você pode acionar o seguro:</p>
          <ul>
            <li>Verifique a política de seguro de atraso da sua companhia aérea.</li>
            <li>Entre em contato com o atendimento ao cliente para relatar o atraso.</li>
            <li>Tenha em mãos seu comprovante de compra e detalhes do voo.</li>
            <li>
              Preencha qualquer formulário necessário e envie os documentos solicitados.
            </li>
          </ul>
          <q-btn @click="showInsuranceDialog = false" label="Fechar" color="primary" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      flightDetails: {
        flightNumber: "",
        departureDate: "",
        expectedArrivalDate: "",
        distance: 0,
      },
      flights: [],
      columns: [
        {
          name: "flightNumber",
          label: "Número do Voo",
          align: "left",
          field: (row) => row.flightNumber,
        },
        {
          name: "departureDate",
          label: "Data e Hora de Partida",
          align: "left",
          field: (row) => row.departureDate,
        },
        {
          name: "expectedArrivalDate",
          label: "Data e Hora de Chegada Esperada",
          align: "left",
          field: (row) => row.expectedArrivalDate,
        },
        {
          name: "miles",
          label: "Milhas Geradas",
          align: "right",
          field: (row) => row.miles,
        },
        {
          name: "delay",
          label: "Atraso (min)",
          align: "right",
          field: (row) => row.delay,
        },
      ],
      showInsuranceDialog: false,
    };
  },
  methods: {
    handleSubmit() {
      // Debugging: Log data to check if the form values are correctly captured
      console.log("Submitting flight details:", this.flightDetails);

      // Cálculo de milhas geradas (1 km = 1 milha por exemplo)
      const milesGenerated = this.flightDetails.distance;

      // Cálculo do atraso
      const departureDate = new Date(this.flightDetails.departureDate);
      const expectedArrivalDate = new Date(this.flightDetails.expectedArrivalDate);
      const currentTime = new Date();
      const delayMinutes = Math.max(0, (currentTime - expectedArrivalDate) / (1000 * 60));

      // Adiciona o voo aos registros
      this.flights.push({
        flightNumber: this.flightDetails.flightNumber,
        departureDate: departureDate.toLocaleString(),
        expectedArrivalDate: expectedArrivalDate.toLocaleString(),
        miles: milesGenerated,
        delay: delayMinutes,
      });

      // Debugging: Log flights array to verify if data is added correctly
      console.log("Flights array:", this.flights);

      // Se o atraso for detectado, mostra a mensagem de seguro
      if (delayMinutes > 0) {
        this.showInsuranceDialog = true;
      }

      // Limpa os campos do formulário
      this.flightDetails = {
        flightNumber: "",
        departureDate: "",
        expectedArrivalDate: "",
        distance: 0,
      };
    },
  },
};
</script>

<style scoped>
.q-page {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
