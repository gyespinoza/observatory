import api from "../lib/axios"

export default {
  //endpoint to show all projects
  getAllProjects(perPage = 10, page = 1) {
    return api.get(`/projects/?per_page=${perPage}&page=${page}`)
  },

  //get project by code
  getProjectById(id) {
    return api.get(`/projects/${id}/`)
  },

  //endpoint to get all stats
  getStats(perPage, page, type, material, range, year) {
    return api.get(`/stats/?per_page=${perPage}&page=${page}&type__in=${type}&material_type__in=${material}&range__in=${range}&year__icontains=${year}`)
  },

  //endpoint to get data by material type
  getByMaterialType(material_type) {
    return api.get(`/stats/sumByMaterialType/?material_type=${material_type}`)
  },

  getTotalsByPeriod(periodId) {
    return api.get(`/stats/sum_by_year_and_range/?range=${periodId}`)
  },

}
