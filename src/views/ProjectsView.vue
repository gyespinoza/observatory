<script setup>
import Allprojects from "../components/Project/Allprojects.vue";

</script>

<template>
  <section class="page-title" style="background-image:url(/img/fondo.png);">
    <div class="auto-container">
      <div class="sec-title">
        <h1>Nuestras <span class="normal-font">Iniciativas</span></h1>
        <div class="bread-crumb">
          <a href="/">Inicio</a> /
          <a href="#" class="current">Proyectos</a>
        </div>
      </div>
    </div>
  </section>
  <div>
    <Allprojects />
  </div>
</template>
