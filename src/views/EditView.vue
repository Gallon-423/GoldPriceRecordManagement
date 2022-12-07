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

const value = ref(null);
const metalTypes = ref<MetalType[] | null>();
const options = ref<MetalTypeTag[] | null>([{ label: `全部`, value: `all` }]);
const tableData = ref<Metal[] | null>();
const dialog = useDialog();
getMetalTypes().then((res) => {
  metalTypes.value = res;
  res?.forEach((element) => {
    options.value?.push({
      label: `${element.cnname}(${element.name})`,
      value: element.name,
    } as MetalTypeTag);
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
function handleUpdateValue(value: string, option: SelectOption) {
  if (value == "all") {
    getMetals().then((res) => {
      tableData.value = res;
    });
  } else {
    getMetalsByName(value).then((res) => {
      tableData.value = res;
      console.log("tableData==>", tableData);
    });
  }
}

const columns = [
  {
    title: "记录号",
    key: "id",
  },
  {
    title: "种类",
    key: "variety",
    sorter: "default",
    render(row: any, index: any) {
      return h(NTag, {
        type:"success"
      },row.variety);
    },
  },
  {
    title: "日期",
    key: "time",
    defaultSortOrder: "ascend",
    sorter: "default",
    render(row: any, index: any) {
      return h(NInput, {
        value: row.time,
        onUpdateValue(v) {
          tableData.value![index].time = v;
        },
      });
    },
  },
  {
    title: "开盘价",
    key: "openpri",
    sorter: "default",
    render(row: any, index: any) {
      return h(NInput, {
        value: row.openpri,
        onUpdateValue(v) {
          tableData.value![index].openpri = +v;
        },
      });
    },
  },
  {
    title: "昨日价",
    key: "yespri",
    sorter: "default",
    render(row: any, index: any) {
      return h(NInput, {
        value: row.yespri,
        onUpdateValue(v) {
          tableData.value![index].yespri = +v;
        },
      });
    },
  },
  {
    title: "最高价",
    key: "maxpri",
    sorter: "default",
    render(row: any, index: any) {
      return h(NInput, {
        value: row.maxpri,
        onUpdateValue(v) {
          tableData.value![index].maxpri = +v;
        },
      });
    },
  },
  {
    title: "涨跌",
    key: "limit",
    sorter: "default",
    render(row: any, index: any) {
      return h(NInput, {
        value: row.limit,
        onUpdateValue(v) {
          tableData.value![index].limit = v;
        },
      });
    },
  },
  {
    title: "成交量",
    key: "totalvol",
    sorter: "default",
    render(row: any, index: any) {
      return h(NInput, {
        value: row.totalvol,
        onUpdateValue(v) {
          tableData.value![index].totalvol = +v;
        },
      });
    },
  },
  {
    title: "编辑",
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
              type: "error",
              size: "small",
              onClick: () => {
                dialog.warning({
                  title: "警告",
                  content: "你确定要删除该记录吗？",
                  positiveText: "确定",
                  negativeText: "不确定",
                  onPositiveClick: () => {
                    handleDelete(row.id);
                  },
                });
              },
            },
            `删除`
          ),
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
        :pagination="{ pageSize: 7 }"
      />
    </n-row>
  </div>
</template>

<style></style>
