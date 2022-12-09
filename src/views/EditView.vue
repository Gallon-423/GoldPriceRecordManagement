<script lang="ts" setup>
import {
  deleteRecord,
  getRecords,
  getRecordsByVariety,
  getVarieties,
  updateRecord,
  type MetalRecord,
  type Variety,
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

import { defineComponent, h, nextTick, reactive, ref } from "vue";
const message = useMessage();

const value = ref(null);
const metalTypes = ref<Variety[] | null>();
const options = ref([{ label: `全部`, value: `all` }]);
const tableData = ref<MetalRecord[] | null>();
const dialog = useDialog();
getVarieties().then((res) => {
  metalTypes.value = res?.variety;
  res?.variety.forEach((element) => {
    options.value?.push({
      label: `${element.cnname}(${element.variety})`,
      value: element.variety,
    });
  });
});
const handleDelete = (id: number) => {
  deleteRecord(id).then(
    (res) => {
      message.success("删除成功，刷新后查看结果！");
    },
    (err) => {
      message.error("当前记录不存在");
    }
  );
};
const handleSubmitUpdate = (id: number, record: MetalRecord) => {
  updateRecord(id, record).then(
    (res) => {
      message.success("编辑成功，刷新后查看结果！");
    },
    (err) => {
      message.error("编辑失败，请检查数据格式！");
    }
  );
};
function handleUpdateValue(value: string, option: SelectOption) {
  if (value == "all") {
    getRecords().then((res) => {
      res?.forEach((element) => {
        element.time = element.time.split("T")[0];
      });
      tableData.value = res;
    });
  } else {
    getRecordsByVariety(value).then((res) => {
      res?.forEach((element) => {
        element.time = element.time.split("T")[0];
      });
      tableData.value = res;
      console.log("tableData==>", tableData);
    });
  }
}
const pagination = reactive({
  page: 1,
  pageSize: 7,
  onChange: (page: number) => {
    pagination.page = page;
  },
});
const columns = [
  {
    title: "记录号",
    key: "id",
    defaultSortOrder: "ascend",
    sorter: "default",
  },
  {
    title: "种类",
    key: "variety",
    sorter: "default",
    render(row: any, index: any) {
      return h(
        NTag,
        {
          type: "success",
        },
        row.variety
      );
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
          tableData.value![pagination.page*pagination.pageSize+index].time = v;
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
          tableData.value![pagination.page*pagination.pageSize+index].openpri = +v;
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
          tableData.value![pagination.page*pagination.pageSize+index].yespri = +v;
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
          tableData.value![pagination.page*pagination.pageSize+index].maxpri = +v;
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
          console.log("index", index);
          tableData.value![pagination.page*pagination.pageSize+index].limit = v;
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
          tableData.value![pagination.page*pagination.pageSize+index].totalvol = +v;
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
                handleSubmitUpdate(row.id, row as MetalRecord);
                console.log("edit row =>", row as MetalRecord);
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
        :pagination="pagination"
      />
    </n-row>
  </div>
</template>

<style></style>
