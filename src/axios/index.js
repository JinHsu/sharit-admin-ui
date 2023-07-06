import Vue from 'vue'
import Axios from 'axios'
// import qs from "qs";
import store from "@/store";
import errorHandler from "./errorhandler";

let axios = Axios.create({
    baseURL: '/api',
    timeout: 0
})

/**
 * 请求拦截器
 */
axios.interceptors.request.use((config) => {
    const accessToken = Vue.ls.get('accessToken')
    config.headers['Authorization'] = `Bearer ${accessToken}`  // 请求头加上accessToken
    config.headers['locale'] = Vue.ls.get('locale') // 请求头加上locale

    // GET请求参数中有数组（分页排序参数）
    /*if (config.method === 'get') {
        config.paramsSerializer = function (params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        }
    }*/

    return config
}, errorHandler)

/**
 * 响应拦截器
 */
axios.interceptors.response.use((response) => {
    const accessToken = response.headers['Authorization']
    if (accessToken) { // 重新登录
        store.dispatch('app/setAccessToken', accessToken).then()
    }
    return response.data
}, errorHandler)

export default axios
