<script setup>
import { onMounted, ref } from "vue"
import { useProjectsStore } from "../../stores/projects"

const projectD = useProjectsStore()
const imageIndexes = ref({})

const getProjectImages = (project) => {
  return project?.imagesproject_set?.length
    ? project.imagesproject_set.map((img) => img.image_project)
    : ["/imageNotFound.jpg"]
}

const getCurrentImageIndex = (projectId) => {
  return imageIndexes.value[projectId] ?? 0
}

const nextImage = (project) => {
  const images = getProjectImages(project)
  const current = getCurrentImageIndex(project.id)
  imageIndexes.value[project.id] = (current + 1) % images.length
}

const prevImage = (project) => {
  const images = getProjectImages(project)
  const current = getCurrentImageIndex(project.id)
  imageIndexes.value[project.id] = (current - 1 + images.length) % images.length
}

const goToImage = (projectId, index) => {
  imageIndexes.value[projectId] = index
}

const truncateText = (text, maxLength = 140) => {
  if (!text) return ""
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
}

onMounted(async () => {
  await projectD.getProjects(4, 1)
})
</script>

<template>
  <section class="recent-projects">
    <div class="auto-container">
      <div class="sec-title clearfix">
        <div class="pull-left">
          <h2>
            INICIATIVAS
            <span class="normal-font theme_color">Medioambientales</span>
          </h2>
          <div class="text">
            Conoce todas las iniciativas que son parte del Observatorio Verde
          </div>
        </div>

        <div class="pull-right padd-top-30">
          <RouterLink to="/iniciativas" class="theme-btn btn-style-three">
            Ver todas las iniciativas
          </RouterLink>
        </div>
      </div>

      <div v-if="projectD.loading">Cargando proyectos...</div>
      <div v-else-if="projectD.error">Error al cargar proyectos</div>
      <div v-else-if="!projectD.projects.length">No hay proyectos para mostrar</div>

      <div class="row clearfix" v-else>
        <div v-for="project in projectD.projects" :key="project.id"
          class="column default-featured-column col-md-3 col-sm-6 col-xs-12">
          <article class="inner-box wow fadeInLeft project-card" data-wow-delay="0ms" data-wow-duration="1500ms">
            <figure class="image-box project-image-wrapper">
              <div class="project-slider">
                <a href="#">
                  <img :src="getProjectImages(project)[getCurrentImageIndex(project.id)]" :alt="project.name"
                    class="project-image" />
                </a>

                <button v-if="getProjectImages(project).length > 1" class="slider-btn prev-btn"
                  @click.prevent="prevImage(project)">
                  ‹
                </button>

                <button v-if="getProjectImages(project).length > 1" class="slider-btn next-btn"
                  @click.prevent="nextImage(project)">
                  ›
                </button>

                <div v-if="getProjectImages(project).length > 1" class="slider-dots">
                  <span v-for="(img, index) in getProjectImages(project)" :key="index" class="dot"
                    :class="{ active: index === getCurrentImageIndex(project.id) }"
                    @click="goToImage(project.id, index)" />
                </div>
              </div>
            </figure>

            <div class="content-box">
              <h3 class="project-title">
                <a href="#">{{ truncateText(project.name, 20) }}</a>
              </h3>

              <div class="column-info">
                {{ project.responsible_unit }}
              </div>

              <div class="text project-description">
                {{ truncateText(project.description, 160) }}
              </div>

              <RouterLink :to="`/iniciativas/${project.id}`" class="theme-btn btn-style-three">
                Más información
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-card {
  min-height: 100%;
}

.project-image-wrapper {
  width: 100%;
  height: 220px;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
}

.project-slider {
  width: 100%;
  height: 100%;
  position: relative;
}

.project-image {
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
  padding: 6px 10px;
  cursor: pointer;
  z-index: 2;
  font-size: 20px;
  line-height: 1;
  background: rgba(0, 0, 0, 0.5);
  color: white;
}

.prev-btn {
  left: 8px;
}

.next-btn {
  right: 8px;
}

.slider-dots {
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.dot.active {
  background: white;
}

.project-description {
  min-height: 140px;
  line-height: 1.8em;
  overflow: hidden;
}
</style>