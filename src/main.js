import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue'
import router from './router'
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

import Detail from './components/Detail.vue';

const app = createApp(App)


app.use(router)
app.use(ArcoVue);
app.component('Detail', Detail);
app.use(ArcoVueIcon);
app.mount('#app')


