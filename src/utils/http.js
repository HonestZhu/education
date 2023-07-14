import axios from 'axios';

export default {
    /**
     * get 请求
     * @param url 接口路由
     * @param auth 是否需要带登录信息
     * @returns {AxiosPromise<any>}
     */
    get(url, auth = false) {
        if (auth) {
            let token = localStorage.getItem('Authorization')
            return axios.get(url, {headers: {Authorization: token}});
        } else {
            return axios.get(url);
        }
    },

    /**
     * post 请求
     *
     * @param url 接口路由
     * @param data 接口参数
     * @param auth 是否需要带登录信息
     * @returns {AxiosPromise<any>}
     */
    post(url, data, auth = false) {
        if (auth) {
            let token = localStorage.getItem('Authorization')
            return axios.post(url, {headers: {Authorization: token}});
        } else {
            return axios.post(url, data);
        }
    },

    /**
     * put请求
     * @param url 接口路由
     * @param data 接口参数
     * @param auth 是否需要带登录信息
     * @returns {AxiosPromise<any>}
     */
    put(url, data, auth = false) {
        if (auth) {
            let token = localStorage.getItem('Authorization')
            return axios.put(url, {headers: {Authorization: token}});
        } else {
            return axios.put(url, data);
        }
    },

    /**
     * 删除
     * @param url 接口路由
     * @param auth 是否需要带登录信息
     * @returns {AxiosPromise}
     */
    del(url, auth = false) {
        if (auth) {
            let token = localStorage.getItem('Authorization')
            return axios.delete(url, {headers: {Authorization: token}});
        } else {
            return axios.delete(url);
        }
    },

    /**
     * 上传文件
     * @param url 接口路由
     * @param file 接口文件
     * @param auth 是否需要带登录信息
     */
    uploader(url, file, auth = false) {
        let param = new FormData();
        param.append('file', file)
        if (auth) {
            let token = localStorage.getItem('Authorization')
            return axios.post(url, param, {headers: {Authorization: token}})
        } else {
            return axios.post(url, param)
        }
    },
}