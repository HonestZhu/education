<template>
    <div class="root">
        <div class="head">
            <a-space direction="vertical" :size="16" style="display: block;">
                <a-row>
                    <a-col :span="3" class="info">
                        选中 <span class="digit">{{ selectedKeys.length }}</span> of <span class="digit">{{ data.length
                        }}</span>
                    </a-col>

                    <a-col :span="17">
                    </a-col>
                    <a-col :span="2">
                        <a-popconfirm :content="'你确定要删除' + selectedKeys.length + '个数据？'" okText="确认" cancelText="取消"
                            type="error" @ok="remove">
                            <a-button type="primary" size="large" status="danger"
                                :disabled="selectedKeys.length == 0"><icon-delete />&nbsp;&nbsp;删除</a-button>
                        </a-popconfirm>
                    </a-col>
                    <a-col :span="2">
                        <a-button type="primary" size="large"
                            @click="add"><icon-plus-circle-fill />&nbsp;&nbsp;添加</a-button>
                    </a-col>

                </a-row>
            </a-space>
        </div>
        <!-- 显示数据 -->
        <div class="body">
            <a-table column-resizable row-key="id" :table-layout-fixed="true" :columns="columns" :data="data"
                :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="pagination">
                <template #columns>
                    <!-- 动态获取列 -->
                    <a-table-column v-for="(item, index) in columns" :key="index" :title="item.title"
                        :data-index="item.dataIndex" :sortable="item.sortable" align="center">
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

            <a-form>
                <a-form-item v-for="(item, index) in columns" :key="item" :field="item.title" :label="item.title">
                    <a-input :placeholder="'请输入' + item.title" v-model="editData[item.dataIndex]"
                        :disabled="item.dataIndex.includes('id')" v-if="item.dataIndex != 'gender'" />
                    <a-space direction="vertical" size="large" v-else>
                        <a-radio-group v-model="editData.gender">
                            <a-radio value="男">男</a-radio>
                            <a-radio value="女">女</a-radio>
                        </a-radio-group>
                    </a-space>
                </a-form-item>
            </a-form>
        </a-modal>


        <a-modal v-model:visible="addVisible" @ok="addSubmit" @cancel="addCancel">
            <template #title>
                添加
            </template>

            <a-form>
                <a-form-item v-for="(item, index) in columns" :key="item" :field="item.title" :label="item.title">
                    <a-input :placeholder="'请输入' + item.title" v-model="addData[item.dataIndex]"
                        :disabled="item.dataIndex.includes('id')" v-if="item.dataIndex != 'gender'"/>
                    <a-space direction="vertical" size="large" v-else>
                        <a-radio-group v-model="addData.gender">
                            <a-radio value="男">男</a-radio>
                            <a-radio value="女">女</a-radio>
                        </a-radio-group>
                    </a-space>
                </a-form-item>
            </a-form>
        </a-modal>

    </div>
</template>
<script setup>
import { defineProps, reactive, ref, onMounted } from 'vue';
import { Message } from '@arco-design/web-vue';
import { get, post, put, del } from '../utils/axios'

const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false
});
const selectedKeys = ref([]);
const pagination = { pageSize: 10 }
const editVisible = ref(false);
const addVisible = ref(false);

const editData = ref({});
const addData = ref({});
const data = ref([])

const props = defineProps({
    columns: {
        type: Array,
        required: true,
    },
    // data: {
    //     type: Array,
    //     required: true,
    // },
    baseUrl: {
        type: String,
        required: true
    }

});

const fetchData = async () => {
    try {
        const response = await get(props.baseUrl);
        console.log(response);
        let t = response.data.data
        for (let i = 0; i < t.length; i++) {
            if (t[i].hasOwnProperty('gender'))
                t[i].gender = t[i].gender ? '女' : '男'
            if (t[i].hasOwnProperty('salary'))
                t[i].salary = parseInt(t[i].salary)
        }
        data.value = t
    } catch (error) {
        Message.error({
            content: error.message
        });
        return null;
    }
};

const add = () => {
    addVisible.value = true
}

const addSubmit = async () => {
    try {
        if (addData.value.hasOwnProperty('gender'))
            addData.value.gender = addData.value.gender == '男' ? 0 : 1
        const response = await put(props.baseUrl, addData.value);
        addVisible.value = false
        fetchData()
        Message.success({
            content: '添加成功！'
        });
    } catch (error) {
        Message.error({
            content: error.message
        });
        addVisible.value = false
    }
};

const addCancel = () => {
    addVisible.value = false
    addData.value = {}
}


const remove = async () => {
    try {
        const response = await post(props.baseUrl + '/delete', selectedKeys.value);
        fetchData()
        if (response) {
            Message.success({
                content: '删除成功！'
            });
        }

    } catch (error) {
        Message.error({
            content: error.message
        });
    }
};

const edit = (record) => {
    editData.value = record
    editVisible.value = true
}

const editSubmit = async () => {
    try {
        if (editData.value.hasOwnProperty('gender'))
            editData.value.gender = editData.value.gender == '男' ? 0 : 1
        const response = await post(props.baseUrl, editData.value);
        fetchData()
        Message.success({
            content: '编辑成功！'
        });
        editVisible.value = false
    } catch (error) {
        Message.error({
            content: error.message
        });
        editVisible.value = false
    }
};

const editCancel = () => {
    editData.value = {}
    editVisible.value = false
}

onMounted(() => {
    fetchData()
});

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
  