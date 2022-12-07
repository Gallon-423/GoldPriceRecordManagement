<template>
  <div style="padding: 3vw">
    <n-row>
      <n-col span="6">
        <n-statistic label="数据库共收录了" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef"
            :from="0"
            :to="metalTypes?.length"
          />
          <template #suffix> 种贵金属 </template>
        </n-statistic>
      </n-col>
      <n-col v-if="metalTypes?(metalTypes?.length as number>=1):false" span="6">
        <n-statistic :label="`${metalTypes?metalTypes[0].cnname:'第一种金属'}总成交量`" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef"
            :from="0"
            :to="metalVols ? metalVols[0] : 0"
          />
          <template #suffix> 克 </template>
        </n-statistic>
      </n-col>
      <n-col v-if="metalTypes?(metalTypes?.length as number>=2):false" span="6">
        <n-statistic :label="`${metalTypes?metalTypes[1].cnname:'第二种金属'}总成交量`" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef"
            :from="0"
            :to="metalVols ? metalVols[1] : 0"
          />
          <template #suffix> 克 </template>
        </n-statistic>
      </n-col>
    </n-row>
    <n-row style="margin-top: 12vh">
      <v-chart :option="option" style="height: 70vh; width: 70vw"></v-chart>
    </n-row>
  </div>
</template>

<script setup lang="ts">
import {
  getAverVol,
  getRecords,
  getVarieties,
  type MetalRecord,
  type Variety,
  type VarietyResponse,
} from "@/api";
import { ref, onMounted, reactive } from "vue";
const metals = ref<MetalRecord[] | null>([]);
const metalTypes = ref<Variety[]>();
const metalVols = ref<Number[]|null>([]);
const option = reactive({
  title: {
    text: "金价变化",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    data: ["最高价", "开盘价", "最终价"],
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "最高价",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [] as number[],
    },
    {
      name: "开盘价",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [] as number[],
    },
    {
      name: "最终价",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [] as number[],
    },
  ],
});

getRecords().then((res) => {
  metals.value = res;
  console.log(
    "maxpri==>" +
      res?.map((x) => {
        return x.maxpri;
      })
  );
  option.xAxis[0].data = res
    ? res.map((x) => {
        return x.time;
      })
    : [];
  option.series[0].data = res
    ? res.map((x) => {
        return x.maxpri;
      })
    : [];
  option.series[1].data = res
    ? res.map((x) => {
        return x.openpri;
      })
    : [];
  option.series[2].data = res
    ? res.map((x) => {
        return x.latestpri;
      })
    : [];
});
getVarieties().then((res) => {
  metalTypes.value = res?.variety;
  res?.variety.forEach(ele => {
    getAverVol(ele.variety).then(
      res => {
        metalVols.value?.push(res.vol)
        console.log("getAverVol->",res);
      }
    )
    console.log("ele->",ele);
  })
});
</script>

<style scoped>
.f-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.f-row {
  display: flex;
  align-items: center;
}
.frame {
  border: 1px red solid;
}
</style>
