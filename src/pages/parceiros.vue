<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="text-h6">Mapa com Localização Atual e Parceiros</div>
      </q-card-section>
      <q-card-section>
        <div id="map" class="map-container"></div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Parceiros Disponíveis</div>
        <q-input
          filled
          v-model="searchQuery"
          placeholder="Buscar Parceiros"
          class="q-my-md"
          debounce="300"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-list bordered>
          <q-item
            v-for="partner in filteredPartners"
            :key="partner.name"
            clickable
            @click="showPartnerDetails(partner)"
          >
            <q-item-section>
              <div class="q-flex q-items-center">
                <q-icon name="place" color="blue" class="q-mr-sm" />
                <div class="text-h6">{{ partner.name }}</div>
              </div>
              <div>{{ partner.address }}</div>
              <div>{{ partner.contact }}</div>
              <div>Distância: {{ calculateDistance(partner.lat, partner.lng) }} km</div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Atualizar Localização" @click="getLocation" />
      </q-card-actions>
    </q-card>

    <!-- Modal para promoções -->
    <q-dialog v-model="showPromoModal" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Promoção Especial</div>
          <div v-html="promoMessage" class="q-mt-md"></div>
          <div class="q-mt-md">
            <div class="text-subtitle1">Promoções com Cartões Selecionados:</div>
            <ul>
              <li v-for="promotion in selectedPartner.promotions" :key="promotion.card">
                <strong>{{ promotion.card }}:</strong> {{ promotion.details }}
              </li>
            </ul>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Fechar" @click="showPromoModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal para detalhes do parceiro -->
    <q-dialog v-model="showPartnerModal" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ selectedPartner.name }}</div>
          <div>Endereço: {{ selectedPartner.address }}</div>
          <div>Contato: {{ selectedPartner.contact }}</div>
          <div>Horário de Funcionamento: {{ selectedPartner.hours }}</div>
          <div class="q-mt-md">
            <div class="text-subtitle1">Promoções com Cartões Selecionados:</div>
            <ul>
              <li v-for="promotion in selectedPartner.promotions" :key="promotion.card">
                <strong>{{ promotion.card }}:</strong> {{ promotion.details }}
              </li>
            </ul>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Fechar" @click="showPartnerModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Dialog } from "quasar";

export default {
  data() {
    return {
      map: null,
      userMarker: null,
      error: null,
      searchQuery: "",
      partners: [
        {
          name: "Phibit Innovation",
          lat: -23.649122,
          lng: -46.711662,
          address: "Rua Ada Negri, 220",
          contact: "Telefone: (11) 1234-5678",
          hours: "Seg-Sex: 09:00 - 18:00",
          promotions: [
            {
              card: "C6 Bank",
              details: "15% de desconto na segunda unidade",
            },
            {
              card: "Nubank",
              details: "10% de cashback nas compras acima de R$ 100,00",
            },
          ],
        },
        {
          name: "Fiap",
          lat: -23.574134505882352,
          lng: -46.623086158823526,
          address: "Av. Lins de Vasconcelos, 1222",
          contact: "Telefone: (11) 8765-4321",
          hours: "Seg-Sex: 08:00 - 20:00",
          promotions: [
            {
              card: "C6 Bank",
              details: "20% de desconto em todos os cursos de tecnologia",
            },
            {
              card: "Itaú",
              details: "5% de desconto em cursos de MBA",
            },
          ],
        },
      ],
      promotionDistance: 0.01, // Tolerância em graus para considerar que está na localização do parceiro
      showPromoModal: false,
      promoMessage: "",
      showPartnerModal: false,
      selectedPartner: {},
    };
  },
  computed: {
    filteredPartners() {
      return this.partners.filter(
        (partner) =>
          partner.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          partner.address.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    initMap() {
      this.map = L.map("map").setView([0, 0], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(this.map);

      this.addPartnerMarkers();
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setLocation, this.showError);
      } else {
        this.error = "Geolocalização não é suportada por este navegador.";
      }
    },
    setLocation(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      if (this.userMarker) {
        this.map.removeLayer(this.userMarker);
      }

      this.userMarker = L.marker([lat, lng])
        .addTo(this.map)
        .bindPopup("Você está aqui")
        .openPopup();

      this.map.setView([lat, lng], 12);

      // Verifica se a localização está próxima de algum parceiro
      this.partners.forEach((partner) => {
        if (this.isNearLocation(lat, lng, partner.lat, partner.lng)) {
          // Configura e abre o modal
          this.selectedPartner = partner;
          this.promoMessage = `
            <div>
              <p>Você está perto de ${partner.name}. Aproveite a promoção exclusiva!</p>
              <p><strong>Usando seu cartão C6 Bank, você ganha mais 15% de desconto na segunda unidade.</strong></p>
              <p>Visite-nos e mostre este modal para aproveitar a oferta!</p>
            </div>
          `;
          this.showPromoModal = true;
        }
      });
    },
    isNearLocation(userLat, userLng, partnerLat, partnerLng) {
      return (
        Math.abs(userLat - partnerLat) < this.promotionDistance &&
        Math.abs(userLng - partnerLng) < this.promotionDistance
      );
    },
    addPartnerMarkers() {
      this.partners.forEach((partner) => {
        L.marker([partner.lat, partner.lng])
          .addTo(this.map)
          .bindPopup(`${partner.name}: ${partner.address}`);
      });
    },
    showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.error = "Permissão de localização negada.";
          break;
        case error.POSITION_UNAVAILABLE:
          this.error = "Localização indisponível.";
          break;
        case error.TIMEOUT:
          this.error = "A requisição de localização expirou.";
          break;
        default:
          this.error = "Erro desconhecido.";
          break;
      }
    },
    showPartnerDetails(partner) {
      this.selectedPartner = partner;
      this.showPartnerModal = true;
    },
    calculateDistance(lat, lng) {
      if (!this.userMarker) return "-";

      const userLat = this.userMarker.getLatLng().lat;
      const userLng = this.userMarker.getLatLng().lng;

      const R = 6371; // Raio da Terra em km
      const dLat = ((lat - userLat) * Math.PI) / 180;
      const dLng = ((lng - userLng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((userLat * Math.PI) / 180) *
          Math.cos((lat * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance.toFixed(2);
    },
  },
  mounted() {
    this.initMap();
    this.getLocation();
  },
};
</script>

<style scoped>
.map-container {
  height: 400px;
}
</style>
