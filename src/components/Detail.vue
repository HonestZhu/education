<template>
    <div class="root">
        <div class="head">
            <a-space direction="vertical" :size="16" style="display: block;">
                <a-row>
                    <a-col :span="3" class="info">
                        选中 <span class="digit">{{ selectedKeys.length }}</span> of  <span class="digit">{{ data.length }}</span>
                    </a-col>

                    <a-col :span="17">
                    </a-col>

                    <a-col :span="2">
                        <a-button type="primary" size="large"
                            @click="add"><icon-plus-circle-fill />&nbsp;&nbsp;添加</a-button>
                    </a-col>
                    <a-col :span="2">
                        <a-button type="primary" size="large" status="danger"
                            @click="del"><icon-delete />&nbsp;&nbsp;删除</a-button>
                    </a-col>
                </a-row>
            </a-space>
        </div>
        <!-- 显示数据 -->
        <div class="body">
            <a-table row-key="name" :columns="columns" :data="data" :row-selection="rowSelection"
                v-model:selectedKeys="selectedKeys" :pagination="pagination">
                <template #columns>
                    <!-- 动态获取列 -->
                    <a-table-column v-for="(item, index) in columns" :key="item.title" :title="item.title"
                        :data-index="item.dataIndex" :sortable="item.sortable">
                    </a-table-column>
                    <!-- 自定义按钮（编辑） -->
                    <a-table-column title="Optional">
                        <template #cell="{ record }">
                            <a-button type="dashed" @click="edit(record)">编辑</a-button>
                        </template>
                    </a-table-column>
                </template>
            </a-table>
        </div>

        <a-modal v-model:visible="editVisible" @ok="editSubmit" @cancel="editCancel">
            <template #title>
                编辑
            </template>

            <a-form >
                <a-form-item v-for="(item, index) in columns" :key="item" :field="item.title" 
                    :label="item.title">
                    <a-input  :placeholder="'请输入' + item.dataIndex" v-model="editData[item.dataIndex]"/>
                </a-form-item>
            </a-form>
        </a-modal>

        
        <a-modal v-model:visible="addVisible" @ok="addSubmit" @cancel="addCancel">
            <template #title>
                添加
            </template>

            <a-form >
                <a-form-item v-for="(item, index) in columns" :key="item" :field="item.title" 
                    :label="item.title">
                    <a-input  :placeholder="'请输入' + item.dataIndex" v-model="addData[item.dataIndex]"/>
                </a-form-item>
            </a-form>
        </a-modal>

    </div>
</template>
<script setup>
import { defineProps, reactive, ref } from 'vue';

const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false
});
const selectedKeys = ref([]);
const pagination = { pageSize: 16 }
const editVisible = ref(false);
const addVisible = ref(false);

const editData = ref({});
const addData = ref({});

const props = defineProps({
    columns: {
        type: Array,
        required: true,
    },
    data: {
        type: Array,
        required: true,
    },
});

const add = () => {
    addVisible.value = true
}

const addSubmit = () => {
    addVisible.value = false
}

const addCancel = () => {
    addVisible.value = false
    addData.value = {}
}


const del = () => {
    console.log(selectedKeys.value);
}


const edit = (record) => {
    editData.value = record
    editVisible.value = true
}

const editSubmit = () => {
    editData.value = {}
    editVisible.value = false
}

const editCancel = () => {
    editData.value = {}
    editVisible.value = false
}

</script>
<style scoped>
.root {
    height: 100%;
    width: 100%;
}

.head {
    padding: 10px;
    height: 50px;
    line-height: 50px;
}

.body {
    height: calc(100% - 70px);
}

.info {
    color: #1675FC;
}

.digit {
    display: inline-block;
    font-size: 20px;
    font-weight: bolder;
    min-width: 30px;
    margin-left: 5px;
}
</style>
  