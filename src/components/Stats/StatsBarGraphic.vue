<script setup>
import { useStatsStore } from "../../stores/stats";
import { ref, onMounted, computed, watch } from "vue";
import {
  DxChart,
  DxSeries,
  DxCommonSeriesSettings,
  DxLegend,
  DxExport,
  DxLabel,
  DxTooltip,
} from "devextreme-vue/chart";

const props = defineProps({
  material: {
    type: [String, null],
    default: null,
  },
});

const stats = useStatsStore();
const statsData = ref({});
const loading = ref(false);
const chartRef = ref(null);

const material = ref(props.material || null);

const materialOptions = [
  { value: null, label: "Todos" },
  { value: "1", label: "Lata" },
  { value: "2", label: "Botella" },
  { value: "3", label: "Papel" },
  { value: "4", label: "Hierro" },
  { value: "5", label: "Cartón" },
];

const selectedMaterialLabel = computed(() => {
  const found = materialOptions.find((item) => item.value === material.value);
  return found ? found.label : "Todos";
});

const fetchData = async () => {
  try {
    loading.value = true;
    statsData.value = await stats.getStatsByMaterialType(material.value || "");
  } catch (error) {
    console.error("Error fetching data:", error);
    statsData.value = {};
  } finally {
    loading.value = false;
  }
};

watch(material, async () => {
  await fetchData();
});

onMounted(async () => {
  await fetchData();
});

const dataSource = computed(() => {
  const raw = statsData.value?.data?.sumByMaterialType || {};
  const allowedYears = lastYears.value;

  return Object.entries(raw)
    .filter(([year]) => allowedYears.includes(year))
    .map(([year, data]) => ({
      year,
      interno: Number(data?.interno || 0),
      externo: Number(data?.externo || 0),
    }))
    .sort((a, b) => b.year - a.year);
});

const customizeTooltip = (pointInfo) => ({
  text: `${pointInfo.seriesName}: ${pointInfo.valueText} Lb`,
});

const customizeText = ({ valueText }) => `${valueText} Lb`;

const exportChart = async () => {
  const instance = chartRef.value?.instance;
  if (!instance) return;

  // obtener SVG del gráfico
  const svg = instance.svg();

  const svgBlob = new Blob([svg], {
    type: "image/svg+xml;charset=utf-8",
  });

  const url = URL.createObjectURL(svgBlob);

  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    // dibujar gráfico
    ctx.drawImage(img, 0, 0);

    // convertir a blanco y negro
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;     // rojo
      data[i + 1] = avg; // verde
      data[i + 2] = avg; // azul
    }

    ctx.putImageData(imageData, 0, 0);

    // agregar el logo
    const logo = new Image();
    logo.src = "/img/logoVerde.png"; 

    logo.onload = () => {
      const logoWidth = 60;
      const logoHeight = 60;

      const x = canvas.width / 2 - logoWidth / 2;
      const y = canvas.height / 2 - logoHeight / 2;

      // fondo blanco translúcido
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      ctx.fillRect(x - 15, y - 10, logoWidth + 30, logoHeight + 20);

      // logo
      ctx.drawImage(logo, x, y, logoWidth, logoHeight);

      // texto opcional
      ctx.font = "bold 16px Arial";
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.textAlign = "center";

      ctx.fillText(
        "Observatorio Verde UGB",
        canvas.width / 2,
        y + logoHeight + 20
      );

      // descargar
      const link = document.createElement("a");
      link.download = `reporte-${selectedMaterialLabel.value}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      URL.revokeObjectURL(url);
    };
  };

  img.src = url;
};

const lastYears = computed(() => {
  const currentYear = new Date().getFullYear();

  const years = [];

  for (let i = 0; i < 10; i++) {
    years.push(String(currentYear - i));
  }

  return years;
});

</script>

<template>
  <div class="col-lg-6">
    <div class="stats-chart-card">
      <div class="stats-chart-card__header">
        <div>
          <p class="stats-chart-card__eyebrow">Estadísticas</p>
          <h3 class="stats-chart-card__title">Reciclaje por tipo de material</h3>
        </div>
      </div>

      <div class="stats-chart-card__body">
        <div class="chart-topbar">
          <div class="chart-meta">
            <span class="chart-meta__label">Mostrando:</span>
            <span class="chart-meta__value">{{ selectedMaterialLabel }}</span>
          </div>

          <div class="chart-actions">
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

            <button type="button" class="chart-action-btn" @click="exportChart" title="Descargar gráfico"
              aria-label="Descargar gráfico">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="M7 10l5 5 5-5" />
                <path d="M12 15V3" />
              </svg>
            </button>
          </div>
        </div>

        <div v-if="loading" class="chart-loading">
          Cargando gráfico...
        </div>

        <div v-else class="chart-wrapper">
          <DxChart ref="chartRef" id="chart-material" :data-source="dataSource" palette="Soft" :title="null">
            <DxCommonSeriesSettings argument-field="year" type="bar" :ignore-empty-points="true">
              <DxLabel :visible="true" :customize-text="customizeText" />
            </DxCommonSeriesSettings>

            <DxSeries value-field="interno" name="Interno" color="#97C95C" />

            <DxSeries value-field="externo" name="Externo" color="#1DB2F5" />

            <DxLegend vertical-alignment="bottom" horizontal-alignment="center" />

            <DxExport :enabled="false" />

            <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip" location="edge" />
          </DxChart>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-chart-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  overflow: hidden;
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
  margin-bottom: 12px;
}

.chart-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  min-width: 0;
}

.chart-meta__label {
  color: #64748b;
}

.chart-meta__value {
  font-weight: 700;
  color: #0f172a;
}

.chart-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
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
  color: #000;
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
  border-color: #1db2f5;
  box-shadow: 0 0 0 3px rgba(29, 178, 245, 0.12);
}

.chart-action-btn {
  width: 38px;
  height: 38px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: #fff;
  color: #000000cb;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chart-action-btn:hover {
  border-color: #1db2f5;
  color: #1db2f5;
  background: #f0f9ff;
}

.chart-loading {
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
}

.chart-wrapper {
  min-height: 320px;
}

@media (max-width: 768px) {
  .chart-topbar {
    flex-wrap: wrap;
    align-items: stretch;
  }

  .chart-actions {
    width: 100%;
    margin-left: 0;
  }

  .chart-filter-select {
    flex: 1;
  }

  .chart-select {
    width: 100%;
  }
}
</style>