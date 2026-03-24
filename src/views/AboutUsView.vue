<script setup>
import History from "../components/AboutUs/History.vue";
import WhatWeDo from "../components/AboutUs/WhatWeDo.vue";
import Ouractivities from "../components/AboutUs/Ouractivities.vue";
import Outteam from "../components/AboutUs/Ourteam.vue";
</script>

<template>
  <section class="page-title" style="background-image:url(/img/fondo.png);">
    <div class="auto-container">
      <div class="sec-title">
        <h1>Sobre Nosotros</h1>
        <div class="bread-crumb"><a href="/">Inicio</a> / <a href="#" class="current">Sobre nosotros</a></div>
      </div>
    </div>
  </section>
  <!--Default Section-->

  <History />
  <Ouractivities />
  <Outteam />
</template>
