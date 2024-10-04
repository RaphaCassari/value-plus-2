<template>
  <q-page class="bg-grey-2">
    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <img src="https://via.placeholder.com/150x50" alt="Logo" />
        </q-toolbar-title>
        <q-btn flat label="Acessar" to="/cadastro" class="q-hidden-xs q-hidden-sm" />
        <!-- <q-btn icon="menu" flat @click="toggleDrawer" class="q-hidden-md-and-up" /> -->
      </q-toolbar>
    </q-header>

    <!-- Hero Section -->
    <div class="hero-section flex flex-center text-center q-pa-md">
      <div class="blur-box q-pa-xs q-pa-md-md-up">
        <h1 class="q-mb-md text-h4 text-h2-md-up">
          Maximize os Benefícios do seu Cartão de Crédito
        </h1>
        <p class="q-mb-lg q-body-1 q-body-2-md-up">
          Aprenda a usar seus cartões de crédito para obter o máximo de vantagens, desde
          milhas aéreas até cashback!
        </p>
        <!--         <div class="flex flex-column flex-md-row justify-center q-mt-md">
          <q-btn
            unelevated
            color="primary"
            size="md"
            class="q-mb-sm q-mb-none-md q-mr-md-md"
            >Comece Agora</q-btn
          >
          <q-btn
            unelevated
            color="secondary"
            class="q-mb-sm q-mb-none-md q-mr-md-md"
            size="md"
            >Saiba Mais</q-btn
          >
        </div> -->
      </div>
    </div>

    <!-- Benefits Section -->
    <q-section class="q-pa-md text-center">
      <h2 class="q-mb-lg text-h4 text-h3-md-up">Principais Benefícios</h2>
      <q-card class="q-mb-md" v-for="benefit in benefits" :key="benefit.title">
        <q-card-section>
          <q-icon :name="benefit.icon" size="lg" class="q-mb-sm" />
          <h3 class="text-h6 text-h5-md-up">{{ benefit.title }}</h3>
          <p class="q-body-1 q-body-2-md-up">{{ benefit.description }}</p>
        </q-card-section>
      </q-card>
    </q-section>

    <!-- How It Works Section -->
    <q-section class="q-pa-md bg-grey-1 text-center">
      <h2 class="q-mb-lg text-h4 text-h3-md-up">Como Funciona</h2>
      <q-card class="q-mb-md">
        <q-card-section>
          <q-icon name="school" size="lg" class="q-mb-sm" />
          <h3 class="text-h6 text-h5-md-up">Educacional</h3>
          <p class="q-body-1 q-body-2-md-up">
            Oferecemos conteúdos educativos para que você entenda todos os detalhes dos
            benefícios do seu cartão.
          </p>
        </q-card-section>
      </q-card>
      <q-card class="q-mb-md">
        <q-card-section>
          <q-icon name="trending_up" size="lg" class="q-mb-sm" />
          <h3 class="text-h6 text-h5-md-up">Otimização</h3>
          <p class="q-body-1 q-body-2-md-up">
            Ajudamos você a maximizar os seus ganhos com estratégias simples e eficazes.
          </p>
        </q-card-section>
      </q-card>
    </q-section>

    <!-- Footer -->
    <!--     <q-footer class="bg-primary text-white">
      <q-toolbar class="q-pt-md q-pb-md">
        <q-toolbar-title class="text-subtitle1"> &copy; 2024 Value Plus </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-page>
</template>

<script setup>
const benefits = [
  {
    icon: "flight",
    title: "Milhas Aéreas",
    description: "Ganhe milhas para viagens com cada compra.",
  },
  {
    icon: "local_offer",
    title: "Descontos Exclusivos",
    description: "Aproveite descontos em lojas parceiras.",
  },
  {
    icon: "money",
    title: "Cashback",
    description: "Receba uma parte do seu dinheiro de volta.",
  },
];

function toggleDrawer() {
  // Lógica para abrir/fechar menu lateral, se necessário
}
</script>

<style scoped>
.bg-grey-2 {
  background-color: #f0f0f0;
}

.hero-section {
  background: url("https://img.freepik.com/vetores-gratis/fundo-de-pagamento-com-cartao-de-credito-digital-em-estilo-de-tecnologia-rapida_1017-30674.jpg")
    no-repeat center center;
  background-size: cover;
  height: 300px;
  color: white;
}

img {
  height: 40px;
}

.blur-box {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  display: inline-block;
}
</style>
