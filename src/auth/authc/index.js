/**
 * 认证
 */
import store from '@/store'
import service from "../service"
import {buildMenuAuth} from '../authz'

/**
 * 登录
 */
async function postLogin(params) {
    return new Promise((resolve, reject) => {
        doLogin(params).then(() => resolve()).catch(error => reject(error))
    })
}

async function doLogin(params) {
    // 1.后台
    await service.login(params)
    // 2.获取用户信息
    await fetchUser()
    // 3.构建权限信息
    await buildMenuAuth()
}

/**
 * 获取用户信息
 */
async function fetchUser() {
    const userInfo = await service.fetchUser()
    await store.dispatch('app/setUserInfo', userInfo)
    return userInfo
}

/**
 * 注销
 */
async function postLogout() {
    return new Promise((resolve, reject) => {
        doLogout().then(() => resolve()).catch(error => reject(error))
    })
}

async function doLogout() {
    await service.logout()
    await store.dispatch('app/setLogout')
}

export {
    postLogin, fetchUser, postLogout
}