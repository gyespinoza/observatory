<script setup>
import CardByMaterial from "./CardByMaterial.vue";
</script>

<template>
  <div class="materials-summary">
    <CardByMaterial
      title="Lata"
      material="1"
      color="#97C95C"
      icon="img/stats/can.png"
    />

    <CardByMaterial
      title="Botella"
      material="2"
      color="#1DB2F5"
      icon="img/stats/bottle.png"
    />

    <CardByMaterial
      title="Papel"
      material="3"
      color="#FFC107"
      icon="img/stats/paper.png"
    />

    <CardByMaterial
      title="Hierro"
      material="4"
      color="#F5564A"
      icon="img/stats/beam.png"
    />

    <CardByMaterial
      title="Cartón"
      material="5"
      color="#0D6EFD"
      icon="img/stats/open-box.png"
    />
  </div>
</template>

<style scoped>
.materials-summary {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  margin: 0 0 1.25rem 0;
}

@media (max-width: 1200px) {
  .materials-summary {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .materials-summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .materials-summary {
    grid-template-columns: 1fr;
  }
}
</style>