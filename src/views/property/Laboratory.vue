<template>
    <div class="root">
        <Detail :columns="columns" baseUrl="laboratory"></Detail>
    </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue';
import { get, post } from '../../utils/axios';
import { IconSearch } from '@arco-design/web-vue/es/icon';

const data = ref([])

const columns = [
    {
        title: 'ID',
        dataIndex: 'id'
    },
    {
        title: '学院ID',
        dataIndex: 'departmentId'
    },
    // {
    //     title: '学院名称',
    //     dataIndex: 'departmentName'
    // },
    {
        title: '名称',
        dataIndex: 'name'
    },
    {
        title: '地址',
        dataIndex: 'address'
    }
]

onMounted(() => {
});
</script>

<style scoped>
.root {
    width: 100%;
    height: 100%;
}
</style>
  