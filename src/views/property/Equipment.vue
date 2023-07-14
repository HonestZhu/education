<template>
    <div class="root">
        <Detail :columns="columns" baseUrl="equipment"></Detail>
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
        title: '实验室ID',
        dataIndex: 'labId'
    },
    {
        title: '名称',
        dataIndex: 'name'
    },
    {
        title: '类型',
        dataIndex: 'type'
    },
    {
        title: '价格',
        dataIndex: 'price',
    },
    {
        title: '描述',
        dataIndex: 'description',
    },
    {
        title: '购买时间',
        dataIndex: 'purchaseTime',
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
  