<template>
  <q-page padding>
    <q-layout>
      <q-header>
        <q-toolbar>
          <q-toolbar-title>Dashboard de Benefícios dos Cartões</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <div class="q-pa-md">
            <!-- Gráfico de Barras -->
            <q-card class="q-mb-md">
              <q-card-section>
                <div class="text-h6">Uso dos Benefícios dos Cartões</div>
              </q-card-section>
              <q-card-section>
                <apexchart
                  type="bar"
                  height="350"
                  :options="barChartOptions"
                  :series="barSeries"
                />
              </q-card-section>
            </q-card>

            <!-- Gráfico de Linha -->
            <q-card class="q-mb-md">
              <q-card-section>
                <div class="text-h6">Evolução Mensal dos Benefícios</div>
              </q-card-section>
              <q-card-section>
                <apexchart
                  type="line"
                  height="350"
                  :options="lineChartOptions"
                  :series="lineSeries"
                />
              </q-card-section>
            </q-card>

            <!-- Gráfico de Pizza -->
            <q-card class="q-mb-md">
              <q-card-section>
                <div class="text-h6">Distribuição dos Benefícios</div>
              </q-card-section>
              <q-card-section>
                <apexchart
                  type="pie"
                  height="350"
                  :options="pieChartOptions"
                  :series="pieSeries"
                />
              </q-card-section>
            </q-card>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "CardBenefitsDashboard",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      // Dados para o Gráfico de Barras
      barSeries: [
        {
          name: "Uso",
          data: [40, 20, 30, 50, 10],
        },
      ],
      barChartOptions: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: ["Viagens", "Restaurantes", "Compras", "Entretenimento", "Outros"],
        },
        yaxis: {
          title: {
            text: "Percentual (%)",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },

      // Dados para o Gráfico de Linha
      lineSeries: [
        {
          name: "Viagens",
          data: [10, 40, 35, 50, 49, 60, 70],
        },
        {
          name: "Restaurantes",
          data: [20, 30, 45, 60, 70, 80, 90],
        },
      ],
      lineChartOptions: {
        chart: {
          type: "line",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"],
        },
        yaxis: {
          title: {
            text: "Benefícios Usados",
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " Benefícios";
            },
          },
        },
      },

      // Dados para o Gráfico de Pizza
      pieSeries: [40, 20, 30, 50, 10],
      pieChartOptions: {
        chart: {
          type: "pie",
          height: 350,
        },
        labels: ["Viagens", "Restaurantes", "Compras", "Entretenimento", "Outros"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    };
  },
};
</script>

<style scoped>
/* Adicione estilos personalizados se necessário */
</style>
