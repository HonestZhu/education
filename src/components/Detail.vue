<template>
    <a-spin :loading="loading" tip="数据加载中" dot>
        <div class="root">
            <div class="head">
                <a-space direction="vertical" :size="16" style="display: block;">
                    <a-row>
                        <a-col :span="8">
                            <a-space direction="vertical" size="large">
                                <a-input-group>
                                    <a-select v-model="options" :style="{ width: '160px' }" value-key="title"
                                        placeholder="查询条件">
                                        <a-option v-for="item of columns" :key="item.dataIndex" :value="item.dataIndex"
                                            :label="item.title" />
                                    </a-select>
                                    <a-input-search search-button @search="fetchDataByCondition" v-model="condition" />
                                </a-input-group>
                            </a-space>

                        </a-col>

                        <a-col :span="1">
                            <a-button status="danger" shape="circle" @click="fetchData">
                                <icon-loop />
                            </a-button>
                        </a-col>
                        <a-col :span="1">
                        </a-col>
                        <a-col :span="7" class="info">
                            <!-- 选中 <span class="digit">{{ selectedKeys.length }}</span> of <span class="digit">{{ data.length
                            }}</span> -->
                            <a-progress :percent="selectedKeys.length > 0 ? selectedKeys.length / data.length : 0"
                                :style="{ width: '100%' }" :show-text="false">
                            </a-progress>
                        </a-col>
                        <a-col :span="1">
                        </a-col>
                        <a-col :span="2">
                            <a-button size="large" status="success" @click="search">高级查询</a-button>
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
            <a-table class="body" column-resizable row-key="id" :table-layout-fixed="true" :columns="columns" :data="data"
                :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="pagination"
                :virtual-list-props="{ height: 480 }">
                <template #columns>
                    <!-- 动态获取列 -->
                    <a-table-column v-for="(item, index) in columns" :key="index" :title="item.title"
                        :data-index="item.dataIndex" :sortable="item.sortable" align="center">
                        <template #span>
                            <span></span>
                        </template>

                    </a-table-column>
                    <!-- 自定义按钮（编辑） -->
                    <a-table-column> 
                        <template #cell="{ record }" >
                            <a-button class="btn" shape="circle" @click="view(record)" size="small"><icon-eye /></a-button>
                            <a-button class="btn" shape="circle" @click="edit(record)" size="small"><icon-edit /></a-button>
                        </template>
                    </a-table-column>
                </template>
            </a-table>

            <a-modal v-model:visible="editVisible" @ok="editSubmit" @cancel="editCancel">
                <template #title>
                    编辑
                </template>

                <a-form>
                    <a-form-item v-for="(item, index) in columns" :key="item" :field="item.title" :label="item.title">
                        <a-input :placeholder="'请输入' + item.title" v-model="editData[item.dataIndex]"
                            :disabled="item.dataIndex.includes('id') && baseUrl != 'student'"
                            v-if="item.dataIndex != 'gender' && item.dataIndex != 'departmentId'" />
                        <a-space direction="vertical" size="large" v-else-if="item.dataIndex == 'gender'">
                            <a-radio-group v-model="editData.gender">
                                <a-radio value="男">男</a-radio>
                                <a-radio value="女">女</a-radio>
                            </a-radio-group>
                        </a-space>
                        <a-select v-else v-model="editData.departmentId" placeholder="请选择学院">
                            <a-option v-for="dep of departments" :key="dep.id" :value="dep.id" :label="dep.name" />
                        </a-select>
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
                            :disabled="item.dataIndex.includes('id') && baseUrl != 'student'"
                            v-if="item.dataIndex != 'gender' && item.dataIndex != 'departmentId'" />
                        <a-space direction="vertical" size="large" v-else-if="item.dataIndex == 'gender'">
                            <a-radio-group v-model="addData.gender">
                                <a-radio value="男">男</a-radio>
                                <a-radio value="女">女</a-radio>
                            </a-radio-group>
                        </a-space>
                        <a-select v-else v-model="editData.departmentId" placeholder="请选择学院">
                            <a-option v-for="dep of departments" :key="dep.id" :value="dep.id" :label="dep.name" />
                        </a-select>
                    </a-form-item>
                </a-form>
            </a-modal>

            <a-modal v-model:visible="viewVisible" @cancel="viewCancle">
                <template #title>
                    查看
                </template>

                <a-descriptions :data="viewData" :title="viewData.name" bordered :column="1" size="large" />
            </a-modal>

            <a-modal v-model:visible="searchVisible" @ok="selectData" @cancel="searchCancel">
                <template #title>
                    高级查询
                </template>

                <a-form>
                    <a-form-item v-for="(item, index) in columns" :key="item" :field="item.title" :label="item.title">
                        <a-input :placeholder="'请输入' + item.title" v-model="searchData[item.dataIndex]"
                            v-if="item.dataIndex != 'gender' && item.dataIndex != 'departmentId'" />
                        <a-space direction="vertical" size="large" v-else-if="item.dataIndex == 'gender'">
                            <a-radio-group v-model="searchData.gender">
                                <a-radio value="男">男</a-radio>
                                <a-radio value="女">女</a-radio>
                            </a-radio-group>
                        </a-space>
                        <a-select v-else v-model="searchData.departmentId" placeholder="请选择学院">
                            <a-option v-for="dep of departments" :key="dep.id" :value="dep.id" :label="dep.name" />
                        </a-select>
                    </a-form-item>
                </a-form>
            </a-modal>

        </div>
    </a-spin>
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
const pagination = { pageSize: 15 }
// 四个对话框是否可见
const editVisible = ref(false);
const addVisible = ref(false);
const viewVisible = ref(false);
const searchVisible = ref(false);

// 对话框中会用到的数据
const editData = ref({});
const addData = ref({});
const viewData = ref([]);
const searchData = ref({});

const data = ref([])
const loading = ref(true)
const departments = ref({})

// 单条件查询
const options = ref([])
const condition = ref('')

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
        loading.value = true
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
        loading.value = false
    } catch (error) {
        // Message.error({
        //     content: error.message
        // });
        loading.value = false
    }
};


const fetchDataByCondition = async () => {
    try {
        if (condition.value == null || condition.value.length == 0 || options.value == null) {
            Message.error({
                content: '查询条件不能为空！'
            });
            return
        }
        loading.value = true
        let param = {}
        param[options.value] = condition.value
        const response = await post(props.baseUrl + '/like', param);
        console.log(response);
        let t = response.data.data
        for (let i = 0; i < t.length; i++) {
            if (t[i].hasOwnProperty('gender'))
                t[i].gender = t[i].gender ? '女' : '男'
            if (t[i].hasOwnProperty('salary'))
                t[i].salary = parseInt(t[i].salary)
        }
        data.value = t
        loading.value = false
    } catch (error) {
        // Message.error({
        //     content: error.message
        // });
        loading.value = false
    }
}

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
        // console.log(error.message);
        // Message.error({
        //     content: error.message
        // });
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
        // Message.error({
        //     content: error.message
        // });
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
        // Message.error({
        //     content: error.message
        // });
        editVisible.value = false
    }
};

const editCancel = () => {
    editData.value = {}
    editVisible.value = false
}

const view = async (record) => {

    for (let idx in props.columns) {
        let t = props.columns[idx]
        viewData.value.push({
            label: t.title,
            value: record[t.dataIndex]
        })
        if (t.dataIndex == 'departmentId') {
            try {
                const resp = await get(`department\\${record.departmentId}`);
                viewData.value.push({
                    label: '学院名称',
                    value: resp.data.data.name
                })
                viewData.value.push({
                    label: '学院地址',
                    value: resp.data.data.address
                })
            } catch (error) {
            }
        }


    }
    viewVisible.value = true

}

const viewCancle = () => {
    viewVisible.value = false
    viewData.value = []
}

const getAllDepartment = async (id) => {
    try {
        const response = await get('department');
        departments.value = response.data.data
    } catch (error) {
    }
}

const search = () => {
    searchVisible.value = true
}

const selectData = async () => {
    try {
        loading.value = true
        const response = await post(props.baseUrl + '/like', searchData.value);
        console.log(response);
        let t = response.data.data
        for (let i = 0; i < t.length; i++) {
            if (t[i].hasOwnProperty('gender'))
                t[i].gender = t[i].gender ? '女' : '男'
            if (t[i].hasOwnProperty('salary'))
                t[i].salary = parseInt(t[i].salary)
        }
        data.value = t
        loading.value = false
    } catch (error) {
        loading.value = false
    }
}

const searchCancel = () => {
    searchData.value = {}
    searchVisible.value = false
}


onMounted(() => {
    fetchData()
    getAllDepartment()
});

</script>
<style scoped>
.root {
    height: 100%;
    width: 100%;
}

.head {
    padding: 12px;
    height: 60px;
    line-height: 60px;
}

.body {
    /* min-height: 570px; */
    /* height: 570px; */
}

.info {
    color: #1675FC;
}

.digit {
    display: inline-block;
    font-size: 20px;
    font-weight: bolder;
    min-width: 30px;
    margin-left: 2px;
}

.btn {
    margin-left: 10px;
}
</style>
  