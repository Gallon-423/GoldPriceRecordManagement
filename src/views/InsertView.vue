<script lang="ts" setup>
import { getVarieties, insertRecord, type MetalRecord, type Variety } from "@/api";
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
const metalTypes = ref<Variety[] | null>();
const options = ref([] as any[]);
const tableData = ref<MetalRecord[] | null>();

getVarieties().then((res) => {
  metalTypes.value = res?.variety;
  res?.variety.forEach((element) => {
    options.value?.push({
      label: `${element.cnname}(${element.variety})`,
      value: element.variety,
    } );
  });
});

const handleUpdateValue = (val: string, option: SelectOption) => {
  value.value = val
  tableData.value = [{variety:"",time:"",latestpri:0,maxpri:0,minpri:0,openpri:0,limit:"",yespri:0,totalvol:0,cnname:""}]
}

const handleInsert = (record: MetalRecord) => {
  insertRecord(record).then(res => {
    message.success('插入完成')
  }, err => {
    message.success('插入失败，请检查数据是否正确！')
  })
}

const columns = [
  
  {
    title: "种类",
    key: "variety",
    render(row: any, index: any) {
      return h(NTag, {
        type: "success",
        style: {
          width: '5vw',
          overflow:'hidden'
        }
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
                
                row.variety = value.value
                console.log("row==>", row as MetalRecord);
                console.log("index==>", index);
                handleInsert(row as MetalRecord);
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
