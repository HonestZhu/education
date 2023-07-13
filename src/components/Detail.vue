<template>
    <div class="root">
        <div class="head">
            <a-space direction="vertical" :size="16" style="display: block;">
                <a-row>
                    <a-col :span="20">
                    </a-col>

                    <a-col :span="2">
                        <a-button type="primary" size="large">添加</a-button>
                    </a-col>
                    <a-col :span="2">
                        <a-button type="primary" size="large" status="danger">删除</a-button>
                    </a-col>
                </a-row>
            </a-space>
        </div>

    </div>
</template>
<script setup>
console.log(111);
</script>
<style scoped>
.root {
    color: red;
    height: 100%;
    width: 100%;
}

.head {
    padding: 20px;
    height: 50px;
}
</style>
  