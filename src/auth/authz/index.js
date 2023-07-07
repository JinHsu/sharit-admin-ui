/**
 * 授权
 */
import router from "@/router"
import store from "@/store"
import array2Tree from "@/utils/data/array2Tree"
import localStorage from "@/use/local-storage/lsWrapper"
import config from "@/config/bootstrap"
import changeColor from "@/utils/theme"
import service from '../service'

/**
 * 构建路由表和边侧栏菜单数据
 */
async function buildMenuAuth() {
    // 1.获取用户信息
    await fetchUser()

    // 2.请求菜单权限
    const userMenus = await service.fetchUserMenu() // 同步方法
    const treeMenus = array2Tree(userMenus, {}) // array2tree

    // 3.构建动态路由数据
    const routes = buildRoutes(treeMenus)
    router.addRoutes(routes ? [routes] : [])
    // 4.构建侧边栏菜单数据
    const menus = buildSideMenus(treeMenus)
    await store.dispatch('app/setMenus', menus)

    // 5.构建按钮权限数据
    // const buttonsMap = buildButtons(userMenus)
    // await store.dispatch('app/setButtons', buttonsMap)

    // 6.获取并应用配置信息
    await fetchAndApplyConfig()
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
 * 构建路由表
 */
function buildRoutes(treeMenus, parent) {
    if (!parent) {
        parent = {
            path: '/',
            name: 'root',
            component: () => import(/* webpackChunkName: "framework" */ '@/layouts/framework'),
            children: []
        } // 根路由
    }
    treeMenus.forEach(treeMenu => {
        const {menuId, menuName, menuIcon, routePath, routeName, component, redirect = '', children} = treeMenu
        const current = {
            path: routePath, name: routeName, redirect, meta: {icon: menuIcon, title: menuName, id: menuId},
            // 懒加载
            component: component ?
                () => import(/* webpackChunkName: "[request]" */ `@/${component}`)
                :
                () => import(/* webpackChunkName: "framework" */ '@/layouts/empty')
        }
        parent.children.push(current)

        if (children) {
            current.children = []
            buildRoutes(children, current)
        }
    })
    return parent
}

/**
 * 构建边侧栏菜单数据
 */
function buildSideMenus(treeMenus = [], nextPath = "") {
    let navMenus = []
    treeMenus.forEach(treeMenu => {
        const {menuName, menuIcon, routePath, children, menuId} = treeMenu
        const newPath = nextPath + "/" + routePath
        let navMenu = {title: menuName, icon: menuIcon, path: newPath, id: menuId}
        if (children) {
            navMenu.children = buildSideMenus(children, newPath)
        }
        navMenus.push(navMenu)
    })
    return navMenus
}

/**
 * 构建按钮数据
 */
function buildButtons(userMenus) {
    const buttonsMap = new Map()
    userMenus.forEach(userMenu => {
        const {id, buttons} = userMenu
        buttonsMap.set(id, buttons)
    })
    return buttonsMap
}

/**
 * 获取并应用配置信息
 */
async function fetchAndApplyConfig() {
    //
    let themeColor = localStorage.get('themeColor', config.themeColor)
    await store.dispatch('framework/setThemeColor', themeColor)
    changeColor(themeColor) // 应用颜色

    //
    let themeSider = localStorage.get('themeSider', config.themeSider)
    await store.dispatch('framework/setThemeSider', themeSider)

    //
    let collapsed = localStorage.get('collapsed', config.collapsed)
    await store.dispatch('framework/setCollapsed', collapsed)

    //
    let locale = localStorage.get('locale', config.locale)
    await store.dispatch('framework/setLocale', locale)

    //
    let multiTab = localStorage.get('multiTab', config.multiTab)
    await store.dispatch('framework/setMultiTab', multiTab)
}

export {
    buildMenuAuth
}