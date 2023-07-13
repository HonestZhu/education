import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue'
import router from './router'
import '@arco-design/web-vue/dist/arco.css';
import Detail from './components/Detail.vue';



const app = createApp(App)

app.use(router)
app.use(ArcoVue);
app.component('Detail', Detail);

app.mount('#app')


