<script setup>
import { onMounted, ref, computed } from "vue"
import { useRoute, RouterLink } from "vue-router"
import { useProjectsStore } from "../../stores/projects"

const route = useRoute()
const projectStore = useProjectsStore()

const currentImageIndex = ref(0)

const project = computed(() => projectStore.project)

const projectImages = computed(() => {
  return project.value?.imagesproject_set?.length
    ? project.value.imagesproject_set.map((img) => img.image_project)
    : ["/imageNotFound.jpg"]
})

const currentImage = computed(() => {
  return projectImages.value[currentImageIndex.value] || "/imageNotFound.jpg"
})

const nextImage = () => {
  currentImageIndex.value =
    (currentImageIndex.value + 1) % projectImages.value.length
}

const prevImage = () => {
  currentImageIndex.value =
    (currentImageIndex.value - 1 + projectImages.value.length) % projectImages.value.length
}

const goToImage = (index) => {
  currentImageIndex.value = index
}

const formatDate = (date) => {
  if (!date) return "No disponible"
  return new Date(date).toLocaleDateString("es-SV", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const projectMeta = computed(() => {
  if (!project.value) return []

  return [
    {
      label: "Unidad responsable",
      value: project.value.responsible_unit || "No disponible",
    },
    {
      label: "Responsable",
      value: project.value.responsible || "No disponible",
    },
    {
      label: "Fecha de inicio",
      value: formatDate(project.value.start_date),
    },
    {
      label: "Fecha de finalización",
      value: formatDate(project.value.end_date),
    },
  ]
})

onMounted(async () => {
  await projectStore.getProjectById(route.params.id)
  currentImageIndex.value = 0
})
</script>

<template>
  <section class="page-title detail-banner">
    <div class="auto-container">
      <div class="sec-title">
        <h1>
          Detalle del <span class="normal-font">Proyecto</span>
        </h1>
        <div class="bread-crumb">
          <RouterLink to="/">Inicio</RouterLink>
          /
          <RouterLink to="/iniciativas">Iniciativas</RouterLink>
          /
          <span class="current">{{ project?.name || "Detalle" }}</span>
        </div>
      </div>
    </div>
  </section>

  <div class="sidebar-page">
    <div class="auto-container">
      <div v-if="projectStore.loading" class="state-box">
        Cargando proyecto...
      </div>

      <div v-else-if="projectStore.error" class="state-box error">
        Error al cargar el proyecto.
      </div>

      <div v-else-if="!project" class="state-box">
        No se encontró información del proyecto.
      </div>

      <div v-else class="row clearfix">
        <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12">
          <section class="projects-section project-details no-padd-bottom no-padd-top padd-right-20">
            <div class="column default-featured-column">
              <article class="inner-box">
                <figure class="image-box detail-image-wrapper">
                  <div class="project-slider">
                    <img
                      :src="currentImage"
                      :alt="project.name"
                      class="detail-image"
                    >

                    <button
                      v-if="projectImages.length > 1"
                      class="slider-btn prev-btn"
                      @click.prevent="prevImage"
                    >
                      ‹
                    </button>

                    <button
                      v-if="projectImages.length > 1"
                      class="slider-btn next-btn"
                      @click.prevent="nextImage"
                    >
                      ›
                    </button>

                    <div
                      v-if="projectImages.length > 1"
                      class="slider-dots"
                    >
                      <span
                        v-for="(img, index) in projectImages"
                        :key="index"
                        class="dot"
                        :class="{ active: index === currentImageIndex }"
                        @click="goToImage(index)"
                      />
                    </div>
                  </div>
                </figure>

                <div class="content-box padd-top-40">
                  <div class="row detail-header clearfix">
                    <div class="col-md-8 col-sm-12">
                      <h2>{{ project.name }}</h2>
                    </div>

                    <div class="col-md-4 col-sm-12 pull-right text-right">
                      <a
                        v-if="project.url_project"
                        :href="project.url_project"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="theme-btn btn-style-two"
                      >
                        Más detalles
                      </a>
                    </div>
                  </div>

                  <div class="text">
                    <p class="bigger-text">
                      {{ project.description || "Sin descripción disponible." }}
                    </p>
                  </div>

                  <br>

                  <h3 class="text-uppercase">Objetivo del proyecto</h3>
                  <p class="project-objective">
                    {{ project.objective || "No disponible" }}
                  </p>
                </div>
              </article>
            </div>
          </section>
        </div>

        <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
          <aside class="sidebar">
            <div class="widget project-info-widget">
              <div class="sidebar-title">
                <h3>Información del proyecto</h3>
              </div>

              <ul class="project-info-list">
                <li v-for="item in projectMeta" :key="item.label">
                  <strong>{{ item.label }}:</strong>
                  <span>{{ item.value }}</span>
                </li>
              </ul>
            </div>

            <div class="widget project-info-widget">
              <div class="sidebar-title">
                <h3>Acciones</h3>
              </div>

              <div class="action-buttons">
                <RouterLink to="/iniciativas" class="theme-btn btn-style-three full-btn">
                  Ver más iniciativas
                </RouterLink>               
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-banner {
  padding: 70px 0;
  background: #f4f4f4;
}

.bread-crumb {
  margin-top: 10px;
  font-size: 14px;
}

.sidebar-page {
  padding: 60px 0;
}

.state-box {
  padding: 30px;
  background: #f8f8f8;
  border-radius: 8px;
}

.state-box.error {
  color: #b00020;
}

.detail-image-wrapper {
  width: 100%;
  height: 460px;
  overflow: hidden;
  position: relative;
}

.project-slider {
  width: 100%;
  height: 100%;
  position: relative;
}

.detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  z-index: 2;
  font-size: 22px;
  line-height: 1;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
}

.prev-btn {
  left: 12px;
}

.next-btn {
  right: 12px;
}

.slider-dots {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.dot.active {
  background: #fff;
}

.project-objective {
  font-size: 16px;
  line-height: 1.8em;
}

.project-info-widget {
  margin-bottom: 30px;
  padding: 25px 20px;
  background: #fafafa;
  border: 1px solid #eee;
}

.project-info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.project-info-list li {
  margin-bottom: 14px;
  line-height: 1.7em;
}

.project-info-list strong {
  display: block;
  margin-bottom: 4px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.full-btn {
  display: block;
  width: 100%;
  text-align: center;
}
</style>