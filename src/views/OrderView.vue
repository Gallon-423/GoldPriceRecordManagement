<script lang="ts" setup>
import {
  getAverVol,
  getVarieties,
  type MetalRecord,
  type Variety,
} from "@/api";
import type { SelectOption } from "naive-ui";
import { reactive, ref } from "vue";

const value = ref("aver");
const metalTypes = ref<Variety[] | null>();
const echartsTypeOptions = reactive([
  { label: `总成交量`, value: `total` },
  { label: `平均成交量`, value: `aver` },
]);
const option = reactive({
  legend: {
    left:"left"
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: "总成交量",
      type: "pie",
      radius: [50, 160],
      center: ["50%", "58%"],
      roseType: "area",
      itemStyle: {
        borderRadius: 8,
      },
      labelLine: {
        length: 30,
      },
      label: {
        formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c} g  {per|{d}%}  ",
        backgroundColor: "#F6F8FC",
        borderColor: "#8C8D8E",
        borderWidth: 1,
        borderRadius: 4,
        rich: {
          a: {
            color: "#6E7079",
            lineHeight: 18,
            align: "center",
          },
          hr: {
            borderColor: "#8C8D8E",
            width: "100%",
            borderWidth: 1,
            height: 0,
          },
          b: {
            color: "#4C5058",
            fontSize: 10,
            fontWeight: "bold",
            lineHeight: 24,
          },
          per: {
            color: "#fff",
            backgroundColor: "#4C5058",
            padding: [3, 4],
            borderRadius: 4,
          },
        },
      },
      data: [] as any[],
    },
  ] as any[],
});
getVarieties().then((res) => {
  metalTypes.value = res?.variety;
  option.series[0].name = "近七天平均日成交量";
  res?.variety
    .map((res) => {
      return res.variety;
    })
    .forEach((name) => {
      getAverVol(name).then((res) => {
       
        option.series[0].data.push({ value: res.vol, name: name });
      });
    });

  console.log(res);
});
function handleUpdateValue(value: string, selectOption: SelectOption) {
  option.series[0].data=[]
  if (value == "aver") {
    getVarieties().then((res) => {
      metalTypes.value = res?.variety;
      option.series[0].name = "近七天平均日成交量";
      res?.variety
        .map((res) => {
          return res.variety;
        })
        .forEach((name) => {
          getAverVol(name).then((res) => {
           
            option.series[0].data.push({ value: res.vol, name: name });
          });
        });

      console.log(res);
    });
  } else if (value == "total") {
    getVarieties().then((res) => {
      metalTypes.value = res?.variety;
      option.series[0].name = "总成交量";
      res?.variety
        .map((res) => {
          return res.variety;
        })
        .forEach((name) => {
          getAverVol(name).then((res) => {
            option.series[0].data.push({ value: res.vol, name: name });
          });
        });

      console.log(res);
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
      <v-chart :option="option" style="height: 80vh; width: 70vw"></v-chart>
    </n-row>
  </div>
</template>

<style></style>
