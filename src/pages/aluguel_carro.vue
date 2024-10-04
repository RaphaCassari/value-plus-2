<template>
  <q-page padding>
    <!-- Seção de Introdução -->
    <q-section class="q-mb-lg">
      <q-card flat bordered class="bg-light q-px-md q-py-lg">
        <q-card-section>
          <h2 class="text-h5">Introdução</h2>
          <p>
            Muitos cartões de crédito oferecem benefícios especiais para aluguel de
            carros, que podem incluir seguro para o veículo, proteção contra danos e
            roubo, além de descontos exclusivos. Descubra como você pode aproveitar ao
            máximo essas vantagens.
          </p>
        </q-card-section>
      </q-card>
    </q-section>

    <!-- Benefícios do Cartão de Crédito -->
    <q-section class="q-mb-lg">
      <q-card flat bordered class="bg-light q-px-md q-py-lg">
        <q-card-section>
          <h2 class="text-h5">Benefícios</h2>
          <q-list bordered>
            <q-item>
              <q-item-section avatar>
                <q-icon name="check_circle" color="green" />
              </q-item-section>
              <q-item-section>
                <span class="text-h6">Seguro para o carro alugado</span>
                <p>Protege contra danos e roubo enquanto você estiver usando o carro.</p>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="check_circle" color="green" />
              </q-item-section>
              <q-item-section>
                <span class="text-h6">Proteção adicional</span>
                <p>
                  Garantia adicional que pode cobrir danos não incluídos no seguro da
                  locadora.
                </p>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="check_circle" color="green" />
              </q-item-section>
              <q-item-section>
                <span class="text-h6">Descontos especiais</span>
                <p>
                  Descontos exclusivos em locação de carros quando pago com o cartão de
                  crédito.
                </p>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-section>

    <!-- Dicas de Utilização -->
    <q-section class="q-mb-lg">
      <q-card flat bordered class="bg-light q-px-md q-py-lg">
        <q-card-section>
          <h2 class="text-h5">Dicas de Utilização</h2>
          <q-list bordered>
            <q-item>
              <q-item-section avatar>
                <q-icon name="lightbulb" color="orange" />
              </q-item-section>
              <q-item-section>
                <span class="text-h6">Verifique os Benefícios</span>
                <p>
                  Confirme com a administradora do cartão quais benefícios estão
                  disponíveis e como ativá-los.
                </p>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="info" color="blue" />
              </q-item-section>
              <q-item-section>
                <span class="text-h6">Entenda as Condições</span>
                <p>
                  Leia os termos e condições para entender a cobertura do seguro e os
                  requisitos para a utilização dos benefícios.
                </p>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="credit_card" color="purple" />
              </q-item-section>
              <q-item-section>
                <span class="text-h6">Utilize o Cartão</span>
                <p>
                  Para garantir que os benefícios sejam aplicados, pague o aluguel do
                  carro com o cartão de crédito.
                </p>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-section>

    <!-- Exemplos Práticos -->
    <q-section class="q-mb-lg">
      <q-card flat bordered class="bg-light q-px-md q-py-lg">
        <q-card-section>
          <h2 class="text-h5">Exemplos Práticos</h2>
          <p>
            Imagine que você está alugando um carro para uma viagem de fim de semana. Ao
            usar seu cartão de crédito, você pode obter uma cobertura adicional para o
            carro, além de economizar com descontos especiais. Isso pode significar menos
            preocupações e mais economia durante sua viagem.
          </p>
          <q-img
            src="https://www.falandodeviagem.com.br/imagens21/SeguroCarroVisa.jpg"
            alt="Exemplo de Aluguel de Carro"
            class="q-mt-md"
          />
        </q-card-section>
      </q-card>
    </q-section>

    <!-- Rodapé -->
    <q-footer class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> © 2024 value Plus </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
export default {
  name: "BeneficiosCartaoCredito",
};
</script>

<style scoped>
.bg-primary {
  background-color: #1976d2;
}

.bg-light {
  background-color: #f5f5f5;
}

.text-h5 {
  font-size: 1.5rem;
}

.text-h6 {
  font-size: 1.25rem;
}
</style>
