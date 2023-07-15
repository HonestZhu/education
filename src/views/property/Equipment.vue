<template>
    <div class="root">
        <Detail :columns="columns" baseUrl="equipment"></Detail>
        <!-- <EquipmentCard :data="data[0]"></EquipmentCard> -->
    </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue';
import { get, post } from '../../utils/axios';
import { IconSearch } from '@arco-design/web-vue/es/icon';
import EquipmentCard from '../../components/EquipmentCard.vue'

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

const fetchData = async () => {
    try {
        const response = await get('equipment');
        data.value = response.data.data
        console.log(data.value);
    } catch (error) {
        // Message.error({
        //     content: error.message
        // });
        loading.value = false
    }
};

onMounted(() => {
});
</script>

<style scoped>
.root {
    width: 100%;
    height: 100%;
    display: flex;
}
</style>
  