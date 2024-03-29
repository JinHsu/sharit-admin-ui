import Vue from 'vue'
import Router from 'vue-router'
import NProgress from "@/components/nprogress"
import {ANON_URL, HOME_UTL, LOGIN_URL, ROOT_URL} from "@/config/auth"
import store from "@/store"
import {buildMenuAuth} from "@/auth/authz"
import staticRoutes from '@/config/routes'
import config from '@/config/bootstrap'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject)
    }
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)


const createRouter = () => new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    // scrollBehavior: () => ({y: 0}),
    routes: staticRoutes
})

const router = createRouter()

router.afterEach(() => {
    NProgress.done()
})

router.beforeEach((to, from, next) => {
    NProgress.start() // start progress bar
    // 设置页面标题
    window.document.title = to.meta.title === undefined ? config.name : config.name + " - " + to.meta.title
    // 获取权限
    routerInterceptor(to, from, next).then(resolve => resolve)
})

async function routerInterceptor(to, from, next) {
    if (to.path === ROOT_URL) {
        next({path: LOGIN_URL})
        return
    }

    let accessToken = Vue.ls.get("accessToken")
    if (accessToken) {
        if (ANON_URL.includes(to.path)) { // 已登录
            const activeKey = store.state.framework.multiTab.activeKey
            const location = {path: activeKey ? activeKey : HOME_UTL} // 有登录历史则进入历史记录的页面，否则进入默认页面
            next(location)
        } else {
            let token = store.state.app.accessToken
            if (token) {
                next()
            } else {
                await store.dispatch('app/setAccessToken', accessToken)

                // 1.登录后页面刷新，重新请求权限并生成动态路由表
              //  await buildMenuAuth()

                next({path: to.path})
            }
        }
    } else { // 跳转登录
        loginOrDirect(to, next)
    }
}

// ls中没有accessToken：需要登录（白名单内，直接跳转）
function loginOrDirect(to, next) {
    if (ANON_URL.includes(to.path)) {
        next()
    } else {
        next({path: LOGIN_URL})
    }
}

// 注销时重置路由匹配
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
