<template>
  <a-layout class="layout-demo">
    <a-layout-sider theme="dark" breakpoint="lg" :width="250" collapsible :collapsed="collapsed" @collapse="onCollapse">
      <!-- <div class="logo" /> -->
      <RouterLink class="title" to="/home">
        <div>教育局综合信息服务平台</div>
      </RouterLink>



      <a-menu @menuItemClick="onClickMenuItem">
        <a-sub-menu key="0">
          <template #title>
            <span>学生管理</span>
          </template>
          <a-menu-item key="0_1">学籍管理</a-menu-item>
          <a-menu-item key="0_2">成长信息记录</a-menu-item>
          <a-menu-item key="0_3">成长手册</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="1">教师管理</a-menu-item>
        <!-- <a-sub-menu key="1">
          <template #title>
            <span>教师管理</span>
          </template>
          <a-menu-item key="1_1">教师信息管理</a-menu-item>
          <a-menu-item key="1_2">机构编制管理</a-menu-item>
          <a-menu-item key="1_3">工资福利管理</a-menu-item>
          <a-menu-item key="1_4">职称管理</a-menu-item>
          <a-menu-item key="1_5">异动管理</a-menu-item>
          <a-menu-item key="1_6">绩效考核</a-menu-item>
          <a-menu-item key="1_7">统计查询</a-menu-item>
        </a-sub-menu> -->
        <a-sub-menu key="2">
          <template #title>
            <span>校产管理</span>
          </template>
          <RouterLink active-class="" to="/property/equipment">
            <a-menu-item key="2_1">设备管理</a-menu-item>
          </RouterLink>
          <RouterLink active-class="" to="/property/laboratory">
            <a-menu-item key="2_2">实验室管理</a-menu-item>
          </RouterLink>

        </a-sub-menu>
        <a-menu-item key="3">我的账户</a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout style="padding: 0 24px">

        <a-breadcrumb :style="{ margin: '16px 0' }">
          <a-breadcrumb-item v-for="(item, index) in currentHref" :key="index">
            {{ item.split('?')[0] }}
          </a-breadcrumb-item>
        </a-breadcrumb>


        <a-layout-content style="height: 100%; width: 100%;">
          <transition name="fade" mode="out-in">
            <router-view v-slot="{ Component }">
              <component :is="Component" />
            </router-view>
          </transition>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { defineComponent, ref, computed } from 'vue';
import { RouterLink, useRoute } from "vue-router";

import {
  IconHome,
  IconCalendar,
} from '@arco-design/web-vue/es/icon';

const collapsed = ref(false);
const onCollapse = (val, type) => {
  collapsed.value = val;
}

const route = useRoute();
const currentHref = computed(() => {
  return route.fullPath.split('/')
});
</script>
<style scoped>
.title {
  color: #1675FC;
  font-weight: bolder;
  line-height: 60px;
  text-align: center;
  width: 250px;
  font-size: 20px;
  letter-spacing: 1px;
  text-decoration: none;
}

.title:hover {
  cursor: pointer;
}

.layout-demo {
  height: 100vh;
  background: var(--color-fill-2);
  /* border: 1px solid var(--color-border); */
}

.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}

.layout-demo :deep(.arco-layout-sider-light) .logo {
  background: var(--color-fill-2);
}

.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}

.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
