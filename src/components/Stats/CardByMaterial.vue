<script setup>
import { useStatsStore } from "../../stores/stats";
import { ref, onMounted, computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
    required: true,
  },
  material: {
    type: String,
    default: "",
    required: true,
  },
  color: {
    type: String,
    default: "",
    required: true,
  },
  icon: {
    type: String,
    default: "",
    required: true,
  },
});

const stats = useStatsStore();
const totalWeight = ref({});

const fetchData = async () => {
  try {
    totalWeight.value = await stats.getStatsByMaterialType(props.material);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchData();
});

const convertToKgNotDecimal = (value) => {
  return Math.round(value / 2.2046);
};

const getSumFromAllYears = computed(() => {
  if (!totalWeight.value?.data?.sumByMaterialType) return 0;

  const yearsKeys = Object.keys(totalWeight.value.data.sumByMaterialType);
  if (!yearsKeys.length) return 0;

  return convertToKgNotDecimal(
    yearsKeys.reduce((acc, year) => {
      return (
        acc +
        (+totalWeight.value.data.sumByMaterialType[year]?.interno +
          +totalWeight.value.data.sumByMaterialType[year]?.externo)
      );
    }, 0)
  );
});

const formattedValue = computed(() => {
  return Number(getSumFromAllYears.value || 0).toLocaleString("en-US");
});
</script>

<template>
  <article class="material-card" :style="{ '--card-color': color }">
    <div class="material-card__content">
      <div class="material-card__header">
        <div class="material-card__text">
          <p class="material-card__label">{{ title }}</p>
          <h2 class="material-card__value">{{ formattedValue }}</h2>
        </div>

        <div class="material-card__icon-box">
          <img :src="icon" :alt="title" class="material-card__icon" />
        </div>
      </div>

      <p class="material-card__meta">Total reciclado en Kg</p>
    </div>
  </article>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.material-card {
  flex: 1;
  min-width: 0;
  border-radius: 12px;
  padding: 14px 16px;
  color: #fff;
  background: var(--card-color);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.material-card__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 88px;
}

.material-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.material-card__text {
  min-width: 0;
}

.material-card__label {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.material-card__value {
  margin: 0;
  font-size: 2rem;
  line-height: 1;
  font-weight: 700;
  white-space: nowrap;
  color: #fff;
}

.material-card__meta {
  margin: 10px 0 0;
  text-align: right;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
}

.material-card__icon-box {
  width: 44px;
  height: 44px;
  min-width: 44px; 
  display: flex;
  align-items: center;
  justify-content: center;
}

.material-card__icon {
  width: 54px;
  height: 54px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 1;
}

@media (max-width: 768px) {
  .material-card {
    padding: 12px 14px;
  }

  .material-card__value {
    font-size: 1.7rem;
  }

  .material-card__icon-box {
    width: 40px;
    height: 40px;
    min-width: 40px;
  }

  .material-card__icon {
    width: 22px;
    height: 22px;
  }
}
</style>