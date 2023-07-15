<template>
    <div class="root">
        <Detail :columns="columns" baseUrl="teacher"></Detail>
    </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue';
import { get, post } from '../utils/axios';
import { IconSearch } from '@arco-design/web-vue/es/icon';

const data = ref([])

const columns = [
    {
        title: 'ID',
        dataIndex: 'id'
    },
    {
        title: '姓名',
        dataIndex: 'name'
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
        title: '职位',
        dataIndex: 'job',
    },
    {
        title: '手机号',
        dataIndex: 'phone',
    },
    {
        title: '薪资',
        dataIndex: 'salary',
        sortable: {
          sortDirections: ['ascend', 'descend']
        }
    },
    {
        title: '性别',
        dataIndex: 'gender',
        sortable: {
          sortDirections: ['ascend', 'descend']
        }
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
  