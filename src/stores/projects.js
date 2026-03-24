import { ref, computed } from "vue"
import { defineStore } from "pinia"
import apiService from "../services/apiService"

export const useProjectsStore = defineStore("projects", () => {
  const projects = ref([])
  const project = ref(null)
  const count = ref(0)
  const next = ref(null)
  const previous = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const perPage = ref(8)

  const totalPages = computed(() => {
    return count.value ? Math.ceil(count.value / perPage.value) : 0
  })

  const getProjects = async (itemsPerPage = 10, page = 1) => {
    loading.value = true
    error.value = null
    perPage.value = itemsPerPage

    try {
      const response = await apiService.getAllProjects(itemsPerPage, page)
      projects.value = response.data.results || []
      count.value = response.data.count || 0
      next.value = response.data.next
      previous.value = response.data.previous
    } catch (err) {
      console.error("Error cargando proyectos:", err)
      error.value = err
      projects.value = []
      count.value = 0
      next.value = null
      previous.value = null
    } finally {
      loading.value = false
    }
  }

  const getProjectById = async (id) => {
    loading.value = true
    error.value = null
    project.value = null

    try {
      const response = await apiService.getProjectById(id)
      project.value = response.data
    } catch (err) {
      console.error("Error cargando proyecto:", err)
      error.value = err
      project.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    projects,
    project,
    count,
    next,
    previous,
    loading,
    error,
    perPage,
    totalPages,
    getProjects,
    getProjectById,
  }
})