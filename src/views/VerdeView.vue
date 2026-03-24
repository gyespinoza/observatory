<script setup>
import Achievements from '../components/UgbVerde/Achievements.vue';
import About from '../components/UgbVerde/About.vue';
import Projects from '../components/UgbVerde/Projects.vue';
</script>

<template>
  <section class="page-title" style="background-image:url(/img/fondo.png);">
    <div class="auto-container">
      <div class="sec-title">
        <h1>UGB <span class="normal-font">Verde</span></h1>
        <div class="bread-crumb">
          <a href="/">Inicio</a> /
          <a href="#" class="current">UGB verde</a>
        </div>
      </div>
    </div>
  </section>
  <Achievements />
  <About />
  <Projects />
</template>
