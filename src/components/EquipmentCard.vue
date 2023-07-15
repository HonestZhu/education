<template>
    <div class="root">
        <a-card hoverable :style="{ width: '360px', height: '300px' }">
            <template #cover>
                <div :style="{
                    height: '204px',
                    overflow: 'hidden',
                }">
                    <img :style="{ width: '100%', transform: 'translateY(-20px)' }" alt="dessert"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp" />
                </div>
            </template>
            <a-card-meta title="Card Title">
                <template #description>
                    Card content <br />
                    <!-- {{ data }} -->
                </template>
            </a-card-meta>
        </a-card>
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


const props = defineProps({
    data: {
        type: Object,
        required: true,
    }
});



onMounted(() => {
});

</script>
<style scoped>
.root {
    margin: 20px;
}
</style>
  