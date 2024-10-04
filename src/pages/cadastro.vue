<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <!-- Combobox de Multiseleção para adicionar novos cartões -->
      <div class="q-pa-md">
        <q-form @submit="addCards">
          <q-select
            v-model="cards"
            :options="availableCards"
            label="Selecione os Cartões"
            outlined
            multiple
            use-input
            fill-input
            @new-value="addNewCard"
          />
        </q-form>
      </div>
      <!-- Carousel -->
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="400px"
        class="bg-primary text-white shadow-1 rounded-borders new-color"
      >
        <q-carousel-slide
          v-for="(card, index) in cards"
          :key="index"
          :name="card.value"
          class="column no-wrap flex-center"
        >
          <img :src="getCardImage(card.value)" alt="card.label" class="card-image" />
          <q-icon :name="card.name" size="56px" />
          <div class="q-mt-md text-center">
            {{ card.value }}
          </div>
        </q-carousel-slide>
      </q-carousel>
      <!-- Benefícios do Cartão -->
      <div v-if="currentCard" class="q-mt-lg card-benefits">
        <h3>Benefícios de {{ currentCard.label }}:</h3>
        <ul>
          <li
            v-for="(benefit, index) in currentBenefits"
            :key="index"
            class="benefit-item"
          >
            <q-icon name="check_circle" color="green" class="benefit-icon" />
            <span>{{ benefit }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const cards = ref([{ label: "MasterCard C6 Black", value: "c6carbon" }]);
    const slide = ref("c6carbon");
    const selectedCards = ref([]);
    const availableCards = ref([
      { label: "MasterCard C6 Black", value: "c6carbon" },
      { label: "XP Visa Infinite", value: "xp_visa_infinite" },
      { label: "Elo", value: "elo" },
      { label: "American Express", value: "amex" },
      { label: "Discover", value: "discover" },
    ]);

    const cardBenefits = {
      c6carbon: [
        "Sem anuidade",
        "Cashback em todas as compras",
        "Acesso ao programa LoungeKey",
      ],
      xp_visa_infinite: [
        "Investimento mínimo de R$50 mil",
        "Isenção de taxas",
        "Acesso à Sala VIP",
      ],
      elo: ["Descontos em parceiros", "Seguro viagem", "Assistência 24h"],
      amex: [
        "Pontos que não expiram",
        "Serviço concierge",
        "Acesso ao programa Membership Rewards",
      ],
      discover: [
        "Proteção contra fraudes",
        "Descontos em compras internacionais",
        "Atendimento preferencial",
      ],
    };

    const addCards = () => {
      selectedCards.value.forEach((cardValue) => {
        if (!cards.value.find((card) => card.value === cardValue)) {
          const newCard = availableCards.value.find((card) => card.value === cardValue);
          if (newCard) {
            cards.value.push(newCard);
          }
        }
      });
      selectedCards.value = [];
    };

    const addNewCard = (cardName) => {
      const newCard = { label: cardName, value: cardName.toLowerCase() };
      availableCards.value.push(newCard);
      selectedCards.value.push(newCard.value);
    };

    const getCardImage = (cardValue) => {
      const isLocalhost = window.location.hostname === "localhost";
      const basePath = isLocalhost ? "/assets/cards/" : "/value-plus/assets/cards/";
      return `${basePath}${cardValue}.png`;
    };

    const currentCard = computed(() => {
      return cards.value.find((card) => card.value === slide.value);
    });

    const currentBenefits = computed(() => {
      return cardBenefits[slide.value] || [];
    });

    return {
      cards,
      slide,
      selectedCards,
      availableCards,
      addCards,
      addNewCard,
      getCardImage,
      currentCard,
      currentBenefits,
    };
  },
};
</script>

<style scoped>
.new-color {
  color: #00d09e;
}

.card-image {
  width: 300px;
  height: 200px;
  object-fit: contain;
  background-color: transparent;
}

.card-benefits {
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
}

.card-benefits h3 {
  margin-bottom: 8px;
}

.card-benefits ul {
  padding-left: 20px;
}

.benefit-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.benefit-icon {
  margin-right: 8px;
}
</style>
