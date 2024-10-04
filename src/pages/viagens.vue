<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <q-input v-model="flightNumber" label="Número do Voo" />
        <q-btn @click="fetchFlightData" label="Buscar Voo" color="primary" />
      </q-card-section>
    </q-card>

    <q-card class="q-mt-md" v-if="flights.length > 0">
      <q-card-section>
        <q-table
          :rows="flights"
          :columns="columns"
          row-key="id"
          @row-click="selectFlight"
        />
      </q-card-section>
    </q-card>

    <q-dialog v-model="flightDialog">
      <q-card>
        <q-card-section>
          <div><strong>Origem:</strong> {{ selectedFlight.origin }}</div>
          <div><strong>Destino:</strong> {{ selectedFlight.destination }}</div>
          <div><strong>Data de Partida:</strong> {{ selectedFlight.departureDate }}</div>
          <div><strong>Data de Retorno:</strong> {{ selectedFlight.returnDate }}</div>
          <div><strong>Status:</strong> {{ selectedFlight.status }}</div>
          <div><strong>Atraso:</strong> {{ selectedFlight.delay }} minutos</div>
        </q-card-section>
        <q-card-actions>
          <q-btn @click="flightDialog = false" label="Fechar" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      flightNumber: "",
      flights: [],
      flightDialog: false,
      selectedFlight: {},
      columns: [
        { name: "origin", label: "Origem", align: "left", field: "origin" },
        { name: "destination", label: "Destino", align: "left", field: "destination" },
        {
          name: "departureDate",
          label: "Data de Partida",
          align: "left",
          field: "departureDate",
        },
        {
          name: "returnDate",
          label: "Data de Retorno",
          align: "left",
          field: "returnDate",
        },
        { name: "status", label: "Status", align: "left", field: "status" },
        {
          name: "delay",
          label: "Atraso",
          align: "right",
          field: "delay",
          format: (val) => `${val} min`,
        },
      ],
    };
  },
  methods: {
    async fetchFlightData() {
      try {
        const response = await fetch(
          `https://api.aviationstack.com/v1/flights?access_key=0d6c15ab2d4afd3a7fccc6153729262b&flight_iata=${this.flightNumber}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data && data.data) {
          console.log(data.data);
          this.flights = data.data.map((flight) => ({
            id: flight.iata,
            origin: flight.departure.airport,
            destination: flight.arrival.airport,
            departureDate: flight.departure.estimated,
            returnDate: flight.arrival.estimated,
            status: flight.flight_status,
            delay: flight.departure.delay || 0,
          }));
          console.log(this.flights);
        } else {
          console.error("Dados de voo não encontrados.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do voo:", error);
      }
    },
    selectFlight(flight) {
      this.selectedFlight = flight;
      this.flightDialog = true;
    },
  },
};
</script>

<style scoped>
.q-page {
  max-width: 800px;
  margin: 0 auto;
}
</style>
