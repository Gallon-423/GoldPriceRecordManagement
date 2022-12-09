<script lang="ts" setup>
import { getRecordsByVariety, getVarieties, type Variety } from "@/api";
import type { SelectOption } from "naive-ui";
import { reactive, ref } from "vue";

const value = ref("lineOpen");
const metalTypes = ref<Variety[] | null>();
const echartsTypeOptions = reactive([
  { label: `开盘价对比`, value: `lineOpen` },
  { label: `最高价对比`, value: `lineMax` },
  { label: `收盘价对比`, value: `lineClose` },
]);
const option = reactive({
  title: {
    text: "Stacked Line",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: [] as any[],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [] as any[],
  },
  yAxis: {
    type: "value",
  },
  series: [] as any[],
});
getVarieties().then((res) => {
  metalTypes.value = res?.variety;
  option.legend.data = res?.variety.map((e) => {
    return e.variety;
  }) as any[];
  option.title.text = "开盘价对比";
  option.legend.data.forEach((e) => {
    getRecordsByVariety(e).then((res) => {
      option.series.push({
        name: e,
        type: "line",
        data: res?.map((e) => {
          return e.openpri;
        }) as any[],
      });
      console.log(e);
      option.xAxis.data = res?.slice(0, 7).map((e) => {
        return e.time;
      }) as any[];
    });
  });
  console.log(res);
});
function handleUpdateValue(value: string, selectOption: SelectOption) {
  if (value == "lineOpen") {
    option.title.text = "开盘价对比";
    option.legend.data.forEach((e) => {
      getRecordsByVariety(e).then((res) => {
        option.series = [];
        option.series.push({
          name: e,
          type: "line",
          data: res?.map((e) => {
            return e.openpri;
          }) as any[],
        });
      });
    });
  } else if (value == "lineMax") {
    option.title.text = "最高价对比";
    option.legend.data.forEach((e) => {
      getRecordsByVariety(e).then((res) => {
        option.series = [];
        option.series.push({
          name: e,
          type: "line",
          data: res?.map((e) => {
            return e.maxpri;
          }) as any[],
        });
      });
    });
  } else if (value == "lineClose") {
    option.title.text = "收盘价对比";
    option.legend.data.forEach((e) => {
      getRecordsByVariety(e).then((res) => {
        option.series = [];
        option.series.push({
          name: e,
          type: "line",
          data: res?.map((e) => {
            return e.latestpri;
          }) as any[],
        });
      });
    });
  }
}
</script>
<template>
  <div style="padding: 3vw">
    <n-row vertical>
      <n-select
        v-model:value="value"
        :options="echartsTypeOptions"
        placeholder="选择数据展示类型的种类"
        @update:value="handleUpdateValue"
      />
    </n-row>
    <n-row style="margin-top: 12vh">
      <v-chart :option="option" style="height: 70vh; width: 70vw"></v-chart>
    </n-row>
  </div>
</template>

<style></style>
