import axios from 'axios';
import { Message } from '@arco-design/web-vue';

// 请求拦截
axios.interceptors.request.use(config => {
    config.baseURL = 'http://localhost:8080'
    // 1. 这个位置就请求前最后的配置
    // 2. 当然你也可以在这个位置 加入你的后端需要的用户授权信息
    let token = localStorage.getItem('Authorization')
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
    // 请求成功
    // 1. 根据自己项目需求定制自己的拦截
    // 2. 然后返回数据
    return response;
}, error => {
    // 请求失败
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                Message.error('非法请求！')
            case 404:
                Message.error('资源不存在！')
                break
            default:
                // 如果以上都不是的处理
                return Promise.reject(error);
        }
    }

})