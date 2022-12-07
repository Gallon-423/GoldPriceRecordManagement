<script lang="ts" setup>
import {
  deleteMetal,
  getMetals,
  getMetalsByName,
  getMetalTypes,
  type Metal,
  type MetalType,
  type MetalTypeTag,
} from "@/api";
import { number } from "echarts";
import {
  NButton,
  NCard,
  NInput,
  NSelect,
  NTab,
  NTag,
  useDialog,
  useMessage,
  type DataTableColumns,
  type SelectOption,
} from "naive-ui";

import { defineComponent, h, nextTick, ref } from "vue";
const message = useMessage();

const value = ref<string|null>(null);
const metalTypes = ref<MetalType[] | null>();
const options = ref([] as any[]);
const tableData = ref<Metal[] | null>();
const dialog = useDialog();
getMetalTypes().then((res) => {
  metalTypes.value = res;
  res?.forEach((element) => {
    options.value?.push({
      label: `${element.cnname}(${element.name})`,
      value: element.name,
    } );
  });
});
const handleDelete = (id: number) => {
  deleteMetal(id).then(
    (res) => {
      message.success("删除成功,刷新后查看结果！");
    },
    (err) => {
      message.error("当前记录不存在");
    }
  );
};
const handleUpdateValue = (val: string, option: SelectOption) => {
  value.value = val
  tableData.value = [{variety:"",time:"",id:-1,latestpri:0,maxpri:0,minpri:0,openpri:0,limit:"",yespri:0,totalvol:0}]
}

const columns = [
  
  {
    title: "种类",
    key: "variety",
    render(row: any, index: any) {
      return h(NTag, {
        type:"success"
      },[value.value]);
    },
  },
  {
    title: "日期",
    key: "time",
    render(row: any, index: any) {
      return h(NInput, {
        value: row.time,
        onUpdateValue(v) {
          tableData.value![0].time = v;
        },
      });
    },
  },
  {
    title: "开盘价",
    key: "openpri",
    render(row: any, index: any) {
      return h(NInput, {
        value: row.openpri,
        onUpdateValue(v) {
          tableData.value![0].openpri = +v;
        },
      });
    },
  },
  {
    title: "昨日价",
    key: "yespri",
    render(row: any, index: any) {
      return h(NInput, {
        value: row.yespri,
        onUpdateValue(v) {
          tableData.value![0].yespri = +v;
        },
      });
    },
  },
  {
    title: "最高价",
    key: "maxpri",
    render(row: any, index: any) {
      return h(NInput, {
        value: row.maxpri,
        onUpdateValue(v) {
          tableData.value![0].maxpri = +v;
        },
      });
    },
  },
  {
    title: "涨跌",
    key: "limit",
    render(row: any, index: any) {
      return h(NInput, {
        value: row.limit,
        onUpdateValue(v) {
          tableData.value![0].limit = v;
        },
      });
    },
  },
  {
    title: "成交量",
    key: "totalvol",
    render(row: any, index: any) {
      return h(NInput, {
        value: row.totalvol,
        onUpdateValue(v) {
          tableData.value![0].totalvol = +v;
        },
      });
    },
  },
  {
    title: "提交",
    render: (row: any, index: any) => {
      return h(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-around",
          },
        },
        [
         
          h(
            NButton,
            {
              type: "success",
              size: "small",
              onClick: () => {
                console.log("row==>", row);
                console.log("index==>", index);
                message.success('牛马')
              },
            },
            [`提交`]
          ),
        ]
      );
    },
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
      />
    </n-row>
  </div>
</template>

<style></style>
