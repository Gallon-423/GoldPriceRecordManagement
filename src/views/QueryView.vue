<script lang="ts" setup>
import {
  getMetals,
  getMetalsByName,
  getMetalTypes,
  type Metal,
  type MetalType,
  type MetalTypeTag,
} from "@/api";
import type { SelectOption } from "naive-ui";
import { ref } from "vue";

const value = ref(null);
const metalTypes = ref<MetalType[] | null>();
const options = ref<MetalTypeTag[] | null>([{ label: `全部`, value: `all` }]);
const tableData = ref<Metal[] | null>();
getMetalTypes().then((res) => {
  metalTypes.value = res;
  res?.forEach((element) => {
    options.value?.push({
      label: `${element.cnname}(${element.name})`,
      value: element.name,
    } as MetalTypeTag);
  });
  console.log(res);
  console.log(options.value);
});
function handleUpdateValue(value: string, option: SelectOption) {
  if (value == "all") {
    getMetals().then((res) => {
      tableData.value = res;
    });
  } else {
    getMetalsByName(value).then((res) => {
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
