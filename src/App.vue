<template>
  <a-layout class="layout-demo">
    <a-layout-sider theme="dark" breakpoint="lg" :width="200" :collapsed="collapsed" @collapse="onCollapse">
      <!-- <div class="logo" /> -->
      <RouterLink class="title" to="/home">
        <div>教育管理系统</div>
      </RouterLink>

      <div class="my" v-show="isLogin">
        <a-avatar trigger-type="mask" :size="140">
          <img alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
        </a-avatar>
        <div class="line">
          <div class="username">username</div>
          <a-button class="logout" type="primary" shape="circle" size="small">
            <icon-export />
          </a-button>
        </div>
      </div>



      <a-menu @menuItemClick="onClickMenuItem" :accordion="true">
        <a-sub-menu key="0">
          <template #title>
            <icon-apps></icon-apps><span>学生管理</span>
          </template>
          <a-menu-item key="0_1">学籍管理</a-menu-item>
          <a-menu-item key="0_2">成长信息记录</a-menu-item>
          <RouterLink active-class="" to="/student/handbook">
            <a-menu-item key="0_3">成长手册</a-menu-item>
          </RouterLink>

        </a-sub-menu>
        <RouterLink active-class="" to="/teacher">
          <a-menu-item key="1"><icon-list />教师管理</a-menu-item>
        </RouterLink>

        <a-sub-menu key="2">
          <template #title>
            <icon-apps></icon-apps><span>校产管理</span>
          </template>
          <RouterLink active-class="" to="/property/equipment">
            <a-menu-item key="2_1">设备管理</a-menu-item>
          </RouterLink>
          <RouterLink active-class="" to="/property/laboratory">
            <a-menu-item key="2_2">实验室管理</a-menu-item>
          </RouterLink>

        </a-sub-menu>

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
const isLogin = computed(() => {
  let token = localStorage.getItem('Authorization') 
  return token != null && token.length > 0
})
</script>
<style scoped>
.title {
  color: #1675FC;
  font-weight: bolder;
  line-height: 60px;
  text-align: center;
  width: 180px;
  font-size: 20px;
  letter-spacing: 1px;
  text-decoration: none;
  display: block;
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

.my {
  padding-top: 20px;
  text-align: center;
  height: 200px;
  background-color: #353843;
}

.line {
  line-height: 60px;
  width: 200px;
  /* margin-top: 10px; */
  color: white;
  font-weight: bolder;
  font-size: 16px;
  letter-spacing: 1px;
}
.username {
  display: inline-block;
  width: 100px;
  user-select: none;
}
.logout {
  margin-left: 10px;
}
</style>
