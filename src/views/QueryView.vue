<script lang="ts" setup>
import { getRecords, getRecordsByVariety, getVarieties, type MetalRecord, type Variety } from "@/api";
import type { SelectOption } from "naive-ui";
import { ref } from "vue";

const value = ref(null);
const metalTypes = ref<Variety[] | null>();
const options = ref([{ label: `全部`, value: `all` }]);
const tableData = ref<MetalRecord[] | null>();
getVarieties().then((res) => {
  metalTypes.value = res?.variety;
  res?.variety.forEach((element) => {
    options.value?.push({
      label: `${element.cnname}(${element.variety})`,
      value: element.variety,
    });
  });
  console.log(res);
  console.log(options.value);
});
function handleUpdateValue(value: string, option: SelectOption) {
  if (value == "all") {
    getRecords().then((res) => {
      res?.forEach(element => {
        element.time=element.time.split('T')[0]
      });
      tableData.value = res;
      
    });
  } else {
    
    getRecordsByVariety(value).then((res) => {
      res?.forEach(element => {
        element.time=element.time.split('T')[0]
      });
      tableData.value = res;
    });
  }
}
const columns = [
  {
    title: "种类",
    key: "variety",
    sorter: "default",
  },
  {
    title: "日期",
    key: "time",
    defaultSortOrder: "ascend",
    sorter: "default",
  },
  {
    title: "开盘价",
    key: "openpri",
    sorter: "default",
  },
  {
    title: "昨日价",
    key: "yespri",
    sorter: "default",
  },
  {
    title: "最高价",
    key: "maxpri",
    sorter: "default",
  },
  {
    title: "涨跌",
    key: "limit",
    sorter: "default",
  },
  {
    title: "成交量",
    key: "totalvol",
    sorter: "default",
  },
];
</script>
<template>
  <div style="padding: 3vw">
    <n-row vertical>
      <n-select
        v-model:value="value"
        :options="options"
        placeholder="请选择贵金属的种类"
        @update:value="handleUpdateValue"
      />
    </n-row>
    <n-row vertical>
      <n-data-table
        :columns="columns"
        :data="tableData"
        :pagination="{ pageSize: 7 }"
      />
    </n-row>
  </div>
</template>

<style></style>
