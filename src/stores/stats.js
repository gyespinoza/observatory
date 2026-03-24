import { defineStore } from "pinia"
import apiService from "../services/apiService"


export const useStatsStore = defineStore("stats", () => {

  //get stats
  async function getStatsByFilter(perPage, page, type, material, range, year) {
    return await apiService.getStats(perPage, page, type, material, range, year)
  }

  //get stats by material_type
  async function getStatsByMaterialType(material_type) {
    return await apiService.getByMaterialType(material_type)
  }

  async function getTotalsByPeriod(periodId) {
    return await apiService.getTotalsByPeriod(periodId)
  }

  return {
    getStatsByFilter,
    getStatsByMaterialType,
    getTotalsByPeriod,
  }

})