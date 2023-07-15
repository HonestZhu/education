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
                                        placeholder="简单查询">
                                        <a-option v-for="item of columns" :key="item.dataIndex" :value="item.dataIndex"
                                            :label="item.title"
                                            v-show="item.dataIndex != 'departmentId' && item.dataIndex != 'gender'" />
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


            <a-space direction="vertical" :size="16" style="display: block;">
                <a-row>
                    <a-col :span="8">
                        <a-table class="body" column-resizable row-key="id" :table-layout-fixed="true" :data="data"
                            :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="pagination"
                            :virtual-list-props="{ height: '72vh' }">
                            <template #columns>
                                <!-- 动态获取列 -->
                                <a-table-column v-for="(item, index) in shortColumns" :key="index" :title="item.title"
                                    :data-index="item.dataIndex" :sortable="item.sortable" align="center">
                                    <template #span>
                                        <span></span>
                                    </template>

                                </a-table-column>
                                <!-- 自定义按钮（编辑） -->
                                <a-table-column title="Options">
                                    <template #cell="{ record }">
                                        <a-button class="btn" @click="choose(record)" size="small"><icon-edit /></a-button>
                                    </template>
                                </a-table-column>
                            </template>
                        </a-table>
                    </a-col>
                    <a-col :span="1">
                    </a-col>
                    <a-col :span="15">
                        <a-space :size="16" style="display: block;">
                            <a-row>
                                <a-col :span="8">
                                    <a-card :style="{ width: '52vw' }" :title="student.name ? student.name : '未选中学生'">
                                        <template #extra>
                                            <a-button @click="editSubmit">提交编辑</a-button>
                                        </template>
                                        <div>
                                            <a-form :model="form">
                                                <a-row :gutter="16">
                                                    <a-col :span="6">
                                                        <a-form-item field="id" label="ID">
                                                            <a-input v-model="student.id" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="6">
                                                        <a-form-item field="name" label="姓名">
                                                            <a-input v-model="student.name" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="6">
                                                        <a-form-item field="gender" label="性别">
                                                            <a-space direction="vertical" size="large">
                                                                <a-radio-group v-model="student.gender">
                                                                    <a-radio value="男">男</a-radio>
                                                                    <a-radio value="女">女</a-radio>
                                                                </a-radio-group>
                                                            </a-space>
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="6">
                                                        <a-form-item field="phone" label="手机">
                                                            <a-input v-model="student.phone" />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                                <a-row :gutter="16">
                                                    <a-col :span="6">
                                                        <a-form-item field="departmentId" label="学院">
                                                            <a-select v-model="student.departmentId" placeholder="请选择学院"
                                                                :disabled="student.departmentId == null">
                                                                <a-option v-for="dep of departments" :key="dep.id"
                                                                    :value="dep.id" :label="dep.name" />
                                                            </a-select>
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="6">
                                                        <a-form-item field="grade" label="年级">
                                                            <a-input v-model="student.grade" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="6">
                                                        <a-form-item field="clazz" label="班级">
                                                            <a-input v-model="student.clazz" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="6">
                                                        <a-form-item field="dormitory" label="宿舍">
                                                            <a-input v-model="student.dormitory" />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                            </a-form>
                                        </div>
                                    </a-card>
                                </a-col>
                                <a-col :span="16">

                                </a-col>
                            </a-row>
                        </a-space>
                    </a-col>
                </a-row>
            </a-space>

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
                        <a-select v-else v-model="addData.departmentId" placeholder="请选择学院">
                            <a-option v-for="dep of departments" :key="dep.id" :value="dep.id" :label="dep.name" />
                        </a-select>
                    </a-form-item>
                </a-form>
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
import { get, post, put } from '../utils/axios'

const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false
});
const selectedKeys = ref([]);
const pagination = { pageSize: 15 }
// 对话框是否可见
const addVisible = ref(false);
const searchVisible = ref(false);

// 对话框中会用到的数据
const addData = ref({});
const searchData = ref({});

const data = ref([])
const loading = ref(true)
const departments = ref({})

// 单条件查询
const options = ref([])
const condition = ref('')

const student = ref({})
const choosed = ref(false)



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
        title: '性别',
        dataIndex: 'gender'
    },
    {
        title: '手机号',
        dataIndex: 'phone',
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
        title: '年级',
        dataIndex: 'grade',
    },
    {
        title: '班级',
        dataIndex: 'clazz'
    },
    {
        title: '宿舍',
        dataIndex: 'dormitory'
    }
]

const shortColumns = [
    {
        title: '姓名',
        dataIndex: 'name'
    },
    {
        title: '学院名称',
        dataIndex: 'departmentName'
    },
    // {
    //     title: '学院ID',
    //     dataIndex: 'departmentId'
    // },
    {
        title: '年级',
        dataIndex: 'grade',
    }
]

const baseUrl = 'student'

const choose = (record) => {
    student.value = record
    choosed.value = true
}

const refresh = () => {
    addData.value = {}
    searchData.value = {}
    condition.value = ''
    options.value = []
    student.value = []
    choosed.value = false
}

// 获取所有数据
const fetchData = async () => {
    try {
        loading.value = true
        const response = await get('student');
        console.log(response);
        let t = response.data.data
        for (let i = 0; i < t.length; i++) {
            if (t[i].hasOwnProperty('gender'))
                t[i].gender = t[i].gender ? '女' : '男'
            if (t[i].hasOwnProperty('salary'))
                t[i].salary = parseInt(t[i].salary)
        }
        data.value = t
        Message.success({
            content: '成功获取数据！'
        })
    } catch (error) {
    } finally {
        loading.value = false
        refresh()
    }
};


// 单条件查询
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
        const response = await post(baseUrl + '/like', param);
        console.log(response);
        let t = response.data.data
        for (let i = 0; i < t.length; i++) {
            if (t[i].hasOwnProperty('gender'))
                t[i].gender = t[i].gender ? '女' : '男'
            if (t[i].hasOwnProperty('salary'))
                t[i].salary = parseInt(t[i].salary)
        }
        Message.success({
            content: '成功获取数据！'
        })
        data.value = t
        loading.value = false

        addData.value = {}
        searchData.value = {}
        condition.value = ''
        options.value = []
        student.value = []
        choosed.value = false
    } catch (error) {
        // Message.error({
        //     content: error.message
        // });
        loading.value = false
    }
}

// 编辑提交
const editSubmit = async () => {
    if (!choosed.value) {
        Message.error({
            content: '未选中学生！'
        });
        return
    }
    try {
        student.value.gender = student.value.gender == '男' ? 0 : 1
        const response = await post('student', student.value);
        fetchData()
        Message.success({
            content: '编辑成功！'
        });
    } catch (error) {  
    } finally {
        choosed.value = false
        refresh()
    }
};

// 新建
const add = () => {
    addVisible.value = true
}

// 新建提交数据
const addSubmit = async () => {
    try {
        if (addData.value.hasOwnProperty('gender'))
            addData.value.gender = addData.value.gender == '男' ? 0 : 1
        const response = await put(baseUrl, addData.value);
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

// 取消新建
const addCancel = () => {
    addVisible.value = false
    addData.value = {}
}

// 批次删除
const remove = async () => {
    try {
        const response = await post(baseUrl + '/delete', selectedKeys.value);
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


// 获取所有部门
const getAllDepartment = async (id) => {
    try {
        const response = await get('department');
        departments.value = response.data.data
    } catch (error) {
    } 
}

// 高级查询
const search = () => {
    searchVisible.value = true
}

// 从后端获取数据
const selectData = async () => {
    try {
        loading.value = true
        const response = await post(baseUrl + '/like', searchData.value);
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
    } finally {
        loading.value = false
        refresh()
    }
}

// 取消高级查询
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
  