<script lang="ts" setup>
import { defineComponent, h, ref } from "vue";
import type { Component } from "vue";
import { NIcon, useMessage } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { RouterLink, useRouter } from "vue-router";
import {
  HomeOutline as HomeIcon,
  AnalyticsSharp,
  BarChart,
  BookmarksSharp,
} from "@vicons/ionicons5";
const router = useRouter();

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
function handleUpdateValue(key: string, item: MenuOption) {
  router.push({
    name: key,
  });
}
const menuOptions: MenuOption[] = [
  {
    label: "首页",
    key: "home",
    icon: renderIcon(HomeIcon),
    ref: "home",
  },
  {
    label: "贵金属价格",
    key: "price",
    icon: renderIcon(AnalyticsSharp),
    children: [
      {
        label: "价格查询",
        key: "query",
      },
      {
        label: "价格编辑",
        key: "edit",
      },
      {
        label: "价格插入",
        key: "insert",
      },
    ],
  },
  {
    label: "统计查询",
    key: "dance-dance-dance",
    icon: renderIcon(BarChart),
    children: [
      {
        type: "group",
        label: "可视化",
        key: "people",

        children: [
          {
            label: "成交量对比",
            key: "order",
          },
          {
            label: "价格对比",
            key: "compare",
          },
        ],
      },
    ],
  },
];
</script>
<template>
  <n-layout style="height: 100vh; width: 100vw">
    <n-layout-header
      style="height: 10vh; padding: 2vh"
      bordered
      :inverted="true"
    >
      <div class="f-row">
        <img src="@/assets/notebook.ico" style="height: 6vh" />
        <h3>贵金属价格监管系统</h3>
      </div>
    </n-layout-header>
    <n-layout position="absolute" style="top: 10vh; bottom: 10vh" has-sider>
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
        style="max-height: 80vh"
        :invered="true"
      >
        <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          @update:value="handleUpdateValue"
        />
      </n-layout-sider>
      <n-layout :native-scrollbar="false">
        <n-message-provider>
          <n-dialog-provider>
            <router-view></router-view>
          </n-dialog-provider>
        </n-message-provider>
      </n-layout>
    </n-layout>
    <n-layout-footer
      position="absolute"
      style="height: 10vh; padding: 2vh"
      bordered
      :inverted="true"
    >
      <div class="f-row">
        <n-icon size="4vh" color="#a00">
          <BookmarksSharp></BookmarksSharp>
        </n-icon>
        <h3>contributors: Gallon、Bin、Pigeon</h3>
      </div>
    </n-layout-footer>
  </n-layout>
</template>
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
