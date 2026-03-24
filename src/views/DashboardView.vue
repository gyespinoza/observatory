<script setup>

import StatsBarGrahics from "../components/Stats/StatsBarGraphic.vue";
import StatsPieGraphic from "../components/Stats/StatsPieGraphic.vue";
import GeneralStats from "../components/Stats/GeneralStats.vue";
import StatsTable from "../components/Stats/StatsTable.vue";
import { ref } from "vue";

// default values for properties (filters in url)
const perPage = 10;
const page = 1;
const selectedType = ref(null);
const selectedMaterial = ref(null);
const selectedRange = ref(null);
const selectedYear = ref(null);
</script>

<template>
  <section class="page-title" style="background-image:url(/img/fondo.png);">
    <div class="auto-container">
      <div class="sec-title">
        <h1>Proyecto <span class="normal-font">de reciclaje</span></h1>
        <div class="bread-crumb">
          <a href="/">Inicio</a> /
          <a href="#" class="current">Dashboard</a>
        </div>
      </div>
    </div>
  </section>
  <section class="default-section other-info">
    <div class="auto-container">
      <div class="row g-4"> <!-- gap entre filas -->

        <!-- Cards superiores -->
        <div class="col-12">
          <GeneralStats />
        </div>
        <!-- Gráficos -->
        <div class="col-12">
          <div class="row g-4">
            <div>
              <StatsBarGrahics />
            </div>
            <div>
              <StatsPieGraphic />
            </div>
          </div>
        </div>
        <!-- Tabla -->
        <div class="col-12">
          <StatsTable />
        </div>

      </div>
    </div>
  </section>
</template>
<style scoped>
.other-info .row {
  margin-bottom: 1.5rem;
}

.stats-chart-card {
  margin-top: 1rem;
}
</style>
