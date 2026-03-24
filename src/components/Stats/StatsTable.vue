<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStatsStore } from "../../stores/stats";

const props = defineProps({
  perPage: { type: [Number, String], default: 10 },
  page: { type: [Number, String], default: 1 },
  type: { type: [String, Array, null], default: null },
  material: { type: [String, Array, null], default: null },
  range: { type: [String, Array, null], default: null },
  year: { type: [String, Array, null], default: null },
});

const stats = useStatsStore();
const statsData = ref({});
const loading = ref(false);

const perPage = ref(Number(props.perPage) || 10);
const page = ref(Number(props.page) || 1);
const type = ref(props.type || null);
const material = ref(props.material || null);
const range = ref(props.range || null);
const year = ref(props.year || null);

const materialOptions = [
  { value: null, label: "Todos" },
  { value: "1", label: "Lata" },
  { value: "2", label: "Botella" },
  { value: "3", label: "Papel" },
  { value: "4", label: "Hierro" },
  { value: "5", label: "Cartón" },
];

const rangeOptions = [
  { value: null, label: "Todos" },
  { value: "1", label: "Enero-Junio" },
  { value: "2", label: "Julio-Diciembre" },
];

const typeOptions = [
  { value: null, label: "Todos" },
  { value: "1", label: "Interno" },
  { value: "2", label: "Externo" },
];

const perPageOptions = [5, 10, 15, 20];

const fetchData = async () => {
  try {
    loading.value = true;

    statsData.value = await stats.getStatsByFilter(
      perPage.value,
      page.value,
      type.value || "",
      material.value || "",
      range.value || "",
      year.value || ""
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    statsData.value = {};
  } finally {
    loading.value = false;
  }
};

watch([type, material, range, year], async () => {
  page.value = 1;
  await fetchData();
});

watch(perPage, async () => {
  page.value = 1;
  await fetchData();
});

const resetFilters = async () => {
  perPage.value = Number(props.perPage) || 10;
  page.value = Number(props.page) || 1;
  type.value = null;
  material.value = null;
  range.value = null;
  year.value = null;
  await fetchData();
};

const updatePageFromUrl = (url) => {
  if (!url) return;
  const match = url.match(/[?&]page=(\d+)/);
  if (match) {
    page.value = parseInt(match[1], 10);
  }
};

const changePage = async (url) => {
  if (!url) return;
  updatePageFromUrl(url);
  await fetchData();
};

const changePageNumber = async (pageNumber) => {
  page.value = pageNumber;
  await fetchData();
};

const dataBlock = computed(() => statsData.value?.data || {});
const statsRows = computed(() => dataBlock.value?.results?.stats || []);

const totalPages = computed(() => {
  const count = dataBlock.value?.count || 0;
  return count ? Math.ceil(count / perPage.value) : 0;
});

const pageButtons = computed(() => {
  const total = totalPages.value;
  const current = page.value;
  const buttons = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      buttons.push(i);
    }
    return buttons;
  }

  buttons.push(1);

  let start = Math.max(2, current - 1);
  let end = Math.min(total - 1, current + 1);

  if (current <= 3) {
    start = 2;
    end = 4;
  }

  if (current >= total - 2) {
    start = total - 3;
    end = total - 1;
  }

  if (start > 2) {
    buttons.push("...");
  }

  for (let i = start; i <= end; i++) {
    buttons.push(i);
  }

  if (end < total - 1) {
    buttons.push("...");
  }

  buttons.push(total);

  return buttons;
});

const years = computed(() => {
  const currentYear = new Date().getFullYear();
  const totalYears = 5; 

  const list = [{ value: null, label: "Todos" }];

  for (let i = 0; i < totalYears; i++) {
    const y = currentYear - i;
    list.push({
      value: String(y),
      label: String(y),
    });
  }

  return list;
});

const maxWeight = computed(() => {
  const values = statsRows.value.map((s) => Number(s.weight) || 0);
  return values.length ? Math.max(...values) : 0;
});

const totalWeight = computed(() => {
  return statsRows.value.reduce((acc, s) => acc + (Number(s.weight) || 0), 0);
});


const visibleCountText = computed(() => statsRows.value.length);
const selectedFiltersText = computed(() => {
  const active = [];
  if (material.value) active.push("material");
  if (range.value) active.push("período");
  if (type.value) active.push("tipo");
  if (year.value) active.push("año");

  return active.length ? active.join(", ") : "sin filtros";
});

onMounted(async () => {
  await fetchData();
});
const goToFirst = async () => {
  if (page.value === 1) return;
  page.value = 1;
  await fetchData();
};

const goToLast = async () => {
  if (page.value === totalPages.value) return;
  page.value = totalPages.value;
  await fetchData();
};

const goToNext = async () => {
  if (page.value >= totalPages.value) return;
  page.value += 1;
  await fetchData();
};

const goToPrev = async () => {
  if (page.value <= 1) return;
  page.value -= 1;
  await fetchData();
};
</script>

<template>
  <div class="stats-chart-card">
    <div class="stats-chart-card__header">
      <div>
        <p class="stats-chart-card__eyebrow">Estadísticas</p>
        <h3 class="stats-chart-card__title">Tabla de reciclaje</h3>
      </div>
     
    </div>

    <div class="stats-chart-card__body">
      <div class="chart-topbar">
        <div class="chart-meta">
          <span class="chart-meta__label">Mostrando:</span>
          <span class="chart-meta__value">{{ visibleCountText }} registros</span>
          <span class="chart-meta__separator">•</span>
          <span class="chart-meta__label">Filtros:</span>
          <span class="chart-meta__value">{{ selectedFiltersText }}</span>
        </div>

        <div class="chart-actions">
          <button type="button" class="chart-reset-btn" @click="resetFilters">
            Borrar filtros
          </button>

          <div class="chart-filter-select chart-filter-select--small">
            <span class="chart-filter-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 5h18l-7 8v5l-4 2v-7L3 5z" />
              </svg>
            </span>

            <select v-model="perPage" class="chart-select">
              <option v-for="size in perPageOptions" :key="size" :value="size">
                {{ size }} por página
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="filters-grid">
        <div class="chart-filter-select">
          <span class="chart-filter-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 5h18l-7 8v5l-4 2v-7L3 5z" />
            </svg>
          </span>
          <select v-model="material" class="chart-select">
            <option v-for="option in materialOptions" :key="option.label" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="chart-filter-select">
          <span class="chart-filter-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 5h18l-7 8v5l-4 2v-7L3 5z" />
            </svg>
          </span>
          <select v-model="range" class="chart-select">
            <option v-for="option in rangeOptions" :key="option.label" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="chart-filter-select">
          <span class="chart-filter-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 5h18l-7 8v5l-4 2v-7L3 5z" />
            </svg>
          </span>
          <select v-model="type" class="chart-select">
            <option v-for="option in typeOptions" :key="option.label" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="chart-filter-select">
          <span class="chart-filter-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 5h18l-7 8v5l-4 2v-7L3 5z" />
            </svg>
          </span>
          <select v-model="year" class="chart-select">
            <option v-for="option in years" :key="option.label" :value="option.value">
              {{ option.value ? `${option.label}` : "Todos los años" }}
            </option>
          </select>
        </div>
      </div>

      <div v-if="loading" class="chart-loading">
        Cargando datos...
      </div>

      <div v-else class="table-wrapper">
        <table class="stats-table">
          <thead>
            <tr>
              <th>Material</th>
              <th>Período</th>
              <th>Tipo</th>
              <th>Peso (Lb)</th>
           <th class="th-with-tooltip">
  Comparación
  <span class="info-icon-wrapper">
    ⓘ
    <span class="custom-tooltip">
      Muestra el peso relativo de cada registro respecto al valor más alto.
    </span>
  </span>
</th>
              <th>Año</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="!statsRows.length">
              <td colspan="7" class="empty-state">
                No hay datos para mostrar.
              </td>
            </tr>

            <tr v-for="stat in statsRows" :key="stat.id">
              <td>{{ stat.material_type?.name }}</td>
              <td>{{ stat.range?.description }}</td>
              <td>{{ stat.type?.name }}</td>
              <td class="weight">{{ stat.weight }} Lb.</td>
              <td>
                <div class="bar-container">
                  <div class="bar" :style="{
                    width: maxWeight
                      ? ((Number(stat.weight) || 0) / maxWeight) * 100 + '%'
                      : '0%'
                  }"></div>
                </div>
              </td>
              <td>{{ stat.year }}</td>
            </tr>
          </tbody>

          <tfoot v-if="statsRows.length">
            <tr class="summary-row">
              <td colspan="3">Total</td>
              <td>{{ totalWeight }} Lb.</td>
              <td colspan="3"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="table-footer" v-if="!loading">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <!-- inicio -->
            <li class="page-item" :class="{ disabled: page === 1 }">
              <a class="page-link" href="#" @click.prevent="goToFirst">Primero</a>
            </li>

            <!-- anterior -->
            <li class="page-item" :class="{ disabled: page === 1 }">
              <a class="page-link" href="#" @click.prevent="goToPrev">Anterior</a>
            </li>

            <!-- números -->
            <li v-for="(pageNumber, index) in pageButtons" :key="`${pageNumber}-${index}`" class="page-item" :class="{
              active: pageNumber === page,
              disabled: pageNumber === '...'
            }">
              <a v-if="pageNumber !== '...'" class="page-link" href="#" @click.prevent="changePageNumber(pageNumber)">
                {{ pageNumber }}
              </a>

              <span v-else class="page-link page-ellipsis">...</span>
            </li>

            <!-- siguiente -->
            <li class="page-item" :class="{ disabled: page === totalPages }">
              <a class="page-link" href="#" @click.prevent="goToNext">Siguiente</a>
            </li>

            <!-- final -->
            <li class="page-item" :class="{ disabled: page === totalPages }">
              <a class="page-link" href="#" @click.prevent="goToLast">Último</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-chart-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  overflow: visible;
}

.stats-chart-card__header {
  padding: 16px 18px 10px;
  border-bottom: 1px solid #f1f5f9;
}

.stats-chart-card__eyebrow {
  margin: 0 0 4px;
  font-size: 12px;
  color: #64748b;
}

.stats-chart-card__title {
  margin: 0;
  font-size: 20px;
  color: #0f172a;
  text-transform: uppercase;
}

.stats-chart-card__body {
  padding: 16px 18px 18px;
}

.chart-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.chart-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  min-width: 0;
  flex-wrap: wrap;
}

.chart-meta__label {
  color: #64748b;
}

.chart-meta__value {
  font-weight: 700;
  color: #0f172a;
}

.chart-meta__separator {
  color: #cbd5e1;
}

.chart-reset-btn {
  height: 36px;
  border: 1px solid #e5eaf1;
  border-radius: 4px;
  background: #f8fafc;
  color: #000000cb;
  padding: 0 10px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: none;
}

.chart-reset-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #5b8bd9;
}
.filters-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.chart-filter-select {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 36px;
  border-radius: 4px;
  background: #f8fafc;
  padding: 0 8px 0 30px;
  transition: all 0.2s ease;
}

.chart-filter-select:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.chart-filter-icon {
  position: absolute;
  left: 10px;
  display: inline-flex;
  align-items: center;
  color: #000000cb;
  pointer-events: none;
  z-index: 1;
}

.chart-select {
  width: 100%;
  min-width: 0;
  height: 34px;
  padding: 0 22px 0 0;
  border: none;
  border-radius: 0;
  background: transparent;
  color: #000000cb;
  font-size: 13px;
  font-weight: 500;
  outline: none;
  box-shadow: none;
  appearance: none;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-family: "Poppins", sans-serif;
}

.chart-select:focus {
  border: none;
  outline: none;
  box-shadow: none;
}

.chart-filter-select::after {
  content: "▾";
  position: absolute;
  right: 10px;
  font-size: 12px;
  color: #7c8aa5;
  pointer-events: none;
}

.chart-filter-select--small .chart-select {
  min-width: 120px;
}

.chart-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  flex-wrap: wrap;
}

.filters-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}
.chart-loading {
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
}

.table-wrapper {
  overflow-x: auto;
  overflow-y: visible;
}
.stats-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

.stats-table thead {
  background: #0D6EFD;
  color: #fff;
}

.stats-table th,
.stats-table td {
  padding: 12px;
  text-align: left;
  position: relative;
}

.stats-table tbody tr {
  border-bottom: 1px solid #eee;
}

.stats-table tbody tr:hover {
  background: #f8fafc;
}

.weight {
  font-weight: 600;
  color: #111827;
}

.summary-row {
  background: #f3f4f6;
  font-weight: bold;
}

.bar-container {
  width: 140px;
  height: 8px;
  background: #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: #0D6EFD;
  border-radius: 10px;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.badge-high {
  background: #dcfce7;
  color: #166534;
}

.badge-medium {
  background: #fef3c7;
  color: #92400e;
}

.badge-low {
  background: #fee2e2;
  color: #991b1b;
}

.badge-empty {
  background: #e5e7eb;
  color: #374151;
}

.empty-state {
  text-align: center;
  color: #6b7280;
  padding: 24px;
}

.table-footer {
  padding-top: 16px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
}

.page-link {
  min-width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-item.disabled .page-link {
  opacity: 0.4;
  pointer-events: none;
}

.page-ellipsis {
  cursor: default;
  color: #64748b;
}

.page-item.active .page-link {
  color: #fff;
  background: #0D6EFD;
  border-color: #0D6EFD;
}

.page-item.disabled .page-link {
  opacity: 0.45;
  pointer-events: none;
}

@media (max-width: 1200px) {
  .filters-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .filters-grid {
    grid-template-columns: 1fr;
  }

  .chart-topbar {
    align-items: stretch;
  }

  .chart-actions {
    width: 100%;
    margin-left: 0;
  }

  .chart-filter-select--small {
    flex: 1;
  }
}
.table-description {
  font-size: 13px;
  color: #64748b;
  margin-top: 4px;
  margin-bottom: 10px;
  line-height: 1.4;
}

.info-icon-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-left: 6px;
  cursor: help;
  color: rgba(255, 255, 255, 0.85);
  vertical-align: middle;  
}

.custom-tooltip {
  position: absolute;
  top: calc(100% + 8px);   
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  color: #fff;
  font-size: 12px;
  line-height: 1.4;
  padding: 8px 10px;
  border-radius: 6px;
  width: 220px;
  white-space: normal;
  text-align: left;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 9999;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
}
.custom-tooltip::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
}

.info-icon-wrapper:hover .custom-tooltip {
  opacity: 1;
  visibility: visible;
}
</style>