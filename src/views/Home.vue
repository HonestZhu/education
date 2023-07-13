<template>
    <div class="root">
        <Detail :columns="columns" :data="data"></Detail>
    </div>
</template>

<script setup>
import Detail from '../components/Detail.vue';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Salary',
        dataIndex: 'salary',
        sortable: {
          sortDirections: ['ascend', 'descend']
        }
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
]
const data = [{
    id: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com'
}, {
    id: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
}, {
    id: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com'
}, {
    id: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com'
}, {
    id: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '6',
    name: 'Jane Doe 2',
    salary: 15000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com'
}, {
    id: '7',
    name: 'Alisa Ross 2',
    salary: 28000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
}, {
    id: '8',
    name: 'Kevin Sandra 2',
    salary: 26000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
}, {
    id: '9',
    name: 'Ed Hellen 2',
    salary: 18000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com'
}, {
    id: '10',
    name: 'William Smith 2',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '11',
    name: 'William Smith 3',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '12',
    name: 'William Smith 4',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '13',
    name: 'William Smith 5',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '14',
    name: 'William Smith 6',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '15',
    name: 'William Smith 7',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '16',
    name: 'William Smith 8',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '17',
    name: 'William Smith 9',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '18',
    name: 'William Smith 10',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '19',
    name: 'William Smith 12',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '20',
    name: 'William Smith 13',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '21',
    name: 'William Smith 14',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '22',
    name: 'William Smith 15',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '23',
    name: 'William Smith 16',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '24',
    name: 'William Smith 171',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '25',
    name: 'William Smith 177',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '26',
    name: 'William Smith 13542',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    id: '27',
    name: 'William Smith 2135',
    salary: 12000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}];

</script>

<style scoped>
.root {
    width: 100%;
    height: 100%;
}
</style>
  