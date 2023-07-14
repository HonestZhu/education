import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue'
import router from './router'
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

import Detail from './components/Detail.vue';

import api from './utils/api';
import http from './utils/http';



const app = createApp(App)

// 将后端接口api和请求方式http绑定到Vue实例上
app.config.globalProperties.$api = api;
app.config.globalProperties.$http = http;

app.use(router)
app.use(ArcoVue);
app.component('Detail', Detail);
app.use(ArcoVueIcon);
app.mount('#app')


