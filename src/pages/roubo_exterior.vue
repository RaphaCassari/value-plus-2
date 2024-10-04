<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <h3>Como Usar o Seguro Contra Roubo no Exterior</h3>
        <p>
          Muitos cartões de crédito oferecem um seguro contra roubo quando você viaja para
          o exterior. Este seguro pode cobrir perda ou roubo de itens pessoais, como
          eletrônicos e acessórios, dependendo das condições do seu cartão. Aqui está um
          guia para ajudá-lo a entender quando e como usar esse seguro.
        </p>
      </q-card-section>

      <q-card-section>
        <q-expansion-item label="Quando Usar o Seguro" icon="info">
          <q-list>
            <q-item>
              <q-item-section>
                <h6>1. Roubo ou Perda de Itens Pessoais</h6>
                <p>
                  Se você tiver seus itens pessoais roubados ou perdidos enquanto estiver
                  no exterior, entre em contato com o banco emissor do seu cartão
                  imediatamente para relatar o incidente.
                </p>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <h6>2. Documentação Necessária</h6>
                <p>
                  Você precisará fornecer documentos como boletins de ocorrência policial
                  e recibos de compra dos itens roubados para que o seguro possa ser
                  acionado.
                </p>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <h6>3. Reivindicações Tardias</h6>
                <p>
                  Informe o incidente ao banco o mais rápido possível. Alguns seguros
                  exigem que a reclamação seja feita dentro de um prazo específico após o
                  roubo.
                </p>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-expansion-item label="Como Usar o Seguro" icon="help">
          <q-list>
            <q-item>
              <q-item-section>
                <h6>1. Contate o Banco Emissor</h6>
                <p>
                  Ligue para o número de emergência do banco que está impresso no verso do
                  seu cartão e informe o roubo. Solicite orientações sobre o processo de
                  reivindicação.
                </p>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <h6>2. Reúna Documentação</h6>
                <p>
                  Prepare a documentação necessária, incluindo o boletim de ocorrência,
                  recibos e qualquer outra prova de compra. Mantenha cópias digitais e
                  físicas.
                </p>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <h6>3. Preencha o Formulário de Reivindicação</h6>
                <p>
                  Complete o formulário de reivindicação fornecido pelo banco ou
                  seguradora. Envie todos os documentos e siga as instruções fornecidas.
                </p>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <h6>4. Acompanhe o Status da Reivindicação</h6>
                <p>
                  Após enviar a reivindicação, acompanhe o status através dos canais
                  oferecidos pelo banco. Certifique-se de seguir qualquer solicitação
                  adicional para garantir a resolução do caso.
                </p>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-card-section>
          <q-btn
            @click="showSupportModal = true"
            label="Contate o Suporte"
            color="primary"
          />
          <q-btn
            @click="showClaimFormModal = true"
            label="Formulário de Reivindicação"
            color="secondary"
          />
        </q-card-section>
      </q-card-section>
    </q-card>

    <!-- Modal de Suporte -->
    <q-dialog v-model="showSupportModal">
      <q-card>
        <q-card-section>
          <h2>Contate o Suporte</h2>
          <p>
            Para suporte, entre em contato com o número de emergência do banco impresso no
            verso do seu cartão. Eles poderão fornecer informações e assistência
            adicionais.
          </p>
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Fechar" @click="showSupportModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal de Formulário de Reivindicação -->
    <q-dialog v-model="showClaimFormModal">
      <q-card>
        <q-card-section>
          <h2>Formulário de Reivindicação</h2>
          <p>
            Preencha o formulário de reivindicação conforme as instruções fornecidas pelo
            banco ou seguradora. Certifique-se de incluir todos os documentos necessários.
          </p>
          <q-form>
            <q-input filled v-model="claimForm.name" label="Nome Completo" />
            <q-input filled v-model="claimForm.email" label="Email" />
            <q-input
              filled
              v-model="claimForm.description"
              label="Descrição do Incidente"
              type="textarea"
            />
            <q-btn label="Enviar" color="primary" @click="submitClaimForm" />
          </q-form>
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Fechar" @click="showClaimFormModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: "TravelInsurancePage",
  data() {
    return {
      showSupportModal: false,
      showClaimFormModal: false,
      claimForm: {
        name: "",
        email: "",
        description: "",
      },
    };
  },
  methods: {
    submitClaimForm() {
      // Aqui você pode adicionar lógica para processar o formulário
      console.log("Formulário de reivindicação enviado:", this.claimForm);
      this.showClaimFormModal = false;
      this.$q.notify({
        color: "green",
        textColor: "white",
        icon: "check",
        message: "Formulário de reivindicação enviado com sucesso!",
      });
    },
  },
};
</script>

<style scoped>
.q-page {
  background-color: #f5f5f5;
}
.q-card {
  max-width: 800px;
  margin: auto;
}
</style>
