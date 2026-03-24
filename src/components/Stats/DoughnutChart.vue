<script setup>
import DxPieChart, {
  DxSmallValuesGrouping,
  DxLegend,
  DxSeries,
  DxFormat,
  DxLabel,
  DxConnector,
  DxExport,
} from "devextreme-vue/pie-chart";

const customizeLabel = (pointInfo) => {
  return `${pointInfo.argumentText}: ${pointInfo.valueText}%`;
};

defineProps(["TotalsByPeriod"]);
</script>

<template>
  <DxPieChart
    id="pie"
    :data-source="TotalsByPeriod"
    type="doughnut"
    title="Top Internet Languages"
    palette="Soft Pastel"
  >
    <DxSeries argument-field="language" value-field="percent">
      <DxSmallValuesGrouping :top-count="3" mode="topN" />
      <DxLabel
        :visible="true"
        :customize-text="customizeLabel"
        format="fixedPoint"
      >
        <DxConnector :visible="true" :width="1" />
      </DxLabel>
    </DxSeries>
    <DxExport :enabled="true" />
    <DxLegend horizontal-alignment="center" vertical-alignment="bottom" />
  </DxPieChart>
</template>

<style scoped></style>
