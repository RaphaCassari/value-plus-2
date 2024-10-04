<template>
  <q-page class="q-pa-md">
    <q-expansion-item
      group="somegroup"
      icon="explore"
      label="Como Funciona o Benefício de Proteção de Preço ? "
      default-opened
      header-class="text-primary"
    >
      <div>
        <p>
          Caso você tenha comprado um produto e, em seguida, encontre o mesmo produto por
          um preço menor, você pode solicitar o reembolso da diferença de preço.
        </p>
        <ul>
          <li>
            <strong>O que é:</strong> Proteção contra a diferença de preço de um produto
            comprado.
          </li>
          <li>
            <strong>O que vamos monitorar para voce:</strong> O preço do produto que você
            comprou durante o mês seguinte à compra. Caso encontremos o mesmo produto por
            um preço menor, você será notificado.
          </li>
          <li>
            <strong>Como acionar:</strong> Entre em contato com o banco emissor do seu
            cartão e forneça os detalhes da compra e do produto encontrado por um preço
            menor.
          </li>
          <li>
            <strong>Limitações:</strong> O benefício pode ter um limite de valor ou de
            quantidade de solicitações por ano.
          </li>
        </ul>
      </div>
    </q-expansion-item>
    <q-banner color="info"> </q-banner>
    <q-card>
      <q-card-section>
        <div class="text-h6">Cadastro de Compras</div>
        <q-form @submit.prevent="submitForm" class="q-gutter-md">
          <q-input v-model="produto" label="Nome do Produto" outlined required />
          <q-input v-model="preco" label="Preço (R$)" type="number" outlined required />
          <q-input
            v-model="dataCompra"
            label="Data da Compra"
            type="date"
            outlined
            mask="YYYY-MM-DD"
            required
          />
          <q-select
            v-model="tipoProduto"
            :options="tiposProduto"
            label="Tipo de Produto"
            outlined
            required
            emit-value
            map-options
          />
          <q-select
            v-model="cartaoSelecionado"
            :options="cartoes"
            label="Cartão Utilizado"
            outlined
            required
            emit-value
            map-options
          />
          <q-btn type="submit" label="Cadastrar" color="primary" :loading="loading" />
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-banner v-if="mensagem" class="q-mt-md" color="primary">
          {{ mensagem }}
        </q-banner>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-h6">Ativos Monitorados</div>
        <q-list>
          <q-item v-for="(item, index) in ativos" :key="index" class="q-mb-sm" separator>
            <q-item-section>
              <q-item-label><strong>Produto:</strong> {{ item.produto }}</q-item-label>
              <q-item-label
                ><strong>Tipo de Produto:</strong>
                {{ obterLabelTipoProduto(item.tipoProduto) }}</q-item-label
              >
              <q-item-label><strong>Preço:</strong> R$ {{ item.preco }}</q-item-label>
              <q-item-label
                ><strong>Data da Compra:</strong> {{ item.dataCompra }}</q-item-label
              >
              <q-item-label
                ><strong>Cartão Utilizado:</strong>
                {{ obterLabelCartao(item.cartao) }}</q-item-label
              >
              <q-item-label
                ><strong>Garantia Estendida:</strong>
                {{
                  verificarGarantiaEstendida(item.tipoProduto, item.cartao)
                }}</q-item-label
              >
              <q-btn
                label="Monitorar Preço"
                color="secondary"
                @click="abrirModalPreco(item.produto)"
                flat
              />
              <q-btn
                label="Parar de Monitorar"
                color="negative"
                @click="removerAtivo(index)"
                flat
              />
              <q-btn
                v-if="verificarGarantiaEstendida(item.tipoProduto, item.cartao) === 'Sim'"
                label="Usar Garantia Estendida"
                @click="abrirModalGarantia"
                flat
              />
            </q-item-section>
            <!--             <q-item-section side>
              <q-btn
                label="Monitorar Preço"
                color="secondary"
                @click="abrirModalPreco(item.produto)"
                flat
              />
              <q-btn
                label="Parar de Monitorar"
                color="negative"
                @click="removerAtivo(index)"
                flat
              />
            </q-item-section> -->
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- Modal de Garantia Estendida -->
    <q-dialog v-model="modalGarantiaVisivel" persistent>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Como Usar a Garantia Estendida</div>
        </q-card-section>

        <q-card-section>
          <p>Para utilizar a garantia estendida, siga os passos abaixo:</p>
          <ol>
            <li>Verifique se o seu produto está coberto pela garantia estendida.</li>
            <li>
              Entre em contato com o serviço de atendimento ao cliente do seu cartão.
            </li>
            <li>
              Tenha em mãos as informações da compra, incluindo o recibo e o nome do
              produto.
            </li>
            <li>
              Siga as instruções fornecidas pelo atendimento ao cliente para acionar a
              garantia.
            </li>
          </ol>
          <p>
            Lembre-se de que a garantia estendida é válida apenas para produtos cobertos
            pelo seu cartão.
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modalPrecoVisivel">
      <q-card class="q-mx-auto" style="max-width: 800px">
        <q-card-section class="q-pa-md bg-primary text-white text-h6 q-pt-none">
          Monitoramento:
        </q-card-section>

        <q-card-section class="q-pa-md">
          <div
            v-for="item in transformedArray"
            :key="item.id"
            class="q-mb-md q-pa-sm bg-grey-1 rounded-borders"
          >
            <q-item-label class="q-mb-xs text-h6">
              <span class="text-bold">Produto:</span> {{ item.title }}
            </q-item-label>
            <q-item-label class="q-mb-xs text-h6">
              <span class="text-bold">Loja:</span> {{ item.source }}
            </q-item-label>
            <q-item-label class="q-mb-xs text-h6">
              <span class="text-bold">Preço:</span> {{ item.price }}
            </q-item-label>
            <q-item-label class="q-mb-xs text-h6">
              <!-- <span class="text-bold">Link:</span> -->
              <q-btn
                :href="item.link"
                target="_blank"
                class="q-mt-sm"
                color="primary"
                label="Visitar Loja"
              />
            </q-item-label>
          </div>
        </q-card-section>

        <q-card-actions class="q-pa-md" align="right">
          <q-btn flat label="Fechar" color="white" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      produto: "",
      preco: "",
      dataCompra: "",
      tipoProduto: null,
      cartaoSelecionado: null,
      cartoes: [
        { label: "Mastercard C6 Carbon", value: "credito1" },
        { label: "XP Visa Infinite", value: "credito2" },
        { label: "Mastercard Nubank Ultraviolet", value: "credito3" },
      ],
      tiposProduto: [
        { label: "Eletrônicos", value: "eletronicos" },
        { label: "Eletrodomésticos", value: "eletrodomesticos" },
        { label: "Móveis", value: "moveis" },
        { label: "Vestuário", value: "vestuario" },
        { label: "Outros", value: "outros" },
      ],
      ativos: [],
      loading: false,
      mensagem: "",
      modalGarantiaVisivel: false,
      modalPrecoVisivel: false,
      produtoSelecionado: "", // Nova variável para armazenar o produto selecionado
      transformedArray: [],
    };
  },
  methods: {
    submitForm() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        const novoAtivo = {
          produto: this.produto,
          preco: this.preco,
          dataCompra: this.dataCompra,
          tipoProduto: this.tipoProduto,
          cartao: this.cartaoSelecionado,
        };
        this.ativos.push(novoAtivo);
        this.salvarAtivos();
        this.mensagem = `Cadastro realizado com sucesso! O preço do produto ${this.produto} será acompanhado no próximo mês.`;
        this.resetForm();
      }, 2000);
    },
    resetForm() {
      this.produto = "";
      this.preco = "";
      this.dataCompra = "";
      this.tipoProduto = null;
      this.cartaoSelecionado = null;
    },
    carregarAtivos() {
      const ativosSalvos = localStorage.getItem("ativosMonitorados");
      if (ativosSalvos) {
        this.ativos = JSON.parse(ativosSalvos);
      }
    },
    salvarAtivos() {
      localStorage.setItem("ativosMonitorados", JSON.stringify(this.ativos));
    },
    removerAtivo(index) {
      this.ativos.splice(index, 1);
      this.salvarAtivos();
    },
    obterLabelCartao(valor) {
      const cartao = this.cartoes.find((c) => c.value === valor);
      return cartao ? cartao.label : "Desconhecido";
    },
    obterLabelTipoProduto(valor) {
      const tipo = this.tiposProduto.find((t) => t.value === valor);
      return tipo ? tipo.label : "Desconhecido";
    },
    verificarGarantiaEstendida(tipoProduto, cartao) {
      const cartoesComGarantiaEstendida = ["credito1", "credito2"];
      const produtosElegiveis = ["eletronicos", "eletrodomesticos"];

      if (
        cartoesComGarantiaEstendida.includes(cartao) &&
        produtosElegiveis.includes(tipoProduto)
      ) {
        return "Sim";
      } else {
        return "Não";
      }
    },
    abrirModalGarantia() {
      this.modalGarantiaVisivel = true;
    },
    abrirModalPreco(produto) {
      this.produtoSelecionado = produto;
      this.modalPrecoVisivel = true;

      let data = JSON.stringify({
        q: this.produtoSelecionado,
        gl: "br",
        hl: "pt-br",
        tbs: "qdr:m",
      });

      let config = {
        method: "post",
        url: "https://google.serper.dev/shopping",
        headers: {
          "X-API-KEY": "fe38ec11c288c5893622baccc6bfbd1bacec0e1c",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          //console.log(JSON.stringify(response.data));
          // Função para transformar os dados
          function transformData(data) {
            return data.shopping.map((item) => ({
              title: item.title,
              source: item.source,
              price: item.price,
              link: item.link,
            }));
          }

          // Resultado da transformação
          this.transformedArray = transformData(response.data);
          console.log(this.transformedArray);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.carregarAtivos();
  },
};
</script>

<style scoped>
.q-page {
  max-width: 600px;
  margin: 0 auto;
}
</style>
