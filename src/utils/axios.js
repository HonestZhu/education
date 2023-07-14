import axios from 'axios';
import { Message } from '@arco-design/web-vue';

// 请求拦截
axios.interceptors.request.use(config => {
    config.baseURL = 'http://localhost:8081'
    // 1. 这个位置就请求前最后的配置
    // 2. 当然你也可以在这个位置 加入你的后端需要的用户授权信息
    // 添加用户授权信息到请求头
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.token = `${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
    // 请求成功
    // 1. 根据自己项目需求定制自己的拦截
    // 2. 然后返回数据
    console.log(response.data);
    return response;
}, error => {
    // 请求失败
    if (error && error.response) {
        
        switch (error.response.status) {
            case 400:
                Message.error('非法请求！')
                break
            case 401:
                Message.error('请先登录！')
                localStorage.removeItem('token')
                break
            case 404:
                Message.error('资源不存在！')
                break
            case 500:
                Message.error('服务器内部错误！')
                break
            default:
                Message.error('请求失败！')
        }
        return Promise.reject(new Error(error.response.Message))
    }
})

/**
 * get 请求
 * @param url 接口路由
 * @param auth 是否需要带登录信息
 * @returns {AxiosPromise<any>}
 */
export const get = (url, auth = true) => {
    return axios.get(url);
}

/**
 * post 请求
 *
 * @param url 接口路由
 * @param data 接口参数
 * @param auth 是否需要带登录信息
 * @returns {AxiosPromise<any>}
 */
export const post = (url, data, auth = true) => {
    return axios.post(url, data);
}

export const put = (url, data, auth = true) => {
    return axios.put(url, data);
}

export const del = (url, data) => {
    return axios.delete(url, data);
}