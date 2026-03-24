<script setup>
import ItemCardWeDo from "./ItemCardWeDo.vue";
</script>

<template>
  <section class="custom-container">
    <div class="container">
      <div class="section-icon">
        <i class="bi bi-layers-fill" />
      </div>
      <p class="mini-section-title">Nuestras actividades</p>
      <h1 class="section-title">¿Qu&eacute; Hacemos?</h1>
      <div class="row">
        <div class="col-lg-6 content-column">
          <ItemCardWeDo
            title="Participar"
            description="En congresos ambientales y así mantenernos informados y
                capacitados en los servicios para la zona oriental."
          >
            <template v-slot:icon>
              <i class="bi bi-people"></i>
            </template>
          </ItemCardWeDo>

          <ItemCardWeDo
            title="Generar"
            description="Oportunidades que le permitan a los estudiantes realizar
                prácticas u horas sociales para el desarrollo de su carrera."
          >
            <template v-slot:icon>
              <i class="bi bi-gear"></i>
            </template>
          </ItemCardWeDo>

          <ItemCardWeDo
            title="Fortalecer"
            description="La cultura y educación ambiental sostenible mediante alianzas
                con socios estratégicos."
          >
            <template v-slot:icon>
              <i class="bi bi-award"></i>
            </template>
          </ItemCardWeDo>
        </div>
        <div
          class="col-lg-6 image-column ml-auto mr-0 d-flex justify-content-center align-items-center"
        >
          <img src="/img/carrouselImages/4.jpg" alt="Imagen" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-container {
  background-color: var(--white);
}

.image-column img {
  width: 100%;
  height: 100%;
  border-radius: 0;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.75);
  object-fit: cover;
}
</style>
