/**
 * 认证
 */
import store from '@/store'
import service from "../service"
import {buildMenuAuth} from '../authz'

/**
 * 登录
 */
async function postLogin(data) {
    return new Promise((resolve, reject) => {
        doLogin(data).then(() => resolve()).catch(error => reject(error))
    })
}

async function doLogin(data) {
    // 1.向后台请求认证，
    // 认证成功，拿到http响应header(x-auth-token)中携带accesToken，并保存到vuex和localStorage(有效期)
    // 后续的请求的header(x-auth-token)上都会带上这个accessToken，并在响应完成后重新保存到vuex已续期(本地)
    const response = await service.login(data);
    if (response['result'] === 0) {
        const accessToken = response['accessToken']
        await store.dispatch('app/setAccessToken', accessToken)
    }
    // 2.构建权限信息
    // 2.1获取用户基本信息并保存到vuex
    // 2.2获取用户权限信息：已分配菜单及菜单拥有的按钮权限
    // 2.3根据菜单信息构建动态路由
    // 2.4根据菜单信息构建侧边栏菜单数据
    // 2.5根据菜单信息构建按钮权限数据
    // 2.6从localStorage中(没有则获取默认配置)提取配置信息并应用
    // 后续页面刷新时,vuex中的accessToken会丢失。此时，再次从localStorage中获取accessToken，
    // 若没有，则需要重新认证；否则保存到vuex并构建权限信息
   // await buildMenuAuth()
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
    postLogin, postLogout
}