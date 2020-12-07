/**
 * 授权
 */
import router from "@/router";
import store from "@/store";
import FrameLayout from '@/layouts/framework'
import EmptyLayout from '@/layouts/empty'
import array2Tree from "@/utils/data/array2Tree"
import service from '../service'

/**
 * 构建路由表和边侧栏菜单数据
 */
async function buildMenuAuth() {
    // 请求菜单权限
    const userMenus = await service.fetchUserMenu() // 同步方法
    const treeMenus = array2Tree(userMenus, {}) // array2tree

    //
    const routes = buildRoutes(treeMenus)
    const menus = buildNavMenus(treeMenus)

    //
    router.addRoutes(routes ? [routes] : [])
    await store.dispatch('app/setMenus', menus)

}

/**
 * 构建路由表
 */
function buildRoutes(treeMenus, parent) {
    if (!parent) {
        parent = {path: '/', name: 'root', component: FrameLayout, children: []} // 根路由
    }
    treeMenus.forEach(treeMenu => {
        const {title, icon, path, name, component, redirect = '', children} = treeMenu
        const current = {
            path, name, redirect, meta: {icon, title},
            component: component ? () => import(`@/${component}`) : EmptyLayout
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
function buildNavMenus(treeMenus = [], nextPath = "") {
    let navMenus = []
    treeMenus.forEach(treeMenu => {
        const {title, icon, path, children} = treeMenu
        const newPath = nextPath + "/" + path
        let navMenu = {title, icon, path: newPath}
        if (children) {
            navMenu.children = buildNavMenus(children, newPath)
        }
        navMenus.push(navMenu)
    })
    return navMenus
}

export {
    buildMenuAuth
}